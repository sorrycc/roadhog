import dotenv from 'dotenv';

export default function getEnv(resolveApp, nodeEnv) {
  nodeEnv = nodeEnv || process.env.NODE_ENV || 'development';
  // 加载app目录下的.env
  dotenv.config({
    path: resolveApp('.env'),
  });

  // 如同create-react-app的 REACT_APP_* 环境变量一样
  const REACT_APP = /^REACT_APP_/i;
  const processEnv = Object
    .keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce((env, key) => {
      env[key] = JSON.stringify(process.env[key]);
      return env;
    }, {
      NODE_ENV: JSON.stringify(nodeEnv),
    });

  return {
    'process.env': processEnv,
  };
}
