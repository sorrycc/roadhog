const pathExists = require('path-exists');
const fs = require('fs');
const explain = require('explain-error');
const stripJsonComments = require('strip-json-comments');
const isPlainObject = require('is-plain-object');
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

module.exports = function(fileName = '.roadhogrc', env = 'development') {
  const configPath = paths.resolveApp(fileName);
  if (pathExists.sync(configPath)) {
    try {
      const result = JSON.parse(stripJsonComments(fs.readFileSync(configPath, 'utf-8')));
      if (result.env) {
        if (result.env[env]) merge(result, result.env[env]);
        delete result.env;
      }
      return result;
    } catch (e) {
      throw explain(e, `Config path ${fileName} parse error.`);
    }
  } else {
    return {};
  }
};
