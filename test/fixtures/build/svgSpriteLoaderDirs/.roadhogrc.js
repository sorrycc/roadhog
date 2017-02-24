import path from 'path';

const svgSpriteDirs = [
  require.resolve('a').replace('index.js', ''), // 依赖包 a 内置svg
  path.resolve(__dirname, 'src/svg/'),  // 业务代码本地私有 svg 存放目录
];

export default {
  svgSpriteLoaderDirs: svgSpriteDirs,
};
