import { resolve, join } from 'path';
import dev from 'af-webpack/dev';
import BuildStatistics from 'build-statistics-webpack-plugin';
import BigBrother from 'bigbrother-webpack-plugin';
import chalk from 'chalk';
import notify from 'umi-notify';
import getConfig, {
  watchConfigs,
  unwatchConfigs,
} from 'af-webpack/getUserConfig';
import getWebpackConfig from './getWebpackConfig';
import getPaths from './getPaths';
import registerBabel from './registerBabel';
import { applyMock } from './utils/mock';

const debug = require('debug')('roadhog:dev');

function once(fn) {
  if (!fn.__runned) {
    fn.__runned = true;
    fn();
  }
}

export default function runDev(opts = {}) {
  notify.onDevStart({ name: 'roadhog', version: '2-beta' });
  const { cwd = process.cwd(), entry } = opts;

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
    ({ config } = configObj);
    returnedWatchConfig = configObj.watch;
    debug(`user config: ${JSON.stringify(config)}`);
  } catch (e) {
    console.error(chalk.red(e.message));
    debug('Get .webpackrc config failed, watch config and reload');

    // 监听配置项变更，然后重新执行 dev 逻辑
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
    entry,
  });

  const stagesPath = join(
    __dirname,
    '../.run/build-statistics/compilation.json',
  );
  const roadhogPkg = require(join(__dirname, '../package.json')); // eslint-disable-line
  webpackConfig.plugins.push(
    new BuildStatistics({
      path: stagesPath,
    }),
    new BigBrother({
      cwd,
      tool: {
        name: 'roadhog',
        version: roadhogPkg.version,
        stagesPath,
      },
    }),
  );

  function onCompileDone() {
    notify.onDevComplete({ name: 'roadhog', version: '2-beta' });
  }

  dev({
    webpackConfig,
    proxy: config.proxy || {},
    beforeServer(devServer) {
      try {
        applyMock(devServer);
      } catch (e) {
        console.log(e);
      }
    },
    afterServer(devServer) {
      returnedWatchConfig(devServer);
    },
    openBrowser: true,
    onCompileDone() {
      once(onCompileDone);
    },
  });
}
