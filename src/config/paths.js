const { resolve } = require('path');
const { realpathSync } = require('fs');

function resolveOwn(relativePath) {
  return resolve(__dirname, relativePath);
}

export default function getPaths(cwd) {
  const appDirectory = realpathSync(cwd);

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
    appBabelCache: resolveApp('node_modules/.cache/babel-loader'),
    resolveApp,
    appDirectory,
  };
}
