import { resolve } from 'path';
import dev from 'af-webpack/dev';
import chalk from 'chalk';
import getConfig, {
  watchConfigs,
  unwatchConfigs,
} from 'af-webpack/getUserConfig';
import getWebpackConfig from './getWebpackConfig';
import getPaths from './getPaths';
import registerBabel from './registerBabel';

const debug = require('debug')('roadhog:dev');

export default function runDev(opts = {}) {
  const { cwd = process.cwd() } = opts;

  const babel = resolve(__dirname, './babel.js');
  const paths = getPaths(cwd);

  // register babel for config files
  registerBabel(babel, {
    cwd,
    configOnly: true,
  });

  // get user config
  let config = null;
  let returnedWatchConfig = null;
  try {
    const configObj = getConfig({ cwd });
    config = configObj.config;
    returnedWatchConfig = configObj.watch;
    debug(`user config: ${JSON.stringify(config)}`);
  } catch (e) {
    console.error(chalk.red(e.message));
    debug('Get .webpackrc config failed, watch config and reload');

    // ��������������Ȼ������ִ�� dev �߼�
    watchConfigs().on('all', (event, path) => {
      debug(`[${event}] ${path}, unwatch and reload`);
      unwatchConfigs();
      runDev(opts);
    });
    return;
  }

  // get webpack config
  const webpackConfig = getWebpackConfig({
    cwd,
    config,
    babel,
    paths,
  });

  dev({
    webpackConfig,
    proxy: config.proxy || {},
    afterServer(devServer) {
      returnedWatchConfig(devServer);
    },
  });
}
