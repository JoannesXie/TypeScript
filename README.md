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
obj = { name: 'Joannes' }
obj = 123 // error 不能将类型“123”分配给类型“object”
console.log(obj.name) // error 类型“object”上不存在属性“name”
//需要使用到 接口 
```

#### 1.7、symbol
>1、[点击跳转到Symbol](#3、Symbol-ES6新基础类型)  
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
>[跳转到`枚举详解`](#4、枚举详解)
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
  name: "Joannes"
};
const info2 = {
  age: 18
};
const JoannesInfo = merge(info1, info2);

console.log(JoannesInfo.address); // error 类型“{ name: string; } & { age: number; }”上不存在属性“address”
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

### 3、Symbol-ES6新基础类型
>1、表示独一无二的值，通过 `Symbol` 函数生成。  
>2、symbol是 ES6 新增的一种基本数据类型，它和 number、string、boolean、undefined 和 null 是同类型的，object 是引用类型。  

#### 3.1、作为属性名
>1、在 ES6 中，对象的属性名支持表达式，但是表达式`必须放到方括号`内。 
```ts
let prop = "name";
const obj = {
  [prop]: "Joannes"
};
console.log(obj.name); // 'Joannes'
```
>2、symbol 值是独一无二的，当它作为属性名时，不会和其他任何属性名重复  
>3、symbol 作为属性名时，必须使用`方括号`取值  
```ts
let name = Symbol();
let obj = {
  [name]: "Joannes"
};
console.log(obj); // { Symbol(): 'Joannes' }
console.log(obj[name]); // 'Joannes'
console.log(obj.name); // undefined
```

#### 3.2、属性名的遍历
>1、使用 Symbol 类型值作为属性名，这个属性不会被`for…in`遍历到，也不会被`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`获取到：
```ts
const name = Symbol("name");
const obj = {
  [name]: "Joannes",
  age: 18
};
for (const key in obj) {
  console.log(key);// => 'age'
}
console.log(Object.keys(obj));// ['age']
console.log(Object.getOwnPropertyNames(obj));// ['age']
console.log(JSON.stringify(obj));// '{ "age": 18 }'
```
>2、使用`Object.getOwnPropertySymbols`和`Reflect.ownKeys`方法获取对象的所有symbol类型的属性名
```ts
const name = Symbol("name");
const obj = {
  [name]: "Joannes",
  age: 18
};
const SymbolPropNames = Object.getOwnPropertySymbols(obj);
console.log(SymbolPropNames); // [ Symbol(name) ]
console.log(obj[SymbolPropNames[0]]); // 'Joannes'

