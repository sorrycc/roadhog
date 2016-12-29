const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
require('./registerBabel');

function warnIfExists() {
  const filePath = path.resolve('webpack.config.js');
  if (fs.existsSync(filePath)) {
    console.log(chalk.yellow(`⚠️ ⚠️ ⚠️  It\'s not recommended to use ${chalk.bold('webpack.config.js')}, since roadhog\'s major or minor version upgrades may result in incompatibility. If you insist on doing so, please be careful of the compatibility after upgrading roadhog.`));
    console.log();
  }
}

module.exports = function(config, env) {
  const filePath = path.resolve('webpack.config.js');
  if (fs.existsSync(filePath)) {
    return require(filePath)(config, env);
  } else {
    return config;
  }
};

module.exports.warnIfExists = warnIfExists;
