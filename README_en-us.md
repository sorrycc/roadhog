# roadhog

[![NPM version](https://img.shields.io/npm/v/roadhog.svg?style=flat)](https://npmjs.org/package/roadhog)
[![Build Status](https://img.shields.io/travis/sorrycc/roadhog.svg?style=flat)](https://travis-ci.org/sorrycc/roadhog)
[![NPM downloads](http://img.shields.io/npm/dm/roadhog.svg?style=flat)](https://npmjs.org/package/roadhog)
[![Dependencies](https://david-dm.org/sorrycc/roadhog/status.svg)](https://david-dm.org/sorrycc/roadhog)

[以中文查看](./README.md)

roadhog ia a cli tool with `server`, `build` and `test` commands. It has the same experience of create-react-app, slightly different configuration, and also **provide [JSON format configuration](https://github.com/sorrycc/roadhog#Configuration)**。

---

<p align="center">
  <img src="https://zos.alipayobjects.com/rmsportal/vpkwOtXNukXpeQBNToEb.gif" width="926" height="521" />
</p>

## Why roadhog

[create-react-app](https://github.com/facebookincubator/create-react-app) can not be configured, but we have different configuration requirements. I believe more than I will have this idea.

## Getting Started

### Installation

```bash
$ npm i roadhog -g
```

### Usage

Local development.

```bash
$ roadhog server
```

Build for production.

```bash
$ roadhog build
```

Run test. (Execute all files under `./test` by default)

```bash
$ roadhog test
```

## Configuration

Some basic concepts about configuration:

* Configuration is stored in the `.roadhogrc` file (If you don't like JSON, try to use `.roadhogrc.js`, support ES6)
* `JSON` format, comments allowed
* Default value of boolean configuration item is always `false`
* Support configure with `webpack.config.js` (support ES6), but it's not recommended, since roadhog's major or minor upgrade will cause compatibility problem. View detail on [#36](https://github.com/sorrycc/roadhog/issues/36)

Default configuration:

```json
{
  "entry": "src/index.js",
  "disableCSSModules": false,
  "publicPath": "/",
  "outputPath": "./dist",
  "extraBabelPlugins": [],
  "extraPostCSSPlugins": [],
  "autoprefixer": null,
  "proxy": null,
  "externals": null,
  "multipage": false,
  "define": null,
  "env": null,
  "theme": null,
}
```

[More issues and feature requests](https://github.com/sorrycc/roadhog/issues?q=is%3Aissue+is%3Aopen+label%3Aconfig) about configuration.

### entry

Specify entry files for webpack, support [glob](https://github.com/isaacs/node-glob).

e.g.

```
// src/index.js only
"entry": "src/index.js"

// all files in src/pages/
"entry": "src/pages/*.js"
```

### disableCSSModules

CSS Modules is enabled by default.

### publicPath

Specify [publicPath](http://webpack.github.io/docs/configuration.html#output-publicpath) for webpack.

### outputPath

Specify [output path](http://webpack.github.io/docs/configuration.html#output-path), default `./dist`。

### extraBabelPlugins

Specify extra babel plugins. Babel plugins can only be added, not allowed to overwrite and delete.

### extraPostCSSPlugins

Speficy extra postcss plugins.

Notice: Since postcss's plugin is configured as function, this config should only be used in `.roadhogrc.js`.

e.g.

```
extraPostCSSPlugins: [
  pxtorem({
    rootValue: 100,
    propWhiteList: [],
  }),
],
```

### autoprefixer

Specify autoprefixer arguments, view [autoprefixer](https://github.com/postcss/autoprefixer) and [browserslist](https://github.com/ai/browserslist#queries) for details.

e.g. If you are making mobile app:

```
"autoprefixer": {
  "browsers": [
    "iOS >= 8", "Android >= 4"
  ]
}
```

### proxy

Specify proxy for webpack-dev-server, view [webpack-dev-server#proxy](https://webpack.github.io/docs/webpack-dev-server.html#proxy) for details。

e.g.

```
"proxy": {
  "/api": {
    "target": "http://jsonplaceholder.typicode.com/",
    "changeOrigin": true,
    "pathRewrite": { "^/api" : "" }
  }
}
```

Then, when accessing `/api/users`, you will get the content of http://jsonplaceholder.typicode.com/users .

### externals

Specify the [externals](http://webpack.github.io/docs/configuration.html#externals) configuration of webpack.

### multipage

Speficy if has multi pages. If true, roadhog will extract common chunks as `common.js` and `common.css`.

### define

Specify the [DefinePlugin](http://webpack.github.io/docs/list-of-plugins.html#defineplugin) configuration of webpack. The value will be transform by `JSON.stringify` automatically.

### env

Set specific options for certain environment. `development` is for server, and `production` is for build.

e.g.

```
"extraBabelPlugins": ["transform-runtime"],
"env": {
  "development": {
    "extraBabelPlugins": ["dva-hmr"]
  }
}
```

### theme

Configure theme. Support Object and String with filepath.

e.g.

```
"theme": {
  "@primary-color": "#1DA57A"
}
```

or,

```
"theme": "./node_modules/abc/theme-config.js"
```

[Example of how to customize antd](https://github.com/dvajs/dva-example-user-dashboard/commit/d6da33b3a6e18eb7f003752a4b00b5a660747c31) 。

## Environment Variables

You can temporarily configure some parameters for environment variables, including:

* `PORT`, default 8000
* `HOST`, default localhost
* `HTTPS`，use https or not，default false

e.g. start server in 3000 port:

```bash
$ PORT=3000 roadhog server
```

## Cli arguments
### roadhog server

```bash
$ roadhog server -h
Usage: roadhog server [options]

Options:
  --open  Open url in browser after started            [boolean] [default: true]
  -h      Show help                                                    [boolean]
```

### roadhog build

```bash
$ roadhog build -h
Usage: roadhog build [options]

Options:
  --debug            Build without compress           [boolean] [default: false]
  --watch, -w        Watch file changes and rebuild   [boolean] [default: false]
  --output-path, -o  Specify output path                [string] [default: null]
  --analyze          Visualize and analyze your Webpack bundle.
                                                      [boolean] [default: false]
  -h                 Show help                                         [boolean]
```

### roadhog test

```bash
$ roadhog test -h
Usage: roadhog test [options] [mocha-options]

Options:
  --coverage  Output coverage                         [boolean] [default: false]
  -h          Show help                                                [boolean]
```

## Use `public` directory
`public` directory will to copied to output directory (`./dist` by default) when run `server` or `build` command. So we can store favicon, iconfont, html or images used in html here.

## FAQ
### 为什么叫 roadhog ?

roadhog is a hero from overwatch.

<img src="https://zos.alipayobjects.com/rmsportal/guCnwwMItoLOTmcdbaEZ.png" width="200" height="200" />

## LICENSE

MIT
