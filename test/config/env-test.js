import { join } from 'path';
import expect from 'expect';
import getEnv from '../../src/config/env';
import getPaths from '../../src/config/paths';

const fixtures = join(__dirname, '..', 'fixtures');
const getEnvFixture = join(fixtures, 'getEnv');
const paths = getPaths(getEnvFixture);

describe('getEnv', () => {
  it('without NODE_ENV', () => {
    expect(getEnv(paths.resolveApp)).toEqual({
      'process.env': {
        NODE_ENV: '\"test\"',
        REACT_APP_A: '\"react_app_a\"',
        REACT_APP_B: '\"react_app_b\"',
      }
    });
  });

  it('with default NODE_ENV development', () => {
    expect(getEnv(paths.resolveApp, 'development')).toEqual({
      'process.env': {
        NODE_ENV: '\"development\"',
        REACT_APP_A: '\"react_app_a\"',
        REACT_APP_B: '\"react_app_b\"',
      }
    });
  });
});
