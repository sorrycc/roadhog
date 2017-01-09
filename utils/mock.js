'use strict';

const fs = require('fs');
const assert = require('assert');
const chokidar = require('chokidar');
const chalk = require('chalk');
const paths = require('../config/paths');

let error = null;

function getConfig(filePath) {
  const resolvedFilePath = paths.resolveApp(filePath || '.roadhogrc.server.js');
  if (fs.existsSync(resolvedFilePath)) {
    const files = [];
    const realRequire = require.extensions['.js'];
    require.extensions['.js'] = function(m, filename) {
      files.push(filename);
      delete require.cache[filename];
      return realRequire(m, filename);
    };

    const config = require(resolvedFilePath);
    require.extensions['.js'] = realRequire;

    return {
      config: config,
      files: files,
    };
  }
}

function createMockHandler(method, path, value) {
  return function mockHandler() {
    value.apply(null, arguments);
  };
}

function applyMock(devServer) {
  const realRequire = require.extensions['.js'];
  try {
    realApplyMock(devServer);
    error = null;
  } catch(e) {
    // 避免 require mock 文件出错时 100% cpu
    require.extensions['.js'] = realRequire;

    error = e;

    console.log(chalk.red(e.message));
    console.log(e.stack);

    const watcher = chokidar.watch(paths.resolveApp('.roadhogrc.server.js'), {
      ignored: /node_modules/,
      persistent: true,
    });
    watcher.on('change', function(path) {
      console.log(chalk.green('CHANGED'), path.replace(paths.appDirectory, '.'));
      watcher.close();
      applyMock(devServer);
    });
  }
}

function realApplyMock(devServer) {
  const ret = getConfig();
  const config = ret.config;
  const files = ret.files;
  const app = devServer.app;

  Object.keys(config).forEach(function(key) {
    const keyParsed = parseKey(key);
    assert(
      !!app[keyParsed.method],
      `method of ${key} is not valid`
    );
    assert(
      typeof config[key] === 'function',
      `mock value of ${key} should be function, but got ${typeof config[key]}`
    );
    app[keyParsed.method](
      keyParsed.path,
      createMockHandler(keyParsed.method, keyParsed.path, config[key])
    );
  });

  // 调整 stack，把 historyApiFallback 放到最后
  let lastIndex = null;
  app._router.stack.forEach(function(item, index) {
    if (item.name === 'webpackDevMiddleware') {
      lastIndex = index;
    }
  });
  const mockAPILength = app._router.stack.length - 1 - lastIndex;
  if (lastIndex && lastIndex > 0) {
    const newStack = app._router.stack;
    newStack.push(newStack[lastIndex-1]);
    newStack.push(newStack[lastIndex]);
    newStack.splice(lastIndex - 1, 2);
    app._router.stack = newStack;
  }

  const watcher = chokidar.watch(files, {
    ignored: /node_modules/,
    persistent: true,
  });
  watcher.on('change', function(path) {
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

  return {
    method: method,
    path: path,
  };
}

function getError() {
  return error;
}

exports.getConfig = getConfig;
exports.applyMock = applyMock;
exports.getError = getError;
