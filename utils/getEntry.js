const path = require('path');
const assert = require('assert');
const glob = require('glob');
const paths = require('../config/paths');
const getConfig = require('./getConfig');

const DEFAULT_ENTRY = './src/index.js';

function getEntry(filePath) {
  const isProduction = process.env.NODE_ENV === 'production';
  const key = path.basename(filePath, '.js');
  const value = isProduction
    ? [filePath]
    : [
      require.resolve('react-dev-utils/webpackHotDevClient'),
      filePath,
    ];
  return {
    [key]: value,
  };
}

function getFiles(entry, cwd) {
  if (Array.isArray(entry)) {
    return entry.reduce((memo, entryItem) => {
      return memo.concat(getFiles(entryItem, cwd));
    }, []);
  } else {
    assert(
      typeof entry === 'string',
      `getEntry/getFiles: entry type should be string, but got ${typeof entry}`
    );
    return glob.sync(entry, {
      cwd,
    });
  }
}

module.exports = function() {
  const entry = getConfig().entry;

  const files = entry ? getFiles(entry, paths.appDirectory) : [DEFAULT_ENTRY];
  return files.reduce((memo, file) => {
    return Object.assign(memo, getEntry(file));
  }, {});
};

module.exports.getFiles = getFiles;
