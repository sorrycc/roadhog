'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPaths;

var _require = require('path'),
    resolve = _require.resolve;

var _require2 = require('fs'),
    realpathSync = _require2.realpathSync;

function resolveOwn(relativePath) {
  return resolve(__dirname, relativePath);
}

function getPaths(cwd) {
  var appDirectory = realpathSync(cwd);

  function resolveApp(relativePath) {
    return resolve(appDirectory, relativePath);
  }

  return {
    appBuild: resolveApp('dist'),
    appPublic: resolveApp('public'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    appNodeModules: resolveApp('node_modules'),
    ownNodeModules: resolveOwn('../../node_modules'),
    dllNodeModule: resolveApp('node_modules/roadhog-dlls'),
    dllManifest: resolveApp('node_modules/roadhog-dlls/roadhog.json'),
    resolveApp: resolveApp,
    appDirectory: appDirectory
  };
}
module.exports = exports['default'];