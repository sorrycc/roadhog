/**
 * webpack config for eslint.
 */

const chalk = require('chalk');
const paths = require('../config/paths');
const getConfig = require('../utils/getConfig');
const applyWebpackConfig = require('../utils/applyWebpackConfig');

let rcConfig;
try {
  rcConfig = getConfig(process.env.NODE_ENV);
} catch (e) {
  console.log(chalk.red('Failed to parse .roadhogrc config.'));
  console.log();
  console.log(e.message);
  process.exit(1);
}

const argv = require('yargs')
  .usage('Usage: roadhog build [options]')
  .option('debug', {
    type: 'boolean',
    describe: 'Build with compress',
    default: false,
  })
  .option('watch', {
    type: 'boolean',
    alias: 'w',
    describe: 'Watch file changes and rebuild',
    default: false,
  })
  .option('output-path', {
    type: 'string',
    alias: 'o',
    describe: 'Specify output path',
    default: null,
  })
  .option('analyze', {
    type: 'boolean',
    describe: 'Visualize and analyze your Webpack bundle.',
    default: false,
  })
  .help('h')
  .argv;

const outputPath = argv.outputPath || rcConfig.outputPath || 'dist';
const appBuild = paths.resolveApp(outputPath);
const config = applyWebpackConfig(
  require('../config/webpack.config.prod')(argv, appBuild),
  process.env.NODE_ENV
);

module.exports = config;
