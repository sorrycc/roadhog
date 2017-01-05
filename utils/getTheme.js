const path = require('path');
const getConfig = require('./getConfig');

module.exports = function(cwd) {
  cwd = cwd || process.cwd();
  const theme = getConfig().theme;

  if (theme) {
    if (typeof theme === 'string') {
      const themeConfig = require(path.resolve(cwd, theme));
      return typeof themeConfig === 'function' ? themeConfig() : themeConfig;
    } else {
      return theme;
    }
  }

  return {};
};
