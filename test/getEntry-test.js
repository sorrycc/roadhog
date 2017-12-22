import { join } from 'path';
import expect from 'expect';
import getEntry from '../src/utils/getEntry';

const fixtures = join(__dirname, 'fixtures/getEntry');

describe('getEntry', () => {
  it('no config', () => {
    const entry = getEntry({
      cwd: join(fixtures, 'no-config'),
      isBuild: true,
    });
    expect(entry.index).toEqual('./src/index.js');
  });

  it('no config (dev)', () => {
    const entry = getEntry({
      cwd: join(fixtures, 'no-config'),
      isBuild: false,
    });
    expect(entry.index.length).toEqual(2);
    expect(
      entry.index[0].indexOf('af-webpack/lib/webpackHotDevClient.js') > -1,
    ).toEqual(true);
  });

  it('no config (tsx)', () => {
    const entry = getEntry({
      cwd: join(fixtures, 'no-config-tsx'),
      isBuild: true,
    });
    expect(entry.index).toEqual('./src/index.tsx');
  });

  it('no config (ts)', () => {
    const entry = getEntry({
      cwd: join(fixtures, 'no-config-ts'),
      isBuild: true,
    });
    expect(entry.index).toEqual('./src/index.ts');
  });

  it('no config (jsx)', () => {
    const entry = getEntry({
      cwd: join(fixtures, 'no-config-jsx'),
      isBuild: true,
    });
    expect(entry.index).toEqual('./src/index.jsx');
  });

  it('config string', () => {
    const entry = getEntry({
      entry: './pages/a.js',
      cwd: join(fixtures, 'config'),
      isBuild: true,
    });
    expect(entry.a).toEqual('./pages/a.js');
  });

  it('config string (glob)', () => {
    const entry = getEntry({
      entry: './pages/*.js',
      cwd: join(fixtures, 'config'),
      isBuild: true,
    });
    expect(Object.keys(entry)).toEqual(['a', 'b']);
  });

  it('config array', () => {
    const entry = getEntry({
      entry: ['./pages/a.js', './extra/c.js'],
      cwd: join(fixtures, 'config'),
      isBuild: true,
    });
    expect(Object.keys(entry)).toEqual(['a', 'c']);
  });

  it('config array (glob)', () => {
    const entry = getEntry({
      entry: ['./pages/*.js', './extra/c.js'],
      cwd: join(fixtures, 'config'),
      isBuild: true,
    });
    expect(Object.keys(entry)).toEqual(['a', 'b', 'c']);
  });

  it('config object', () => {
    const entry = getEntry({
      entry: { a: './a/b.js' },
      cwd: join(fixtures, 'config'),
      isBuild: true,
    });
    expect(entry.a).toEqual('./a/b.js');
  });

  // it('ts', () => {
  //   expect(getEntries(['./src/a.ts'], getEntryFixture)).toEqual({
  //     a: ['./src/a.ts'],
  //   });
  // });
  //
  // it('array', () => {
  //   expect(getFiles(['./src/a.js'], getEntryFixture)).toEqual([
  //     './src/a.js',
  //   ]);
  // });
  //
  // it('string', () => {
  //   expect(getFiles('./src/a.js', getEntryFixture)).toEqual([
  //     './src/a.js',
  //   ]);
  // });
  //
  // it('add ./', () => {
  //   expect(getFiles('src/a.js', getEntryFixture)).toEqual([
  //     './src/a.js',
  //   ]);
  // });
  //
  // it('error if entry is not string', () => {
  //   expect(() => {
  //     getFiles(null, getEntryFixture);
  //   }).toThrow(/entry type should be string/);
  // });
  //
  // it('glob', () => {
  //   expect(getFiles('./src/pages/*.js', getEntryFixture)).toEqual([
  //     './src/pages/b.js',
  //     './src/pages/c.js',
  //   ]);
  // });
  //
  // it('glob 2', () => {
  //   expect(getFiles('./src/**/*.js', getEntryFixture)).toEqual([
  //     './src/a.js',
  //     './src/pages/b.js',
  //     './src/pages/c.js',
  //   ]);
  // });
  //
  // it('glob and array', () => {
  //   expect(getFiles(['./src/pages/*.js', './src/a.js'], getEntryFixture)).toEqual([
  //     './src/pages/b.js',
  //     './src/pages/c.js',
  //     './src/a.js',
  //   ]);
  // });
});
