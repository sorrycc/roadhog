import { join } from 'path';
import expect from 'expect';
import { getConfig } from '../../src/utils/mock';

const rcPath = join(__dirname, '../fixtures/mock/.roadhogrc.mock.js');

describe('mock', () => {
  it('getConfig', () => {
    const ret = getConfig(rcPath);
    expect(ret.config).toEqual('1');
    expect(ret.files.length).toEqual(3);
  });
});
