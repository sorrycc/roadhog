
module.exports = function(define) {
  return Object.keys(define).reduce((memo, key) => {
    memo[key] = JSON.stringify(define[key]);
    return memo;
  }, {});
};
