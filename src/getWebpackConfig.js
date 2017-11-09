import getConfig from 'af-webpack/getConfig';
import defaultBrowsers from './defaultConfigs/browsers';
import getEntry from './utils/getEntry';

const debug = require('debug')('roadhog:getWebpackConfig');

const env = process.env.NODE_ENV;
const isDev = env === 'development';

export default function (opts = {}) {
  const {
    cwd,
    config,
    babel,
    paths,
  } = opts;

  const browsers = config.browsers || defaultBrowsers;
  debug(`babel: ${babel}`);

  return getConfig(env, {
    cwd,
    outputPath: paths.appBuild,
    entry: getEntry(config, paths.appDirectory, /* isBuild */!isDev),
    autoprefixer: { browsers },
    babel: {
      presets: [[babel, { browsers }]],
    },
    // dev 模式下始终不开启 hash
    hash: isDev ? false : config.hash,
    enableCSSModules: !config.disableCSSModules,
    define: opts.define,
    commons: opts.commons,
    // theme,
  });
}
