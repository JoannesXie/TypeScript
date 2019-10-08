# TypeScript
学习TypeScript

## TS初始化
***
### 1、项目初始化
#### 1.1、npm 初始化
>1、使用`npm`默认`package.json`配置  
```js
npm init -y
```
#### 1.2、安装typescript
>1、全局安装：`npm i typescript -g`   
>Tips：a、全局安装后就可以使用`tsc`命令  
>b、使用`tsc --init `初始化，产生`tsconfig.json`文件  
>c、设置`tsconfig.json`文件中`"lib"` =>`"lib": ["dom", "es6"]`
```
tsc --init
```  
>2、局部安装：`npm i typescript`   
>Tips：局部安装是为了配合webpack进行使用

### 2、配置TSLint
>1、全局安装：`npm install tslint -g`   
>Tips：初始化`tslint -i` =>`tslint.json` 
```json
//初始化
tslint -i
//tslint.json
{
  //提醒级别。error:报错;warning:警告;off:关闭
  "defaultSeverity": "error",
  "extends": [ //继承指定的预设配置规则
    "tslint:recommended"
  ],
  "jsRules": {},//配置对.js和.jsx文件的校验，配置规则和rules一样
  "rules": {}, //规则
  "rulesDirectory": [] //指定规则配置文件，这里指定相对路径
}
```

### 3、配置webpack
#### 3.1、基础安装
```js
//安装webpack
npm install webpack webpack-cli webpack-dev-server -D
//安装必要插件
npm install html-webpack-plugin clean-webpack-plugin -D
//安装必要loader
npm install ts-loader -D
//安装cross-env
npm install cross-env -D
```

#### 3.2、`webpack.config.js`配置
```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "main.[chunkhash:8].js"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  // 指定编译后是否生成source-map，这里判断如果是生产打包环境则不生产source-map
  devtool: process.env.NODE_ENV === "production" ? false : "inline-source-map",
  module: {
    // 配置以.ts/.tsx结尾的文件都用ts-loader解析
    // 这里我们用到ts-loader，所以要安装一下
    // npm install ts-loader -D
    rules: [{
      test: /\.tsx?$/,
      use: "ts-loader",
      exclude: /node_modules/
    }]
  },
  // 指定编译后是否生成source-map，这里判断如果是生产打包环境则不生产source-map
  devtool: process.env.NODE_ENV === "production" ? false : "inline-source-map",
  // 这里使用webpack-dev-server，进行本地开发调试
  devServer: {
    contentBase: "./dist",
    compress: false,
    stats: "errors-only",
    port: 8888,
    open: true
  },
  // 这里用到两个插件，所以首先我们要记着安装
  // npm install html-webpack-plugin clean-webpack-plugin -D
  plugins: [
    // 这里在编译之前先删除dist文件夹
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*"，'./dist']
    }),
    // 这里我们指定编译需要用模板，模板文件是./src/template/index.html，所以接下来我们要创建一个index.html文件
    new HtmlWebpackPlugin({
      template: "./src/template/index.html"
    })
  ]
};
```

#### 3.2、`package.json`配置
```json
{
  "scripts": {
    "start": "cross-env NODE_ENV=development webpack-dev-server --mode=development --progress",
    "build": "cross-env NODE_ENV=production webpack --mode=production --progress"
  }
}
```
