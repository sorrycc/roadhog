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
    const p = fork(`${__dirname}/../../lib/server`, ['--no-open']);
    p.on('message', (data) => {
      if (data === 'READY') {
        Promise.all([
          got('http://localhost:8000/a'),
          got('http://localhost:8000/b'),
        ]).then((res) => {
          const data = res.map(item => item.body);
          expect(data).toEqual(['a', '{"data":"b"}']);
          p.kill('SIGINT');
          done();
        });
      }
    });
  });
});
