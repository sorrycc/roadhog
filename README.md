# roadhog

roadhog 是一个 cli 工具，提供 server 和 build 功能，在 create-react-app 的基础上提供配置扩展、proxy 等功能。

## Why roadhog

由于 dva-cli 有不同于 create-react-app 的 webpack.config.js 配置需求，而 cra 并不提供定制功能。

## Getting Started

### 安装

```bash
$ npm i roadhog -g
```

### 使用

本地开发

```bash
$ roadhog server
```

打包发布

```bash
$ roadhog build
```

## LICENSE

MIT
