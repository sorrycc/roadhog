'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (webpackConfig, paths) {
  var includes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  includes.forEach(function (include) {
    webpackConfig.module.loaders.push({
      test: /\.(js|jsx)$/,
      include: (0, _path.join)(paths.appDirectory, include),
      loader: 'babel'
    });
  });
  return webpackConfig;
};

var _path = require('path');

module.exports = exports['default'];