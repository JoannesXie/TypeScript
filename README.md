# TypeScript
学习TypeScript

## TS初始化

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
>2、局部安装：`npm i typescript -D`   
>Tips：局部安装是为了配合webpack进行使用

### 2、配置TSLint
>1、全局安装：`npm install tslint -g`   
>Tips：初始化`tslint -i` =>`tslint.json` 
```js
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

#### 3.3、`package.json`配置
```json
{
  "scripts": {
    "start": "cross-env NODE_ENV=development webpack-dev-server --mode=development --progress",
    "build": "cross-env NODE_ENV=production webpack --mode=production --progress"
  }
}
```

## TS基础知识

### 1、八个常见类型
#### 1.1、布尔类型(`boolean`)
>布尔类型的变量的值只能是 true 或 false  
```ts
let bool: boolean = false;
bool = true;
bool = 123; // error 不能将类型"123"分配给类型"boolean"
```

#### 1.2、数值类型(`number`)
>1、数字都是浮点数，只有一个number类型，而没有int或者float类型  
>2、TypeScript 中共支持二、八、十和十六四种进制的数值  
```ts
let num: number;
num = 123;
num = "123"; // error 不能将类型"123"分配给类型"number"
num = 0b1111011; //  二进制的123
num = 0o173; // 八进制的123
num = 0x7b; // 十六进制的123
```

#### 1.3、字符串类型(`string`) 
```ts
let str: string = "Joannes";
str = "Xie";
const first = "Joannes";
const last = "Xie";
str = `${first} ${last}`;
console.log(str) // 打印结果为:Joannes Xie
```
>1、字符串字面量类型，即把一个字符串字面量作为一种类型  
>2、当你把一个变量指定为这个字符串类型的时候，就不能再赋值为其他字符串值了  
```ts
let str: Joannes
str = "haha" // error 不能将类型“"haha"”分配给类型“"Joannes"”
``` 

#### 1.4、数组类型(`Array`) 
>1、数组单个类型定义 
```ts
let list1: number[] = [1, 2, 3]; //推荐
let list2: Array<number> = [1, 2, 3];
```
>2、数组中多个类型 `number|string`
```ts
let list3: Array<number | string> = [1, 2, "3"];
```


#### 1.5、null 和 undefined
```ts
let n: null = null; 
let u: undefined = undefined;
//undefined可能tslint报错，不能给一个值设置undefined，其实是可以的。
//可以配置tslint，将"no-unnecessary-initializer"设为false即可
```

#### 1.6、object
>1、当一个变量或者函数的参数的类型是一个对象的时
```ts
let obj: object
obj = { name: 'Lison' }
obj = 123 // error 不能将类型“123”分配给类型“object”
console.log(obj.name) // error 类型“object”上不存在属性“name”
//需要使用到 接口 
```

#### 1.7、symbol
>1、[点击跳转到Symbol](#Symbol-ES6新基础类型)  
>2、因为它的知识比较多，所以单独进行讲解。

### 2、TS补充的六个类型
#### 2.1、元组
>1、元组可以看做是数组的拓展，它表示已知元素数量和类型的数组  
>Tips：各个位置上的元素类型都要对应，元素个数也要一致
```ts
let tuple: [string, number, boolean];
tuple = ["a", 2, false];
tuple = [2, "a", false]; // error 不能将类型“number”分配给类型“string”。 不能将类型“string”分配给类型“number”。
tuple = ["a", 2]; // error Property '2' is missing in type '[string, number]' but required in type '[string, number, boolean]'
```

#### 2.2、枚举(enum)
```ts
enum Roles {
  SUPER_ADMIN,
  ADMIN,
  USER
}
```
>上面定义的枚举类型 Roles 里面有三个值，TypeScript 会为它们每个值分配编号，默认从 0 开始，依次排列
```ts
enum Roles {
  SUPER_ADMIN = 0,
  ADMIN = 1,
  USER = 2
}
```
>当我们使用的时候，就可以使用名字而不需要记数字和名称的对照关系
```ts
const superAdmin = Roles.SUPER_ADMIN;
console.log(superAdmin); // 0
console.log(Roles[1]); // 'ADMIN'
```
>单独对每个值赋值，没有赋值的值将会从上一个数后延续
```ts
enum Roles {
  SUPER_ADMIN = 1, //1
  ADMIN, //2
  USER = 7, //7
  hh, //8
}
```

#### 2.3、任意类型(any)
>可以是任意的类型
```ts
let value: any;
value = 123;
value = "abc";
value = false;
const array: any[] = [1, "a", true];
```

#### 2.4、非任意类型(void)
>void 和 any 相反，void 是表示没有任意类型，就是什么类型都不是  
>void 类型的变量只能赋值为 undefined 和 null，其他类型不能赋值给 void 类型的变量。
```ts
//这个函数没有返回任何的值，所以它的返回类型为 void
const consoleText = (text: string): void => {
  console.log(text);
};
```

#### 2.5、永不存在的值(never)
>1、never 类型指那些永不存在的值的类型    
>2、那些总会抛出异常或根本不会有返回值的函数表达式的返回值类型  
>3、当变量被永不为真的类型保护所约束时，该变量也是 never 类型    
```ts
//此函数的返回值是永不存在的，因为它一直抛出错误，用never表示它的返回值
const errorFunc = (message: string): never => {
  throw new Error(message);
};
```
>1、never类型是`任何类型`的`子类型`，所以它可以赋值给任何类型  
>2、`没有类型`是 never 的`子类型`，所以除了它自身没有任何类型可以赋值给 never 类型  
>3、any 类型也不能赋值给 never 类型

#### 2.6、未知的类型(unknown)
>当值为unknown类型的时，如果没有通过基于控制流的类型断言来缩小范围的话，是不能对它进行任何操作的

#### 2.7、交叉类型(高级类型)
>交叉类型就是取多个类型的并集，使用 `&` 符号定义  
>被&符链接的多个类型构成一个交叉类型，表示这个类型同时具备这几个连接起来的类型的特点
```ts
const merge = <T, U>(arg1: T, arg2: U): T & U => {
  let res = {} as T & U; // 这里指定返回值的类型兼备T和U两个类型变量代表的类型的特点
  res = Object.assign(arg1, arg2);
  return res;
};
const info1 = {
  name: "lison"
};
const info2 = {
  age: 18
};
const lisonInfo = merge(info1, info2);

console.log(lisonInfo.address); // error 类型“{ name: string; } & { age: number; }”上不存在属性“address”
```

#### 2.8、联合类型(高级类型)
> 只要符合联合类型中任意一种类型即可，它使用 `|` 符号定义
```ts
const getLength = (content: string | number): number => {
  if (typeof content === "string") return content.length;
  else return content.toString().length;
};
console.log(getLength("abc")); // 3
console.log(getLength(123)); // 3
```

### Symbol-ES6新基础类型