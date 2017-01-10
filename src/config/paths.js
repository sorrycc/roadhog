const { resolve } = require('path');
const { realpathSync } = require('fs');

const appDirectory = realpathSync(process.cwd());

function resolveApp(relativePath) {
  return resolve(appDirectory, relativePath);
}

function resolveOwn(relativePath) {
  return resolve(__dirname, relativePath);
}

export default {
  appBuild: resolveApp('dist'),
  appPublic: resolveApp('public'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appNodeModules: resolveApp('node_modules'),
  ownNodeModules: resolveOwn('../node_modules'),
  resolveApp,
  appDirectory,
};
