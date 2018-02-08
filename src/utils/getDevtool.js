import chalk from 'chalk';

export default function getDevtool(devtool) {
  // https://github.com/webpack-contrib/uglifyjs-webpack-plugin
  // cheap-source-map options don't work with this plugin
  if (devtool === 'cheap-source-map') {
    console.log(chalk.yellow('⚠️ cheap-source-map options don\'t work with uglifyjs-webpack-plugin, now cheap-module-source-map is set.'));
    return 'cheap-module-source-map';
  }

  if (devtool.indexOf('eval') >= 0) {
    return false;
  } else {
    return devtool;
  }
}
