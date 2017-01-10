import { resolve } from 'path';
import getConfig from './getConfig';

export default function getTheme(cwd) {
  cwd = cwd || process.cwd();
  const theme = getConfig().theme;

  if (theme) {
    if (typeof theme === 'string') {
      const themeConfig = require(resolve(cwd, theme));  // eslint-disable-line
      return typeof themeConfig === 'function' ? themeConfig() : themeConfig;
    } else {
      return theme;
    }
  }

  return {};
}
