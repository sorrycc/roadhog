'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getTheme;

var _path = require('path');

function getTheme() {
  var cwd = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : process.cwd();
  var _ref = arguments[1];
  var theme = _ref.theme;

  if (theme) {
    if (typeof theme === 'string') {
      var themeFile = (0, _path.resolve)(cwd, theme);
      var themeConfig = require(themeFile); // eslint-disable-line
      return typeof themeConfig === 'function' ? themeConfig() : themeConfig;
    } else {
      return theme;
    }
  }

  return {};
}
module.exports = exports['default'];