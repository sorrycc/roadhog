import getConfig from 'af-webpack/getConfig';
import { existsSync } from 'fs';
import defaultBrowsers from './defaultConfigs/browsers';
import getEntry from './utils/getEntry';

const debug = require('debug')('roadhog:getWebpackConfig');

const isDev = process.env.NODE_ENV === 'development';

export default function(opts = {}) {
  const { cwd, config, babel, paths } = opts;

  const browsers = config.browsers || defaultBrowsers;
  debug(`babel: ${babel}`);

  return getConfig({
    cwd,
    outputPath: paths.appBuild,
    publicPath: config.publicPath,
    entry: getEntry(config, paths.appDirectory, /* isBuild */ !isDev),
    autoprefixer: { browsers },
    babel: {
      presets: [[babel, { browsers }], ...(config.extraBabelPresets || [])],
      plugins: config.extraBabelPlugins || [],
    },
    // no hash in dev mode
    hash: isDev ? false : config.hash,
    enableCSSModules: !config.disableCSSModules,
    theme: config.theme,
    define: config.define,
    commons: config.commons,
    copy: existsSync(paths.appPublic)
      ? [
          {
            from: paths.appPublic,
            to: paths.appBuild,
          },
        ]
      : [],
  });
}
