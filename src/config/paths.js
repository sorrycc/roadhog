const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());

function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

function resolveOwn(relativePath) {
  return path.resolve(__dirname, relativePath);
}

module.exports = {
  appBuild: resolveApp('dist'),
  appPublic: resolveApp('public'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appNodeModules: resolveApp('node_modules'),
  ownNodeModules: resolveOwn('../node_modules'),
  resolveApp,
  appDirectory,
};
