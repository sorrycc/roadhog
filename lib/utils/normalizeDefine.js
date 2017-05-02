"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = normalizeDefine;
function normalizeDefine(define) {
  return Object.keys(define).reduce(function (memo, key) {
    memo[key] = JSON.stringify(define[key]);
    return memo;
  }, {});
}
module.exports = exports["default"];