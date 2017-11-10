import { resolve } from 'path';
import dev from 'af-webpack/dev';
import getWebpackConfig from './getWebpackConfig';
import getConfig from './utils/getConfig';
import getPaths from './getPaths';
import registerBabel from './registerBabel';

const debug = require('debug')('roadhog:build');

export default function(opts = {}) {
  const { cwd = process.cwd() } = opts;

  const env = process.env.NODE_ENV;
  const babel = resolve(__dirname, './babel.js');
  const paths = getPaths(cwd);

  // register babel for config files
  registerBabel(babel, {
    cwd,
    configOnly: true,
  });

  // get user config
  const config = getConfig(env, cwd);
  debug(`user config: ${JSON.stringify(config)}`);

  // get webpack config
  const webpackConfig = getWebpackConfig({
    cwd,
    config,
    babel,
    paths,
  });

  dev({
    webpackConfig,
    appName: 'your app',
  });
}
