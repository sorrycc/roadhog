'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.realGetConfig = realGetConfig;

exports.default = function (env, cwd) {
  var paths = (0, _paths2.default)(cwd);
  var pkg = JSON.parse((0, _fs.readFileSync)(paths.appPackageJson, 'utf-8'));
  return realGetConfig('.roadhogrc', env, pkg, paths);
};

var _fs = require('fs');

var _stripJsonComments = require('strip-json-comments');

var _stripJsonComments2 = _interopRequireDefault(_stripJsonComments);

var _isPlainObject = require('is-plain-object');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _parseJsonPretty = require('parse-json-pretty');

var _parseJsonPretty2 = _interopRequireDefault(_parseJsonPretty);

var _paths = require('../config/paths');

var _paths2 = _interopRequireDefault(_paths);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('./registerBabel');

function merge(oldObj, newObj) {
  for (var key in newObj) {
    if (Array.isArray(newObj[key]) && Array.isArray(oldObj[key])) {
      oldObj[key] = oldObj[key].concat(newObj[key]);
    } else if ((0, _isPlainObject2.default)(newObj[key]) && (0, _isPlainObject2.default)(oldObj[key])) {
      oldObj[key] = Object.assign(oldObj[key], newObj[key]);
    } else {
      oldObj[key] = newObj[key];
    }
  }
}

function getConfig(configFile, paths) {
  var rcConfig = paths.resolveApp(configFile);
  var jsConfig = paths.resolveApp(configFile + '.js');

  if ((0, _fs.existsSync)(rcConfig)) {
    return (0, _parseJsonPretty2.default)((0, _stripJsonComments2.default)((0, _fs.readFileSync)(rcConfig, 'utf-8')), './roadhogrc');
  } else if ((0, _fs.existsSync)(jsConfig)) {
    return require(jsConfig); // eslint-disable-line
  } else {
    return {};
  }
}

function replaceNpmVariables(value, pkg) {
  if (typeof value === 'string') {
    return value.replace('$npm_package_name', pkg.name).replace('$npm_package_version', pkg.version);
  } else {
    return value;
  }
}

function realGetConfig(configFile, env) {
  var pkg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var paths = arguments[3];

  env = env || 'development';
  var config = getConfig(configFile, paths);
  if (config.env) {
    if (config.env[env]) merge(config, config.env[env]);
    delete config.env;
  }

  return Object.keys(config).reduce(function (memo, key) {
    memo[key] = replaceNpmVariables(config[key], pkg);
    return memo;
  }, {});
}