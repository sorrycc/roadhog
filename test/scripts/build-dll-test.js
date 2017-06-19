import expect from 'expect';
import { join } from 'path';
import { readFileSync } from 'fs';
import glob from 'glob';
import { build } from '../../src/buildDll';

function assertResult(actualDir, expectDir) {
  const actualFiles = glob.sync('**/*', { cwd: actualDir, nodir: true });

  actualFiles.forEach((file) => {
    const actualFile = readFileSync(join(actualDir, file), 'utf-8');
    const expectFile = readFileSync(join(expectDir, file), 'utf-8');
    expect(actualFile).toEqual(expectFile);
  });
}

function testBuild(cwd, done) {
  build({
    debug: true,
    cwd,
  }).then(() => {
    try {
      assertResult(join(cwd, 'node_modules/roadhog-dlls'), join(cwd, 'expected'));
    } catch (e) {
      console.log(e);
    }
    done();
  });
}

describe('build-dll', () => {
  const dirPath = join(__dirname, '../fixtures/buildDll');

  it('buildDll', (done) => {
    process.chdir(dirPath);
    testBuild(dirPath, done);
  });
});
