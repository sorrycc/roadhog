'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (argv, rcConfig, paths) {
  var appBuild = paths.dllNodeModule;
  var pkg = require((0, _path.join)(paths.appDirectory, 'package.json')); // eslint-disable-line

  var _ref = rcConfig.dllPlugin || {},
      include = _ref.include,
      exclude = _ref.exclude;

  var dependencyNames = Object.keys(pkg.dependencies);
  var includeDependencies = (0, _lodash4.default)(dependencyNames.concat(include || []));

  return {
    entry: {
      roadhog: (0, _lodash2.default)(includeDependencies, exclude)
    },
    output: {
      path: appBuild,
      filename: '[name].dll.js',
      library: '[name]'
    },
    plugins: [new _webpack2.default.DllPlugin({
      path: (0, _path.join)(appBuild, '[name].json'),
      name: '[name]',
      context: paths.appSrc
    })],
    resolve: {
      root: paths.appDirectory,
      modulesDirectories: ['node_modules']
    }
  };
};

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _path = require('path');

var _lodash = require('lodash.pullall');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.uniq');

var _lodash4 = _interopRequireDefault(_lodash3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];