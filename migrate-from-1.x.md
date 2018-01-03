## Migrate from 1.x

[查看中文版](./migrate-from-1.x_zh-cn.md)

Upgrading to roadhog@2 is easy, we can follow the PR of [ant-design-pro upgrade PR] (https://github.com/ant-design/ant-design-pro/pull/542).

---

For most applications, just:

* Upgrade roadhog's version to 2.x
* Rename `.roadhogrc` to `.webpackrc`
* Rename `roadhog server` to `roadhog dev`

Then, since the built-in of babel@7,

* If you are using `babel-polyfill`, use `@babel/polyfill` instead
* If you have dependency `babel-runtime`, delete it, it's built-in
* Since we can't use babel-plugin-add-module-exports together with babel@7, modify all the `require('./file')` to `require('./file').default`
* If you are using  babel-plugin-dva-hmr, upgrade to 0.4.x,

Then, since it does not support of `src/index.ejs` and it's automatic injection,

* If you are using `src/index.ejs`, move to `public/index.html`, and inject CSS and JS manually

Finally, the following configuration is no longer supported, consider alternatives or use `webpack.config.js` for configuration.

* multipage (use commons instead)
* autoprefixer (use browserslist instead)
* dllPlugin
* svgSpriteLoaderDirs
* library
* libraryTarget
* cssModulesExclude

