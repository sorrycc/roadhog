import getConfig from 'af-webpack/getConfig';
import defaultBrowsers from './defaultConfigs/browsers';
import getEntry from './utils/getEntry';

const debug = require('debug')('roadhog:getWebpackConfig');

const isDev = process.env.NODE_ENV === 'development';

export default function(opts = {}) {
  const { cwd, config, babel, paths } = opts;

  const browserslist = config.browserslist || defaultBrowsers;
  debug(`babel: ${babel}`);
  debug(`browserslist: ${browserslist}`);

  return getConfig({
    cwd,
    ...config,

    entry: getEntry({
      cwd: paths.appDirectory,
      entry: config.entry,
      isBuild: !isDev,
    }),
    babel: config.babel || {
      presets: [
        [babel, { browsers: browserslist }],
        ...(config.extraBabelPresets || []),
      ],
      plugins: config.extraBabelPlugins || [],
    },
    browserslist,
  });
}
