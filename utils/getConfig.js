const fs = require('fs');
const stripJsonComments = require('strip-json-comments');
const isPlainObject = require('is-plain-object');
const parseJSON = require('parse-json-pretty');
const paths = require('../config/paths');
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

  if (fs.existsSync(rcConfig)) {
    return parseJSON(stripJsonComments(fs.readFileSync(rcConfig, 'utf-8')), './roadhogrc');
  } else if (fs.existsSync(jsConfig)) {
    return require(jsConfig);
  } else {
    return {};
  }
}

function realGetConfig(configFile, env) {
  env = env || 'development';
  const config = getConfig(configFile);
  if (config.env) {
    if (config.env[env]) merge(config, config.env[env]);
    delete config.env;
  }
  return config;
}

module.exports = function() {
  return realGetConfig('.roadhogrc', process.env.NODE_ENV);
};

module.exports.realGetConfig = realGetConfig;
