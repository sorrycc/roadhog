
function normalizeDefine(define) {
  return Object.keys(define).reduce((memo, key) => {
    memo[key] = JSON.stringify(define[key]);
    return memo;
  }, {});
}

const defaultDefine = {
  'process.env': {},
};

export default function getDefineConfig(NODE_ENV, define = defaultDefine) {
  define['process.env'].NODE_ENV = NODE_ENV;
  return normalizeDefine(define);
}
