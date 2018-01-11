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
* If you have dependency `babel-runtime` and configured `babel-plugin-transform-runtime`, delete it, it's built-in, otherwise it may report `this.setDynamic is not a function` error
* Since we can't use babel-plugin-add-module-exports together with babel@7, modify all the `require('./file')` to `require('./file').default`
* If you are using  babel-plugin-dva-hmr, upgrade to 0.4.x
* Since the option of babel@7 plugin does not allow Arrays, you should change the way to get multiple plug-ins when you encounter an error that `Error: .plugins [1] [1] must be an object, false, or undefined`, [#564](https://github.com/sorrycc/roadhog/issues/564)

Then, since it does not support of `src/index.ejs` and it's automatic injection,

* If you are using `src/index.ejs`, move to `public/index.html`, and inject CSS and JS manually

Then, if you have file `src/index.ejs`, need to config [html](https://github.com/sorrycc/roadhog#html),

```
"html": { "template": "./src/index.ejs" }
```

You may have to configure `` publicPath '': "/" `, because otherwise the js reference path generated in html does not start with` / `.

Finally, the following configuration is no longer supported, consider alternatives or use `webpack.config.js` for configuration.

* multipage (use commons instead)
* autoprefixer (use browserslist instead)
* dllPlugin
* svgSpriteLoaderDirs
* library
* libraryTarget
* cssModulesExclude

