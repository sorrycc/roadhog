import { existsSync, readFileSync } from 'fs';
import stripJsonComments from 'strip-json-comments';
import isPlainObject from 'is-plain-object';
import parseJSON from 'parse-json-pretty';
import paths from '../config/paths';

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

function getConfig(configFile) {
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

export function realGetConfig(configFile, env) {
  env = env || 'development';
  const config = getConfig(configFile);
  if (config.env) {
    if (config.env[env]) merge(config, config.env[env]);
    delete config.env;
  }
  return config;
}

export default function () {
  return realGetConfig('.roadhogrc', process.env.NODE_ENV);
}
