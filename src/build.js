import { resolve, join } from 'path';
import build from 'af-webpack/build';
import getConfig from 'af-webpack/getUserConfig';
import getWebpackConfig from './getWebpackConfig';
import getPaths from './getPaths';
import registerBabel from './registerBabel';
import BuildStatistics from 'build-statistics-webpack-plugin';
import BigBrother from 'bigbrother-webpack-plugin';

const debug = require('debug')('roadhog:build');

export default function(opts = {}) {
  const { cwd = process.cwd(), watch, entry } = opts;

  const babel = resolve(__dirname, './babel.js');
  const paths = getPaths(cwd);
  const stagesPath = join(
    __dirname,
    '../.run/build-statistics/compilation.json',
  );
  const roadhogPkg = require(join(__dirname, '../package.json'));

  return new Promise(resolve => {
    // register babel for config files
    registerBabel(babel, {
      cwd,
      configOnly: true,
    });

    // get user config
    const { config } = getConfig({ cwd });
    debug(`user config: ${JSON.stringify(config)}`);

    // get webpack config
    const webpackConfig = getWebpackConfig({
      cwd,
      config,
      babel,
      paths,
      entry,
    });

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

    build({
      webpackConfig,
      watch,
      success: resolve,
    });
  });
}
