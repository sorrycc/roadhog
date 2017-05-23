'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warnIfExists = warnIfExists;
exports.default = applyWebpackConfig;

var _fs = require('fs');

var _path = require('path');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('./registerBabel');

function warnIfExists() {
  var filePath = (0, _path.resolve)('webpack.config.js');
  if ((0, _fs.existsSync)(filePath)) {
    console.log(_chalk2.default.yellow('\u26A0\uFE0F \u26A0\uFE0F \u26A0\uFE0F  It\\\'s not recommended to use ' + _chalk2.default.bold('webpack.config.js') + ', since roadhog\\\'s major or minor version upgrades may result in incompatibility. If you insist on doing so, please be careful of the compatibility after upgrading roadhog.'));
    console.log();
  }
}

function applyWebpackConfig(config, env) {
  var filePath = (0, _path.resolve)('webpack.config.js');
  if ((0, _fs.existsSync)(filePath)) {
    return require(filePath)(config, env); // eslint-disable-line
  } else {
    return config;
  }
}