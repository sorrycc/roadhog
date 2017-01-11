import { existsSync, readFileSync } from 'fs';
import stripJsonComments from 'strip-json-comments';
import isPlainObject from 'is-plain-object';
import parseJSON from 'parse-json-pretty';
import getPaths from '../config/paths';

require('./registerBabel');

function merge(oldObj, newObj) {
  for (const key in newObj) {
    if (Array.isArray(newObj[key]) && Array.isArray(oldObj[key])) {
      oldObj[key] = oldObj[key].concat(newObj[key]);
    } else if (isPlainObject(newObj[key]) && isPlainObject(oldObj[key])) {
      oldObj[key] = Object.assign(oldObj[key], newObj[key]);
    } else {
      oldObj[key] = newObj[key];
    }
  }
}

function getConfig(configFile, paths) {
  const rcConfig = paths.resolveApp(configFile);
  const jsConfig = paths.resolveApp(`${configFile}.js`);

  if (existsSync(rcConfig)) {
    return parseJSON(stripJsonComments(readFileSync(rcConfig, 'utf-8')), './roadhogrc');
  } else if (existsSync(jsConfig)) {
    return require(jsConfig);  // eslint-disable-line
  } else {
    return {};
  }
}

function replaceNpmVariables(value, pkg) {
  if (typeof value === 'string') {
    return value
      .replace('$npm_package_name', pkg.name)
      .replace('$npm_package_version', pkg.version);
  } else {
    return value;
  }
}

export function realGetConfig(configFile, env, pkg = {}, paths) {
  env = env || 'development';
  const config = getConfig(configFile, paths);
  if (config.env) {
    if (config.env[env]) merge(config, config.env[env]);
    delete config.env;
  }

  return Object.keys(config).reduce((memo, key) => {
    memo[key] = replaceNpmVariables(config[key], pkg);
    return memo;
  }, {});
}

export default function (env, cwd) {
  const paths = getPaths(cwd);
  const pkg = JSON.parse(readFileSync(paths.appPackageJson, 'utf-8'));
  return realGetConfig('.roadhogrc', env, pkg, paths);
}
