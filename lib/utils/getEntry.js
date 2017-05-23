'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.getFiles = getFiles;
exports.getEntries = getEntries;

exports.default = function (config, appDirectory, isBuild) {
  var entry = config.entry;
  var files = entry ? getFiles(entry, appDirectory) : [DEFAULT_ENTRY];
  return getEntries(files, isBuild);
};

var _path = require('path');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DEFAULT_ENTRY = './src/index.js';

function getEntry(filePath, isBuild) {
  var key = (0, _path.basename)(filePath, '.js');
  var value = isBuild ? [filePath] : [require.resolve('react-dev-utils/webpackHotDevClient'), filePath];
  return _defineProperty({}, key, value);
}

function getFiles(entry, cwd) {
  if (Array.isArray(entry)) {
    return entry.reduce(function (memo, entryItem) {
      return memo.concat(getFiles(entryItem, cwd));
    }, []);
  } else {
    (0, _assert2.default)(typeof entry === 'string', 'getEntry/getFiles: entry type should be string, but got ' + (typeof entry === 'undefined' ? 'undefined' : _typeof(entry)));
    var files = _glob2.default.sync(entry, {
      cwd: cwd
    });
    return files.map(function (file) {
      return file.charAt(0) === '.' ? file : '.' + _path.sep + file;
    });
  }
}

function getEntries(files, isBuild) {
  return files.reduce(function (memo, file) {
    return Object.assign(memo, getEntry(file, isBuild));
  }, {});
}