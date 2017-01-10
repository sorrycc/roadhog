import { join } from 'path';
import expect from 'expect';
import { getFiles } from '../../src/utils/getEntry';

const fixtures = join(__dirname, '..', 'fixtures');
const getEntryFixture = join(fixtures, 'getEntry');

describe('getEntry', () => {
  it('array', () => {
    expect(getFiles(['./src/a.js'], getEntryFixture)).toEqual([
      './src/a.js',
    ]);
  });

  it('string', () => {
    expect(getFiles('./src/a.js', getEntryFixture)).toEqual([
      './src/a.js',
    ]);
  });

  it('add ./', () => {
    expect(getFiles('src/a.js', getEntryFixture)).toEqual([
      './src/a.js',
    ]);
  });

  it('error if entry is not string', () => {
    expect(() => {
      getFiles(null, getEntryFixture);
    }).toThrow(/entry type should be string/);
  });

  it('glob', () => {
    expect(getFiles('./src/pages/*.js', getEntryFixture)).toEqual([
      './src/pages/b.js',
      './src/pages/c.js',
    ]);
  });

  it('glob 2', () => {
    expect(getFiles('./src/**/*.js', getEntryFixture)).toEqual([
      './src/a.js',
      './src/pages/b.js',
      './src/pages/c.js',
    ]);
  });

  it('glob and array', () => {
    expect(getFiles(['./src/pages/*.js', './src/a.js'], getEntryFixture)).toEqual([
      './src/pages/b.js',
      './src/pages/c.js',
      './src/a.js',
    ]);
  });
});
