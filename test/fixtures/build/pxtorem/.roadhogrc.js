import pxtorem from 'postcss-pxtorem';

export default {
  extraPostCSSPlugins: [
    pxtorem({
      rootValue: 100,
      propWhiteList: [],
    }),
  ],
};
