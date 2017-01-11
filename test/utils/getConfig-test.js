import { join } from 'path';
import expect from 'expect';
import { realGetConfig as getConfig } from '../../src/utils/getConfig';
import getPaths from '../../src/config/paths';

const fixtures = join(__dirname, '..', 'fixtures');
const getConfigFixture = join(fixtures, 'getConfig');
const paths = getPaths(getConfigFixture);

describe('getConfig', () => {
  it('error', () => {
    expect(() => {
      getConfig(join(getConfigFixture, 'error.json'), null, null, paths);
    }).toThrow(/(Syntax error: Trailing comma in object|Invalid property descriptor)/);
  });

  it('normal', () => {
    expect(getConfig(join(getConfigFixture, 'normal.json'), null, null, paths)).toEqual({
      a: 1,
    });
  });

  it('env', () => {
    expect(getConfig(join(getConfigFixture, 'env.json'), null, null, paths)).toEqual({
      a: 2,
      b: 1,
    });
    expect(getConfig(join(getConfigFixture, 'env.json'), 'production', null, paths)).toEqual({
      a: 1,
    });
  });

  it('env production', () => {
    expect(getConfig(join(getConfigFixture, 'env-production.json'), null, null, paths)).toEqual({
      a: 1,
    });
    expect(getConfig(join(getConfigFixture, 'env-production.json'), 'production', null, paths)).toEqual({
      a: 2,
      b: 1,
    });
  });

  it('env mergeObject', () => {
    expect(getConfig(join(getConfigFixture, 'env-mergeObject.json'), null, null, paths)).toEqual({
      proxy: {
        '/a': 1,
        '/b': 2,
      },
    });
  });

  it('env mergeArray', () => {
    expect(getConfig(join(getConfigFixture, 'env-mergeArray.json'), null, null, paths)).toEqual({
      extraBabelPlugins: [
        'transform-runtime',
        'dva-hmr',
      ],
    });
  });

  it('npm package variables', () => {
    expect(getConfig(join(getConfigFixture, 'npm_variables.json'), null, {
      name: 'a',
      version: '0.1.0',
    }, paths)).toEqual({
      outputPath: './dist/a/0.1.0',
      publicPath: '/a/0.1.0/',
      c: 'foo',
    });
  });
});
