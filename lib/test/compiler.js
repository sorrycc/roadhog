'use strict';

require('babel-register')({
  presets: [require.resolve('babel-preset-es2015'), require.resolve('babel-preset-react'), require.resolve('babel-preset-stage-0')],
  plugins: [require.resolve('babel-plugin-add-module-exports')]
});

var noop = function noop() {
  return null;
};
['.css', '.less', '.html', '.htm'].forEach(function (ext) {
  require.extensions[ext] = noop;
});