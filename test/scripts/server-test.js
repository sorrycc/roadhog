import expect from 'expect';
import { join } from 'path';
import { fork } from 'child_process';
import got from 'got';

process.env.CLEAR_CONSOLE = 'NONE';
const fixtures = join(__dirname, '../fixtures');

describe('server', () => {
  it('mock', (done) => {
    const mock = join(fixtures, 'server/mock');
    process.chdir(mock);
    const p = fork(`${__dirname}/../../lib/server`, [], {
      env: {
        BROWSER: 'none',
      },
    });
    p.on('message', (data) => {
      if (data === 'READY') {
        Promise.all([
          got('http://localhost:8000/a'),
          got('http://localhost:8000/b'),
          // got('http://localhost:8000/tb-page/taobao-home/0.0.50/index.css'),
          // got('http://localhost:8000/someDir/0.0.50/index.css'),
          got.post('http://localhost:8000/c', { body: { a:'b' } }),
        ]).then((res) => {
          const data = res.map(item => item.body);
          expect(data[0]).toEqual('a');
          expect(data[1]).toEqual('{"data":"b"}');
          // expect(data[2].indexOf('.iconfont,.tb-icon,body')).toEqual(0);
          // expect(data[3].indexOf('.iconfont,.tb-icon,body')).toEqual(0);
          expect(data[2]).toEqual('b');
          p.kill('SIGINT');
          done();
        });
      }
    });
  });
});
