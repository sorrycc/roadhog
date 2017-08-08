import c from './mock/c';

export default {
  ...c,
  '/a'(req, res) { res.end('a'); },
  '/b': { data: 'b' },
  'POST /c'(req, res) { res.end(req.body.a); },
  'GET /tb-page/taobao-home/*': 'https://g.alicdn.com/',
  'GET /someDir/(.*)': 'https://g.alicdn.com/tb-page/taobao-home/',
};
