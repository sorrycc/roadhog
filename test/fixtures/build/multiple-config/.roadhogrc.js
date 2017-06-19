
const commonConfig = {
  devtool: '',
};

export default [
  {
    ...commonConfig,
    entry: './src/welcome.js',
  },
  {
    ...commonConfig,
    entry: './src/project.js',
  },
];
