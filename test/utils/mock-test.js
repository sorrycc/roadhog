const path = require('path');
const expect = require('expect');
const mock = require('../../utils/mock');

const rcPath = path.join(__dirname, '../fixtures/mock/.roadhogrc.server.js');

describe('mock', function() {

  it('getConfig', function() {
    const ret = mock.getConfig(rcPath);
    expect(ret.config).toEqual('1');
    expect(ret.files.length).toEqual(3);
  });
});
