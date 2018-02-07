import chalk from 'chalk';

export default function getDevtool(devtool) {
  // https://github.com/webpack-contrib/uglifyjs-webpack-plugin
  // cheap-source-map options don't work with this plugin
  if (devtool === 'cheap-source-map') {
    console.log(chalk.red('cheap-source-map options don\'t work with uglifyjs-webpack-plugin, cheap-module-source-map is recommended.'));
    process.exit(1);
  }

  if (devtool.indexOf('eval') >= 0) {
    return false;
  } else {
    return devtool;
  }
}
