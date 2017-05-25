import pxtorem from 'postcss-pxtorem';

export default {
  devtool: "",
  extraPostCSSPlugins: [
    pxtorem({
      rootValue: 100,
      propWhiteList: [],
    }),
  ],
};
