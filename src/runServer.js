import fs from 'fs';
import clearConsole from 'react-dev-utils/clearConsole';
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages';
import openBrowser from 'react-dev-utils/openBrowser';
import {
  choosePort,
} from 'react-dev-utils/WebpackDevServerUtils';
import webpack from 'webpack';
import historyApiFallback from 'connect-history-api-fallback';
import WebpackDevServer from 'webpack-dev-server';
import chalk from 'chalk';
import chokidar from 'chokidar';
import getPaths from './config/paths';
import getConfig from './utils/getConfig';
import runArray from './utils/runArray';
import applyWebpackConfig, { warnIfExists } from './utils/applyWebpackConfig';
import { applyMock, outputError as outputMockError } from './utils/mock';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const DEFAULT_PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;
const isInteractive = process.stdout.isTTY;
const cwd = process.cwd();
const paths = getPaths(cwd);
let compiler;

require('yargs') // eslint-disable-line
  .usage('Usage: roadhog server [options]')
  .help('h')
  .argv;

let rcConfig;
let config;

function clearConsoleWrapped() {
  if (process.env.CLEAR_CONSOLE !== 'none') {
    clearConsole();
  }
}

function readRcConfig() {
  try {
    rcConfig = getConfig(process.env.NODE_ENV, cwd);
  } catch (e) {
    console.log(chalk.red('Failed to parse .roadhogrc config.'));
    console.log();
    console.log(e.message);
    process.exit(1);
  }
}

function readWebpackConfig() {
  config = runArray(rcConfig, (c) => {
    return applyWebpackConfig(
      require('./config/webpack.config.dev')(c, cwd),
      process.env.NODE_ENV,
    );
  });
}


function setupCompiler(host, port, protocol) {
  try {
    compiler = webpack(config);
  } catch (e) {
    console.log(e);
  }

  compiler.plugin('invalid', () => {
    if (isInteractive) {
      clearConsoleWrapped();
    }
    console.log('Compiling...');
  });

  let isFirstCompile = true;
  compiler.plugin('done', (stats) => {
    if (isInteractive) {
      clearConsoleWrapped();
    }

    const json = stats.toJson({}, true);
    const messages = formatWebpackMessages(json);
    const isSuccessful = !messages.errors.length && !messages.warnings.length;
    const showInstructions = isSuccessful && (isInteractive || isFirstCompile);

    warnIfExists();

    if (isSuccessful) {
      if (stats.stats) {
        console.log(chalk.green('Compiled successfully'));
      } else {
        console.log(chalk.green(`Compiled successfully in ${(json.time / 1000).toFixed(1)}s!`));
      }
    }

    if (showInstructions) {
      console.log();
      console.log('The app is running at:');
      console.log();
      console.log(`  ${chalk.cyan(`${protocol}://${host}:${port}/`)}`);
      console.log();
      console.log('Note that the development build is not optimized.');
      console.log(`To create a production build, use ${chalk.cyan('npm run build')}.`);
      console.log();
      isFirstCompile = false;
    }

    // If errors exist, only show errors.
    if (messages.errors.length) {
      console.log(chalk.red('Failed to compile.'));
      console.log();
      messages.errors.forEach((message) => {
        console.log(message);
        console.log();
      });

    // Show warnings if no errors were found.
    } else if (messages.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.'));
      console.log();
      messages.warnings.forEach((message) => {
        console.log(message);
        console.log();
      });
      // Teach some ESLint tricks.
      console.log('You may use special comments to disable some warnings.');
      console.log(`Use ${chalk.yellow('// eslint-disable-next-line')} to ignore the next line.`);
      console.log(`Use ${chalk.yellow('/* eslint-disable */')} to ignore all warnings in a file.`);
      console.log();
    }

    if (isInteractive) {
      outputMockError();
    }
  });
}

function addMiddleware(devServer) {
  const proxy = require(paths.appPackageJson).proxy;  // eslint-disable-line
  devServer.use(historyApiFallback({
    disableDotRule: true,
    htmlAcceptHeaders: proxy ?
      ['text/html'] :
      ['text/html', '*/*'],
  }));
  // TODO: proxy index.html, ...
  devServer.use(devServer.middleware);
}

function getPublicPath() {
  if (Array.isArray(config)) {
    return config[0].output.publicPath;
  } else {
    return config.output.publicPath;
  }
}

function runDevServer(host, port, protocol) {
  const devServer = new WebpackDevServer(compiler, {
    disableHostCheck: true,
    compress: true,
    clientLogLevel: 'none',
    contentBase: paths.appPublic,
    hot: true,
    publicPath: getPublicPath(),
    quiet: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    https: protocol === 'https',
    host,
    proxy: rcConfig.proxy,
  });

  addMiddleware(devServer);
  applyMock(devServer);

  devServer.listen(port, '0.0.0.0', (err) => {
    if (err) {
      return console.log(err);
    }

    process.send('READY');

    if (isInteractive) {
      clearConsoleWrapped();
    }
    console.log(chalk.cyan('Starting the development server...'));
    console.log();
    if (isInteractive) {
      outputMockError();
    }

    openBrowser(`${protocol}://${host}:${port}/`);
  });

  setupWatch(devServer, port);
}

function setupWatch(devServer) {
  const files = [
    paths.resolveApp('.roadhogrc'),
    paths.resolveApp('.roadhogrc.js'),
    paths.resolveApp('webpack.config.js'),
  ]
    .concat(typeof rcConfig.theme === 'string' ? paths.resolveApp(rcConfig.theme) : []);
  const watcher = chokidar.watch(files, {
    ignored: /node_modules/,
    persistent: true,
  });
  watcher.on('change', (path) => {
    console.log(chalk.green(`File ${path.replace(paths.appDirectory, '.')} changed, try to restart server`));
    watcher.close();
    devServer.close();
    process.send('RESTART');
  });
}

function run(port) {
  const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
  const host = process.env.HOST || 'localhost';
  setupCompiler(host, port, protocol);
  runDevServer(host, port, protocol);
}

function init() {
  readRcConfig();

  if (rcConfig.dllPlugin && !fs.existsSync(paths.dllManifest)) {
    console.log(chalk.red('Failed to start the server, since you have enabled dllPlugin, but have not run `roadhog buildDll` before `roadhog server`.'));
    process.exit(1);
  }

  readWebpackConfig();

  const HOST = process.env.HOST || '0.0.0.0';
  choosePort(HOST, DEFAULT_PORT).then((port) => {
    if (port === null) {
      return;
    }

    try {
      run(port);
    } catch (e) {
      console.log(e);
    }
  });
}

init();
