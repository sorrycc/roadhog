# roadhog

[![NPM version](https://img.shields.io/npm/v/roadhog.svg?style=flat)](https://npmjs.org/package/roadhog)
[![Build Status](https://img.shields.io/travis/sorrycc/roadhog.svg?style=flat)](https://travis-ci.org/sorrycc/roadhog)
[![NPM downloads](http://img.shields.io/npm/dm/roadhog.svg?style=flat)](https://npmjs.org/package/roadhog)
[![Dependencies](https://david-dm.org/sorrycc/roadhog/status.svg)](https://david-dm.org/sorrycc/roadhog)

[查看中文版](./README_zh-cn.md)

Roadhog is a cli tool with `dev`、`build` and `test` commands. It's based on react-dev-utils and is consistent with the experience of create-react-app. You can imagine this is a configurable version of create-react-app.

## Docs
* [1.x docs](https://github.com/sorrycc/roadhog/blob/1.x/README_en-us.md)

## Features
* 📦 out of the box React application development tools, built-in css-modules, babel, postcss, HMR, etc.
* 🐠 create-react-app experience
* 🚨 webpack configuration in JSON format
* 🔥 mock
* ✂️ test based on jest (UI testing is not supported at this time)

## Getting started
```bash
## Install globally or locally
$ npm i roadhog -g

## Check version
$ roadhog -v
2.0.0

## Local development
$ roadhog dev

## Build
$ roadhog build
$ NO_COMPRESS=1 roadhog build

## Test
$ raodhog test
```

## Mock
roadhog dev support mock, configured in  `.roadhogrc.mock.js`.

e.g.

```js
export default {
  // 支持值为 Object 和 Array
  'GET /api/users': { users: [1,2] },

  // GET POST 可省略
  '/api/users/1': { id: 1 },

  // 支持自定义函数，API 参考 express@4
  'POST /api/users/create': (req, res) => { res.end('OK'); },
};
```

## Use the public directory
Files in the public directory would be copied to the output directory (by default `./dist`) on the dev and build. So favicon, iconfont, html, html quoted pictures could be stored here.

## 配置
umi 的 webpack 部分功能是基于 af-webpack 实现的。如需配置，在项目根目录新建 .webpackrc 完成，格式为 JSON，比如：

```js
{
  "externals": { "react": "window.React" }
}
```

如果你偏爱 JS 的配置方式，或者需要通过编程的方式做一些判断或者抽象，可以用 .webpackrc.js配置文件，支持 ES6 语法，比如：

```js
export default {
  externals: { react: 'window.React' },
}
```

索引：

* [entry](#entry)
* [theme](#theme)
* [define](#define)
* [externals](#externals)
* [alias](#alias)
* [browserslist](#browserslist)
* [publicPath](#publicPath)
* [outputPath](#outputPath)
* [devtool](#devtool)
* [commons](#commons)
* [disableCSSModules](#disableCSSModules)
* [disableCSSSourceMap](#disableCSSSourceMap)
* [extraBabelPresets](#extraBabelPresets)
* [extraBabelPlugins](#extraBabelPlugins)
* [extraBabelIncludes](#extraBabelIncludes)
* [copy](#copy)
* [proxy](#proxy)
* [sass](#sass)
* [manifest](#manifest)
* [ignoreMomentLocale](#ignoreMomentLocale)
* [env](#env)

### entry

### theme
配置主题，实际上是配 less 变量。支持对象和字符串两种类型，字符串需要指向一个返回配置的文件。
比如：

```
"theme": {
  "@primary-color": "#1DA57A"
}
```

或者，

```
"theme": "./theme-config.js"
```

### define
通过 webpack 的 DefinePlugin 传递给代码，值会自动做 `JSON.stringify` 处理。
比如：

```js
"define": {
  "process.env.TEST": 1,
  "USE_COMMA": 2,
}
```

### externals
配置 webpack 的 [externals](https://webpack.js.org/configuration/externals/) 属性。
比如：

```js
// 配置 react 和 react-dom 不打入代码
"externals": {
  "react": "window.React",
  "react-dom": "window.ReactDOM"
}
```

### alias
配置 webpack 的 [resolve.alias](https://webpack.js.org/configuration/resolve/#resolve-alias) 属性。

### browserslist
配置 [browserslist](https://github.com/ai/browserslist)，同时作用于 babel-preset-env 和 autoprefixer。
比如：

```js
"browserslist": [
  "> 1%",
  "last 2 versions"
]
```

### publicPath
配置 webpack 的 [output.publicPath](https://webpack.js.org/configuration/output/#output-publicpath) 属性。

### outputPath
配置 webpack 的 [output.path](https://webpack.js.org/configuration/output/#output-path) 属性。

### devtool
配置 webpack 的 [devtool](https://webpack.js.org/configuration/devtool/) 属性。

### commons
配置 webpack 的 [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/) 插件，格式为数组，有几项配几个 CommonsChunkPlugin 。
比如：

```markup
"commons": [
  {
    async: '__common',
    children: true,
    minChunks(module, count) {
      if (pageCount <= 2) {
        return count >= pageCount;
      }
      return count >= pageCount * 0.5;
    },
  },
]
```

### disableCSSModules
禁用 [CSS Modules](https://github.com/css-modules/css-modules)。

### disableCSSSourceMap
禁用 CSS 的 SourceMap 生成。

### extraBabelPresets
定义额外的 babel preset 列表，格式为数组。

### extraBabelPlugins
定义额外的 babel plugin 列表，格式为数组。

### extraBabelIncludes
定义额外需要做 babel 转换的文件匹配列表，格式为数组。

### copy
定义需要单纯做复制的文件列表，格式为数组，项的格式参考 [copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin) 的配置。
比如：

```markup
"copy": [
  {
    "from": "",
    "to": ""
  }
]
```

### proxy
配置 webpack-dev-server 的 [proxy](https://webpack.js.org/configuration/dev-server/#devserver-proxy) 属性。
如果要代理请求到其他服务器，可以这样配：

```markup
"proxy": {
  "/api": {
    "target": "http://jsonplaceholder.typicode.com/",
    "changeOrigin": true,
    "pathRewrite": { "^/api" : "" }
  }
}
```

然后访问 `/api/users` 就能访问到 [http://jsonplaceholder.typicode.com/users](http://jsonplaceholder.typicode.com/users) 的数据。

### sass
配置 [node-sass](https://github.com/sass/node-sass#options) 的选项。注意：使用 sass 时需在项目目录安装 node-sass 和 sass-loader 依赖。

### manifest
Configure to generate manifest.json, it's option will pass to [https://www.npmjs.com/package/webpack-manifest-plugin](https://www.npmjs.com/package/webpack-manifest-plugin).

e.g.

```markup
"manifest": {
  "basePath": "/app/"
}
```

### ignoreMomentLocale
Ignore moment locale file, used to reduce the size.

### env
Set specific options for certain environment. `development` is for dev, and `production` is for build.

e.g.

```js
"extraBabelPlugins": ["transform-runtime"],
"env": {
  "development": {
    "extraBabelPlugins": ["dva-hmr"]
  }
}
```

这样，开发环境下的 extraBabelPlugins 是 `["transform-runtime", "dva-hmr"]`，而生产环境下是 `["transform-runtime"]`。

## Environment Variables
You can temporarily configure some parameters for environment variables, including:

* `PORT`, default 8000
* `HOST,` default localhost
* `HTTPS`，whether to enable https, default false

e.g. start dev server with port 3000,

```bash
# OS X, Linux
$ PORT=3000 roadhog dev

# Windows (cmd.exe)
$ set PORT=3000&&roadhog dev

# Or use cross-env for all platforms
$ cross-env PORT=3000 roadhog dev
```

## FAQ
### Why is it called roadhog ?

roadhog is a hero from overwatch, just like [dva](https://github.com/dvajs/dva).

<img src="https://zos.alipayobjects.com/rmsportal/guCnwwMItoLOTmcdbaEZ.png" width="200" height="200" />

## LICENSE
MIT