console.log(Reflect.ownKeys(obj));// [ 'age', Symbol(name) ]
```

#### 3.3、Symbol.for()和 Symbol.keyFor()
>1、Symbol.for()  
>Tips：使用 `Symbol.for`方法传入字符串，会先检查有没有使用该字符串调用 Symbol.for 方法创建的 symbol 值，如果有，返回该值，如果没有，则使用该字符串新创建一个
```ts
const s1 = Symbol("Joannes");
const s2 = Symbol("Joannes");
const s3 = Symbol.for("Joannes");
const s4 = Symbol.for("Joannes");
s3 === s4; // true
s1 === s3; // false
```
>2、Symbol.keyFor()  
>Tips：该方法传入一个 symbol 值，返回该值在全局注册的键名
```ts
const s1 = Symbol("Joannes");
console.log(Symbol.keyFor(s1)) // Joannes
```

#### 3.4、TS中使用symbol
>`unique symbol`只能由Symbol()或Symbol.for()创建，或者通过指定类型来指定一个值是这种类型  
>`unique symbol`仅可用于常量的定义和用于属性名,必须用const不能用let
```ts
//基础用法
let sym: symbol = Symbol();
// unique symbol
const key1: unique symbol = Symbol();
let key2: symbol = Symbol();
const obj = {
  [key1]: "value1",
  [key2]: "value2",
};
console.log(obj[key1]);
console.log(obj[key2]); // error 类型“symbol”不能作为索引类型使用。
```

### 4、枚举详解
>使用`.`或者`[]`可以访问枚举中的值  
>定义枚举时，没有指定索引号，默认从`0`开始进行索引
```ts
// 修改起始编号
enum Color {
  Red = 2,
  Blue,
  Yellow
}
console.log(Color.Red, Color.Blue, Color.Yellow); // 2 3 4
// 指定任意字段的索引值
enum Status {
  Success = 200,
  NotFound = 404,
  Error = 500
}
console.log(Status.Success, Status.NotFound, Status.Error); // 200 404 500
// 指定部分字段，其他使用默认递增索引
enum Status {
  Ok = 200,
  Created,
  Accepted,
  BadRequest = 400,
  Unauthorized
}
console.log(Status.Created, Status.Accepted, Status.Unauthorized); // 201 202 401
```

#### 4.1、数字枚举
>1、数字枚举在定义值的时候，可以使用计算值和常量。  
>2、数字枚举在使用计算值和常量,该字段后面紧接着的字段`必须设置初始值`。  
```ts
const getValue = () => {
  return 0;
};
enum ErrorIndex {
  a = getValue(),
  b, // error 枚举成员必须具有初始化的值
  c
}
enum RightIndex {
  a = getValue(),
  b = 1,
  c
}
const Start = 1;
enum Index {
  a = Start,
  b, // error 枚举成员必须具有初始化的值
  c
}
```

#### 4.2、反向映射
>1、通过枚举的value值获取其key值  
>2、反向映射只支持数字枚举
```ts
enum Status {
  Success = 200,
  NotFound = 404,
  Error = 500
}
console.log(Status["Success"]); // 200
console.log(Status[200]); // 'Success'
console.log(Status[Status["Success"]]); // 'Success'
```

#### 4.3、字符串枚举
>字符串枚举,要求每个字段的值都`必须是字符串字面量`  
```ts
enum Message {
  Error = "Sorry, error",
  Success = "Hoho, success"
}
console.log(Message.Error); // 'Sorry, error'
```
>枚举值中其他枚举成员
```ts
enum Message {
  Error = "error message",
  ServerError = Error,
  ClientError = Error,
}
console.log(Message.Error); // 'error message'
console.log(Message.ServerError); // 'error message
```

#### 4.4、异构枚举
>异构枚举就是枚举值中成员值既有数字类型又有字符串类型。(不推荐)
```ts
enum Result {
  Faild = 0,
  Success = "Success"
}
```

#### 4.5、枚举成员类型和联合枚举类型
>1、如果`枚举值`里所有`成员的值`都是`字面量类型`的值，那么这个枚举的`每个成员`和`枚举值`本身都可以作为`类型`来使用  
>2、当我们的枚举值的所有成员的值都是下面情况，枚举值和成员就可以作为类型来用：
```ts
a、不带初始值的枚举成员，例如enum E { A }
b、值为字符串字面量，例如enum E { A = ‘a’ }
c、值为数值字面量，或者带有-符号的数值字面量，例如enum E { A = 1 }、enum E { A = -1 }
```

##### 4.5.1、枚举成员类型
>我们可以把符合条件的枚举值的成员作为类型来使用
```ts
enum Animal {
  Dog = 1,
  Cat = 2
}
interface Dog {
  type: Animal.Dog; 
  // 这里使用Animal.Dog作为类型，指定接口Dog的必须有一个type字段，且类型为Animal.Dog
}
interface Cat {
  type: Animal.Cat; // 这里同上
}
let cat1: Cat = {
  type: Animal.Dog // error [ts] 不能将类型“Animal.Dog”分配给类型“Animal.Cat”
};
let dog: Dog = {
  type: Animal.Dog
};
```

##### 4.5.2、联合枚举类型
>当我们的枚举值符合条件时，这个枚举值就可以看做是一个包含所有成员的联合类型
```ts
enum Status {
  Off,
  On
}
interface Light {
  status: Status;
}
enum Animal {
  Dog = 1,
  Cat = 2
}
const light1: Light = {
  status: Animal.Dog // error 不能将类型“Animal.Dog”分配给类型“Status”
};
const light2: Light = {
  status: Status.Off
};
const light3: Light = {
  status: Status.On
};
```

### 5、类型断言
>1、类型断言有点像是一种类型转换，它把某个值强行指定为特定类型  
>2、它有两种写法，一种是`<type>value`，一种是`value as type`  
>、tslint推荐`value as type`写法，JSX只支持`value as type`写法  
```ts
const getStrLength = (target: string | number): number => {
  if ((<string>target).length) { // 这种形式在JSX代码中不可以使用，而且也是TSLint不建议的写法
    return (target as string).length; // 这种形式是没有任何问题的写法，所以建议大家始终使用这种形式
  } else {
    return target.toString().length;
  }
}; 
```

### 6、接口(interface)
#### 6.1、接口基础写法
>把接口内当成代码块，所以使用`;`而不是`,`
```ts
interface Info {
  firstName: string; //使用的是 “ ; ” 而不是 " , "
  lastName: string;
}
const getFullName = ({ firstName, lastName }: Info) => `${firstName} ${lastName}`;
console.log(getFullName({ firstName: "xie", lastName: "joannes" }));
```

#### 6.2、可选属性(?)
>一些结构对于某些字段的要求是可选的，有这个字段就做处理，没有就忽略
```ts
interface Vegetable {
  color?: string;
  type: string;
}
const getVegetables = ({ color, type }: Vegetable) => {
  return `A ${color ? color + " " : ""}${type}`;
};
getVegetables({ color: "xie", type: "joannes" }); // A xie joannes
getVegetables({ type: "joannes" }); // A joannes
```

#### 6.3、绕开多余属性检查

##### 6.3.1、使用类型断言
```ts
interface Vegetables {
  color?: string;
  type: string;
}
const getVegetables = ({ color, type }: Vegetables) => {
  return `A ${color ? color + " " : ""}${type}`;
};
getVegetables({
  type: "tomato",
  size: 12,
  price: 1.2
} as Vegetables);
```

##### 6.3.2、添加索引签名
```ts
interface Vegetables {
  color: string;
  type: string;
  [prop: string]: any;
}
const getVegetables = ({ color, type }: Vegetables) => {
  return `A ${color ? color + " " : ""}${type}`;
};
getVegetables({
  color: "red",
  type: "tomato",
  size: 12,
  price: 1.2
});
```
##### 6.3.3、利用类型兼容性(不推荐)
```ts
interface Vegetables {
  type: string;
}
const getVegetables = ({ type }: Vegetables) => {
  return `A ${type}`;
};

