## 从 1.x 升级过来

[View English version](./migrate-from-1.x.md)

升级到 roadhog@2 并不麻烦，我们可以参考 [ant-design-pro 的升级 PR](https://github.com/ant-design/ant-design-pro/pull/542) 来操作。

---

对于大部分的应用来说，只要：

* 升级 roadhog 版本为 2.x
* 更名 .roadhogrc 为 .webpackrc
* 更名 roadhog server 为 roadhog dev

然后，由于内置了 `babel@7`，

* 如果你有用 babel-polyfill，更换为 `@babel/polyfill`
* 如果有 babel-runtime 依赖和配置了 babel-plugin-transform-runtime 插件，需删除，因为已内置处理，否则可能会报 `this.setDynamic is not a function` 的错误
* 由于 babel@7 无法使用 babel-plugin-add-module-exports，所有的 `require('./file')` 需改为 `require('./file').default`
* 如果有用 babel-plugin-dva-hmr，请升级到 0.4.x，
* 由于 babel@7 plugin 的 option 不允许数组，所以遇到 `Error: .plugins[1][1] must be an object, false, or undefined` 的错误时需要修改为引多次插件的方式，[#564](https://github.com/sorrycc/roadhog/issues/564)

再然后，如果有 `src/index.ejs`，需要额外配置 [html](https://github.com/sorrycc/roadhog#html) 属性，

```
"html": { "template": "./src/index.ejs" }
```

你可能还得配置 `"publicPath": "/"`，因为不然 html 里生成出来的 js 引用路径不会以 `/` 开头。

最后，以下配置不再支持，需考虑替代方案或使用 webpack.config.js 进行配置。

* multipage (use commons instead)
* autoprefixer (use browserslist instead)
* dllPlugin (学习成本太高，并且有其他方法可以提升 dev server 启动速度)
* svgSpriteLoaderDirs
* library
* libraryTarget
* cssModulesExclude
