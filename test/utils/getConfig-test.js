import { join } from 'path';
import expect from 'expect';
import { realGetConfig as getConfig } from '../../src/utils/getConfig';

const fixtures = join(__dirname, '..', 'fixtures');
const getConfigFixture = join(fixtures, 'getConfig');

describe('getConfig', () => {
  it('error', () => {
    expect(() => {
      getConfig(join(getConfigFixture, 'error.json'));
    }).toThrow(/(Syntax error: Trailing comma in object|Invalid property descriptor)/);
  });

  it('normal', () => {
    expect(getConfig(join(getConfigFixture, 'normal.json'))).toEqual({
      a: 1,
    });
  });

  it('env', () => {
    expect(getConfig(join(getConfigFixture, 'env.json'))).toEqual({
      a: 2,
      b: 1,
    });
    expect(getConfig(join(getConfigFixture, 'env.json'), 'production')).toEqual({
      a: 1,
    });
  });

  it('env production', () => {
    expect(getConfig(join(getConfigFixture, 'env-production.json'))).toEqual({
      a: 1,
    });
    expect(getConfig(join(getConfigFixture, 'env-production.json'), 'production')).toEqual({
      a: 2,
      b: 1,
    });
  });

  it('env mergeObject', () => {
    expect(getConfig(join(getConfigFixture, 'env-mergeObject.json'))).toEqual({
      proxy: {
        '/a': 1,
        '/b': 2,
      },
    });
  });

  it('env mergeArray', () => {
    expect(getConfig(join(getConfigFixture, 'env-mergeArray.json'))).toEqual({
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
    })).toEqual({
      outputPath: './dist/a/0.1.0',
      publicPath: '/a/0.1.0/',
      c: 'foo',
    });
  });
});
