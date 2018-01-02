## 从 1.x 升级过来

[View English version](./migrate-from-1.x.md)

升级到 roadhog@2 并不麻烦，我们可以参考 [ant-design-pro 的升级 PR](https://github.com/ant-design/ant-design-pro/pull/542) 来操作。

---

对于大部分的应用来说，只要：

* 升级 roadhog 版本为 2.x
* 更名 .roadhogrc 为 .webpackrc
* 更名 roadhog server 为 roadhog dev

然后，由于内置了 babel@7 的，

* 如果你有用 babel-polyfill，更换为 `@babel/polifill`
* 如果有 babel-runtime 依赖，可删除，因为已内置处理
* 由于 babel@7 无法使用 babel-plugin-add-module-exports，所有的 `require('./file')` 需改为 `require('./file').default`
* 如果有用 babel-plugin-dva-hmr，请升级到 0.4.x，

然后，由于不支持 src/index.ejs 的自动注入，

* 如果之前有用 `src/index.ejs`，需移到 `public/index.html`，并手动引入 CSS 和 JS

最后，以下配置不再支持，需考虑替代方案或使用 webpack.config.js 进行配置。

* multipage (use commons instead)
* autoprefixer (use browserslist instead)
* dllPlugin (学习成本太高，并且有其他方法可以提升 dev server 启动速度)
* svgSpriteLoaderDirs
* library
* libraryTarget
* cssModulesExclude
