const { join } = require('path');
const expect = require('expect');
const getConfig  = require('../../utils/getConfig').realGetConfig;

const fixtures = join(__dirname, '..', 'fixtures');
const getConfigFixture = join(fixtures, 'getConfig');

describe.only('getConfig', () => {

  it('error', () => {
    expect(() => {
      getConfig(join(getConfigFixture, 'error.json'));
    }).toThrow(/parse error/);
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

});