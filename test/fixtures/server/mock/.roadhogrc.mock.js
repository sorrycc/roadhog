
module.exports = {
  '/a'(req, res) { res.end('a'); },
  '/b': { data: 'b' },
  'GET /tb-page/taobao-home/*': 'https://g.alicdn.com/',
  'GET /someDir/(.*)': 'https://g.alicdn.com/tb-page/taobao-home/',
};
