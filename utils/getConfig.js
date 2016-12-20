const fs = require('fs');
const stripJsonComments = require('strip-json-comments');
const isPlainObject = require('is-plain-object');
const parseJSON = require('parse-json-pretty');
const paths = require('../config/paths');

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

function realGetConfig(fileName, env = 'development') {
  const configPath = paths.resolveApp(fileName);
  if (fs.existsSync(configPath)) {
    const result = parseJSON(stripJsonComments(fs.readFileSync(configPath, 'utf-8')), `./${fileName}`);
    if (result.env) {
      if (result.env[env]) merge(result, result.env[env]);
      delete result.env;
    }
    return result;
  } else {
    return {};
  }
}

module.exports = function() {
  return realGetConfig('.roadhogrc', process.env.NODE_ENV);
};

module.exports.realGetConfig = realGetConfig;
