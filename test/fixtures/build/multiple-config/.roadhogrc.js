
const commonConfig = {
  devtool: '',
  externals(context, request, callback) {
    if (request.charAt(0) === '.') {
      callback(null, false);
    } else {
      callback(null, `abc.b(${require})`);
    }
  },
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
