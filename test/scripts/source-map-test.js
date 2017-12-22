import expect from 'expect';
import { join } from 'path';
import { readFileSync, existsSync } from 'fs';
import glob from 'glob';
import { build } from '../../src/build';

function assertExists(actualDir, expectDir) {
  const expectFiles = glob.sync('**/*', { cwd: expectDir, nodir: true });
  expectFiles.forEach((file) => {
    const actualFilePath = join(actualDir, file);
    expect(existsSync(actualFilePath)).toBe(true, `file ${actualFilePath} not exits`);
  });
}

function assertCorrect(actualDir, expectDir) {
  const expectFiles = glob.sync('**/*', { cwd: expectDir, nodir: true });
  expectFiles.forEach((file) => {
    const actualFile = readFileSync(join(actualDir, file), 'utf-8');
    const expectFile = readFileSync(join(expectDir, file), 'utf-8');
    expect(actualFile).toEqual(expectFile);
  });
}

describe('source-map', () => {
  const cwd = join(__dirname, '../fixtures/source-map');
  process.chdir(cwd);

  before((done) => {
    build({
      debug: false,
      cwd,
    }).then(done).catch(done);
  });

  it('generated', () => {
    assertExists(join(cwd, 'dist'), join(cwd, 'expected'));
  });

  it('correct', () => {
    assertCorrect(join(cwd, 'dist'), join(cwd, 'expected'));
  });
});
