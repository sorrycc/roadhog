import { existsSync } from 'fs';
import assert from 'assert';
import chokidar from 'chokidar';
import chalk from 'chalk';
import proxy from 'http-proxy-middleware';
import url from 'url';
import bodyParser from 'body-parser';
import getPaths from '../getPaths';

const debug = require('debug')('roadhog:mock');

let error = null;
const paths = getPaths(process.cwd());
const configFile = paths.resolveApp('.roadhogrc.mock.js');
const mockDir = paths.resolveApp('./mock/');

function getConfig() {
  if (existsSync(configFile)) {
    // disable require cache
    Object.keys(require.cache).forEach(file => {
      if (file === configFile || file.indexOf(mockDir) > -1) {
        debug(`delete cache ${file}`);
        delete require.cache[file];
      }
    });
    return require(configFile);
  } else {
    return {};
  }
}

function createMockHandler(method, path, value) {
  return function mockHandler(...args) {
    const res = args[1];
    if (typeof value === 'function') {
      value(...args);
    } else {
      res.json(value);
    }
  };
}

function createProxy(method, pathPattern, target) {
  const filter = (_, req) => {
    return method ? req.method.toLowerCase() === method.toLowerCase() : true;
  };
  const parsedUrl = url.parse(target);
  const realTarget = [parsedUrl.protocol, parsedUrl.host].join('//');
  const targetPath = parsedUrl.path;

  const pathRewrite = (path, req) => {
    let matchPath = req.originalUrl;
    const matches = matchPath.match(pathPattern);

    if (matches.length > 1) {
      matchPath = matches[1];
    }

    return path.replace(req.originalUrl.replace(matchPath, ''), targetPath);
  };

  return proxy(filter, { target: realTarget, pathRewrite });
}

export function applyMock(devServer) {
  try {
    realApplyMock(devServer);
    error = null;
  } catch (e) {
    console.log(e);
    error = e;

    console.log();
    outputError();

    const watcher = chokidar.watch([configFile, mockDir], {
      ignored: /node_modules/,
      ignoreInitial: true,
    });
    watcher.on('change', path => {
      console.log(
        chalk.green('CHANGED'),
        path.replace(paths.appDirectory, '.'),
      );
      watcher.close();
      applyMock(devServer);
    });
  }
}

function realApplyMock(devServer) {
  const config = getConfig();
  const { app } = devServer;

  const proxyRules = [];
  const mockRules = [];

  Object.keys(config).forEach(key => {
    const keyParsed = parseKey(key);
    assert(!!app[keyParsed.method], `method of ${key} is not valid`);
    assert(
      typeof config[key] === 'function' ||
        typeof config[key] === 'object' ||
        typeof config[key] === 'string',
      `mock value of ${key} should be function or object or string, but got ${typeof config[
        key
      ]}`,
    );
    if (typeof config[key] === 'string') {
      let { path } = keyParsed;
      if (/\(.+\)/.test(path)) {
        path = new RegExp(`^${path}$`);
      }
      proxyRules.push({
        path,
        method: keyParsed.method,
        target: config[key],
      });
    } else {
      mockRules.push({
        path: keyParsed.path,
        method: keyParsed.method,
        target: config[key],
      });
    }

    proxyRules.forEach(proxy => {
      app.use(proxy.path, createProxy(proxy.method, proxy.path, proxy.target));
    });

    /**
     * body-parser must be placed after http-proxy-middleware
     * https://github.com/chimurai/http-proxy-middleware/blob/master/recipes/modify-post.md
     */
    devServer.use(bodyParser.json({ limit: '5mb', strict: false }));
    devServer.use(
      bodyParser.urlencoded({
        extended: true,
        limit: '5mb',
      }),
    );

    mockRules.forEach(mock => {
      app[mock.method](
        mock.path,
        createMockHandler(mock.method, mock.path, mock.target),
      );
    });
  });

  // 调整 stack，把 historyApiFallback 放到最后
  let lastIndex = null;
  app._router.stack.forEach((item, index) => {
    if (item.name === 'webpackDevMiddleware') {
      lastIndex = index;
    }
  });
  const mockAPILength = app._router.stack.length - 1 - lastIndex;
  if (lastIndex && lastIndex > 0) {
    const newStack = app._router.stack;
    newStack.push(newStack[lastIndex - 1]);
    newStack.push(newStack[lastIndex]);
    newStack.splice(lastIndex - 1, 2);
    app._router.stack = newStack;
  }

  const watcher = chokidar.watch([configFile, mockDir], {
    ignored: /node_modules/,
    persistent: true,
  });
  watcher.on('change', path => {
    console.log(chalk.green('CHANGED'), path.replace(paths.appDirectory, '.'));
    watcher.close();

    // 删除旧的 mock api
    app._router.stack.splice(lastIndex - 1, mockAPILength);

    applyMock(devServer);
  });
}

function parseKey(key) {
  let method = 'get';
  let path = key;

  if (key.indexOf(' ') > -1) {
    const splited = key.split(' ');
    method = splited[0].toLowerCase();
    path = splited[1];
  }

  return { method, path };
}

export function outputError() {
  if (!error) return;

  const filePath = error.message.split(': ')[0];
  const relativeFilePath = filePath.replace(paths.appDirectory, '.');
  const errors = error.stack
    .split('\n')
    .filter(line => line.trim().indexOf('at ') !== 0)
    .map(line => line.replace(`${filePath}: `, ''));
  errors.splice(1, 0, ['']);

  console.log(chalk.red('Failed to parse mock config.'));
  console.log();
  console.log(`Error in ${relativeFilePath}`);
  console.log(errors.join('\n'));
  console.log();
}