const option = { type: "tomato", size: 12 };
getVegetables(option);
```

#### 6.4、只读属性
>接口也可以设置只读属性
```ts
interface Role {
  readonly 0: string;
  readonly 1: string;
}

const role: Role = {
  0: "super_admin",
  1: "admin"
};
role[1] = "super_admin"; // Cannot assign to '0' because it is a read-only property
```

#### 6.5、函数类型
>接口可以描述普通对象，还可以描述函数类型
```ts
interface AddFunc { 
  (num1: number, num2: number): number;//调用签名
}

const add: AddFunc = (n1, n2) => n1 + n2;
const join: AddFunc = (n1, n2) => `${n1} ${n2}`; // 不能将类型'string'分配给类型'number'
add("a", 2); // 类型'string'的参数不能赋给类型'number'的参数
```


#### 6.6、索引类型
>使用接口描述索引的类型和通过索引得到的值的类型  
>Tips：a、索引类型为 number时，当索引类型是字符串则会报错；  
>b、索引类型为字符串时，当索引类型是数值不会报错。
```ts
interface RoleDic {
  [id: number]: string;
}
const role1: RoleDic = {
  0: "super_admin",
  1: "admin",
};
const role2: RoleDic = {
  s: "super_admin",  // error 不能将类型"{ s: string; a: string; }"分配给类型"RoleDic"。
  a: "admin",
};
const role3: RoleDic = ["super_admin", "admin"];
```
>可以给索引设置`readonly`，从而防止索引返回值被修改。
```ts
interface RoleDic {
  readonly [id: number]: string;
}
const role: RoleDic = ["ss", "12"];
role[0] = "xie"; // 类型“RoleDic”中的索引签名仅允许读取
```

#### 6.7、接口继承(extends)
>接口可以继承，这和类一样，这提高了接口的可复用性 
```ts
interface Vegetabales {
  color: string;
}
interface Tomato extends Vegetabales {
  size: number;
}
let tomato: Tomato = {
  size: 13, // Property 'color' is missing in type '{ size: number; }'
}
```
> 继承多个接口使用`,`隔开
```ts
interface Tomato extends Vegetabales , Face {
  size: number;
}
```

#### 6.8、混合类型接口
>接口可以继承，这和类一样，这提高了接口的可复用性 
```ts
interface Counter {
  (): void; // 这里定义Counter这个结构必须包含一个函数，函数的要求是无参数，返回值为void，即无返回值
  count: number; // 而且这个结构还必须包含一个名为count、值的类型为number类型的属性
}
const getCounter = (): Counter => { // 这里定义一个函数用来返回这个计数器
  const c = () => { // 定义一个函数，逻辑和前面例子的一样
    c.count++;
  };
  c.count = 0; // 再给这个函数添加一个count属性初始值为0
  return c; // 最后返回这个函数对象
};
const counter: Counter = getCounter(); // 通过getCounter函数得到这个计数器
counter();
console.log(counter.count); // 1
counter();
console.log(counter.count); // 2
```

### 7、函数

#### 7.1、函数类型
##### 7.1.1、为函数定义类型
> 这个定义包括对`参数`和`返回值`的类型定义
```ts
function add(arg1: number, arg2: number): number {
  return x + y;
}
// 或者
const add = (arg1: number, arg2: number): number => {
  return x + y;
};
```
##### 7.1.2、完整的函数类型
> 一个函数的定义包括`函数名`、`参数`、`逻辑`和`返回值`
```ts
let add: (x: number, y: number) => number;
add = (arg1: number, arg2: number): number => arg1 + arg2;
add = (arg1: string, arg2: string): string => arg1 + arg2; // error
```
>a、定义了一个变量 `add`，给它指定了`函数类型`，也就是`(x: number, y: number) => number`，这个函数类型包含参数和返回值的类型。  
>b、给 `add` 赋了一个实际的函数，这个函数`参数类型`和`返回类型都`和函数类型中定义的`一致`，所以可以赋值。  
>c、又给它赋了一个新函数，而这个函数的参数类型和返回值类型都是 string 类型，报错了。

##### 7.1.3、使用接口定义函数类型
```ts
interface Add {
  (x: number, y: number): number;
}
let add: Add = (arg1: string, arg2: string): string => arg1 + arg2; 
// error 不能将类型“(arg1: string, arg2: string) => string”分配给类型“Add”
```
##### 7.1.4、使用类型别名
```ts
type Add = (x: number, y: number) => number;
let add: Add = (arg1: string, arg2: string): string => arg1 + arg2; 
// error 不能将类型“(arg1: string, arg2: string) => string”分配给类型“Add”
```

#### 7.2、参数
##### 7.2.1、可选参数
>1、对于可选参数使用`?`  
>2、可选参数`必须`在必选参数后面 
```ts
type Add = (x?: number, y: number) => number; // error 必选参数不能位于可选参数后。
type Add = (y: number, x?: number,) => number; 
```

##### 7.2.2、默认参数
>1、参数指定了默认参数的时候，TS会识别默认参数的类型；  
>2、在调用函数时，如果给这个带默认值的参数传了别的类型的参数则会报错。   
```ts
const add = (x: number, y = 2) => {
  return x + y;
};
add(1, "a"); // error 类型"string"的参数不能赋给类型"number"的参数

//显式的设置类型
const add = (x: number, y: number = 2) => {
  return x + y;
};
```

##### 7.2.3、剩余参数
```ts
const handleData = (arg1: number, ...args: number[]) => {
  // do something
};
handleData(1, "a"); // error 类型"string"的参数不能赋给类型"number"的参数
```

#### 7.3、函数重载
>1、TS的函数重载通过为一个函数指定多个函数类型定义，从而对函数调用的`返回值进行检查`。    
>2、重载只能用 `function 来定义`，不能使用接口、类型别名等  
```ts
function handleData(x: string): string[]; // 重载的一部分，指定当参数类型为string时，返回值为string类型的元素构成的数组
function handleData(x: number): string; // 重载的一部分，指定当参数类型为number时，返回值类型为string
function handleData(x: any): any { // 重载的内容，他是实体函数，不算做重载的部分
  if (typeof x === "string") {
    return x.split("");
  } else {
    return x
      .toString()
      .split("")
      .join("_");
  }
}
handleData("abc").join("_");
handleData(123).join("_"); // error 类型"string"上不存在属性"join"
handleData(false); // error 类型"boolean"的参数不能赋给类型"number"的参数。
```
>a、用function关键字定义两个同名的函数，但不同的是，函数没有实际的函数体逻辑，而是只定义函数名、参数及参数类型以及函数的返回值类型；第三个使用function定义的同名函数，是一个完整的实体函数，包含函数名、参数及参数类型、返回值类型和函数体；这三个定义组成了一个函数——完整的带有类型定义的函数，前两个function定义的就称为`函数重载`，而第三个function并不算重载；

>b、当调用这个函数并且传入参数的时候，会`从上而下`在函数重载里匹配和这个参数个数和类型匹配的重载。如例子中第一个调用，传入了一个字符串"abc"，它符合第一个重载，所以它的返回值应该是一个字符串组成的数组，数组是可以调用join方法的，所以这里没问题；

>c、第二个调用传入的是一个数值类型的123，从上到下匹配重载是符合第二个的，返回值应该是字符串类型。但这里拿到返回值后调用了数组方法join，这肯定会报错了，因为字符串无法调用这个方法；

>d、最后调用时传入了一个布尔类型值false，匹配不到重载，所以会报错；

### 8、泛型(Generics)
>在定义函数、接口或类的时候，`不预先指定`具体的类型，而在使用的时候再指定类型的一种特性