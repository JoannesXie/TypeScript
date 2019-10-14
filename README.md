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
>1、[点击跳转到Symbol](#3symbol-es6新基础类型)  
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
>[跳转到`枚举详解`](#4枚举详解)
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

#### 8.1、基础用法
>1、定义函数之前，使用`<>`符号定义了一个`泛型变量 T`  
>2、在函数中`任何`需要指定类型的地方使用 T 都代表这一种类型 
```ts
//定义
const getArray = <T>(value: T, times: number = 5): T[] => {
  return new Array(times).fill(value);
};
//在调用 getArray时，在方法名后传入类型
getArray<number[]>([1, 2], 3).forEach(item => {
  console.log(item.length);
});
```

#### 8.2、泛型变量
>1、泛型变量调用时，不是`所有类型`都能做的操作不能做，不是所有类型都能调用的方法不能调用   
```ts
//多泛型变量 <T, U>
const getArray = <T, U>(param1: T, param2: U, times: number): [T, U][] => {
  return new Array(times).fill([param1, param2]);
};
```

#### 8.3、泛型函数类型  
```ts
// 1:简单定义
const getArray: <T>(arg: T, times: number) => T[] = (arg, times) => {
  return new Array(times).fill(arg);
};
// 2:使用类型别名
type GetArray = <T>(arg: T, times: number) => T[];
const getArray2: GetArray = <T>(arg: T, times: number): T[] => {
  return new Array(times).fill(arg);
};
// 3:使用接口
interface GetArray {
  <T>(arg: T, times: number): T[];
}
const getArray: GetArray = <T>(arg: T, times: number): T[] => {
  return new Array(times).fill(arg);
};
```

#### 8.4、泛型约束 
>泛型约束就是使用`一个类型`和`extends`对泛型进行约束
```ts
interface ValueWithLength {
  length: number;
}
const getLength = <T extends ValueWithLength>(param: T): number => {
  return param.length;
};
getLength("abc"); // 3
getLength([1, 2, 3]); // 3
getLength({ length: 3 }); // 3
getLength(123); // error 类型“123”的参数不能赋给类型“ValueWithLength”的参数
```

#### 8.5、在泛型约束中使用类型参数 
>用索引类型`keyof`结合泛型,实现约束使用类型参数
```ts
//让K来继承索引类型keyof T
const getProp = <T, K extends keyof T>(object: T, propName: K) => {
  return object[propName];
};
const obj = { a: "aa", b: "bb" };
getProp(obj, "c"); // 类型“"c"”的参数不能赋给类型“"a" | "b"”的参数
```

### 9、TS中的类(class)
>[**阮一峰：《`ECMAScript 6 入门`》class详解**](http://es6.ruanyifeng.com/#docs/class)  
>[**掘金：class基本概念**](https://juejin.im/post/5c02b106f265da61764aa0c1#heading-93)  

#### 9.1、类的基础写法
```ts
class Point {
  x: number,
  y: number,
  constructor(x: number, y: number){
    this.x = x;
    this.y = y;
  }
  getPoint(){
    return `(${this.x}, ${this.y})`;
  }
}
const point = new Point(1, 2);
```

#### 9.2、类的修饰符
##### 9.2.1、public
>公共，用来指定在创建实例后可以通过`实例访问`的，也就是类定义的外部可以访问的属性和方法
```ts
class Point {
  public x: number;
  public y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  public getPosition() {
    return `(${this.x}, ${this.y})`;
  }
}
const point = new Point(1, 2);
console.log(point.x); // 1
```

##### 9.2.2、private
>`private`修饰符表示私有的，它修饰的属性在类的定义外面是没法访问的
```ts
class Parent {
  private age: number;
  constructor(age: number) {
    this.age = age;
  }
}
const p = new Parent(18);
console.log(p); // { age: 18 }
console.log(p.age); // error 属性“age”为私有属性，只能在类“Parent”中访问
console.log(Parent.age); // error 类型“typeof ParentA”上不存在属性“age”
class Child extends Parent {
  constructor(age: number) {
    super(age);
    console.log(super.age); // 通过 "super" 关键字只能访问基类的公共方法和受保护方法
  }
}
```

##### 9.2.3、protected
>1、`protected`受保护修饰符，和private有些相似，但protected修饰的成员在继承该类的子类中可以访问
```ts
class Parent {
  protected age: number;
  constructor(age: number) {
    this.age = age;
  }
  protected getAge() {
    return this.age;
  }
}
const p = new Parent(18);
console.log(p.age); // error 属性“age”为私有属性，只能在类“ParentA”中访问
console.log(Parent.age); // error 类型“typeof ParentA”上不存在属性“age”
class Child extends Parent {
  constructor(age: number) {
    super(age);
    console.log(super.age); // undefined
    console.log(super.getAge());
  }
}
new Child(18)
```
>2、修饰 constructor 构造函数，加了protected修饰符之后，这个类就`不能再用来创建实例`，只能被子类`继承`
```ts
class Parent {
  protected constructor() {
    //do something
  }
}
const p = new Parent(); // error 类“Parent”的构造函数是受保护的，仅可在类声明中访问
class Child extends Parent {
  constructor() {
    super();
  }
}
const c = new Child();
```

#### 9.3、readonly
>`只读`修饰符
```ts
class UserInfo {
  readonly name: string;
  constructor(name: string) {
    this.name = name;
  }
}
const user = new UserInfo("Lison");
user.name = "haha"; // error Cannot assign to 'name' because it is a read-only property
```

#### 9.4、参数属性
>在 constructor 构造函数的参数前面加上访问`限定符`(public、private、protected 或readonly)
```ts
class A {
  constructor(name: string) {}
}
const a = new A("aaa");
console.log(a.name); // error 类型“A”上不存在属性“name”
class B {
  constructor(public name: string) {}
}
const b = new B("bbb");
console.log(b.name); // "bbb"
```

#### 9.5、静态属性(static)
>1、指定属性或方法是静态的，实例将不会添加这个静态属性，也不会继承这个静态方法  
>2、使用修饰符和 static 关键字来指定一个属性或方法
```ts
class Parent {
  public static age: number = 18;
  public static getAge() {
    return Parent.age;
  }
  constructor() {
    //
  }
}
const p = new Parent();
console.log(p.age); // error Property 'age' is a static member of type 'Parent'
console.log(Parent.age); // 18
```

#### 9.6、可选类属性
>使用 `?`标识
```ts
class Info {
  name: string;
  age?: number;
  constructor(name: string, age?: number, public sex?: string) {
    this.name = name;
    this.age = age;
  }
}
const info1 = new Info("lison");
const info2 = new Info("lison", 18);
const info3 = new Info("lison", 18, "man");
```

#### 9.7、存取器
>1、在设置属性值的时候调用的函数 `set fn(){...}`   
>2、在访问属性值的时候调用的函数 `get fn(){...}`  
```ts
class UserInfo {
  private _fullName: string;
  constructor() {}
  get fullName() {
    return this._fullName;
  }
  set fullName(value) {
    console.log(`setter: ${value}`);
    this._fullName = value;
  }
}
const user = new UserInfo();
user.fullName = "Lison Li"; // "setter: Lison Li"
console.log(user.fullName); // "Lison Li"
```

#### 9.8、抽象类(`abstract`)
>1、抽象类一般用来被其他类继承，而不`直接用它创建实例` 
```ts
abstract class People {
  constructor(public name: string) {}
  abstract printName(): void;
}
class Man extends People {
  constructor(name: string) {
    super(name);
    this.name = name;
  }
  printName() {
    console.log(this.name);
  }
}
const m = new Man(); // error 应有 1 个参数，但获得 0 个
const man = new Man("lison");
man.printName(); // 'lison'
const p = new People("lison"); // error 无法创建抽象类的实例
```   
>2、标记类中定义的属性和存取器,抽象方法和抽象存取器都不能包含实际的代码块
```ts
abstract class People {
  abstract _name: string;
  abstract get insideName(): string;
  abstract set insideName(value: string);
}
class Pp extends People {
  _name: string;
  insideName: string;
}
```  
>3、抽象类里定义的抽象方法，在子类中是不会继承的，所以在子类中必须实现该方法的定义  
```ts
abstract class People {
  constructor(public name: string) {}
  abstract printName(): void;
}
class Man extends People {
  // error 非抽象类“Man”不会实现继承自“People”类的抽象成员"printName"
  constructor(name: string) {
    super(name);
    this.name = name;
  }
}
const m = new Man("lison");
m.printName(); // error m.printName is not a function
```

#### 9.9、类类型接口
>1、`implements`指定一个`类要继承的接口`，如果是接口和接口、类和类直接的继承，使用extends
```ts
interface FoodInterface {
  type: string;
}
class FoodClass implements FoodInterface {
  // error Property 'type' is missing in type 'FoodClass' but required in type 'FoodInterface'
  static type: string;
  constructor() {}
}
```
>`接口检测的是使用该接口定义的类创建的实例`，所以上面例子中虽然定义了静态属性 type，但静态属性不会添加到实例上
```ts
//可以这样写
interface FoodInterface {
  type: string;
}
class FoodClass implements FoodInterface {
  constructor(public type: string) {}
}
```

#### 9.10、接口继承类
>1、接口可以继承一个类，当接口继承了该类后，会继承类的成员，但是不包括其实现，也就是只继承成员以及成员类型  
>2、接口还会继承类的`private`和`protected`修饰的成员，当接口继承的这个类中包含这两个修饰符修饰的成员时，这个接口只可被这个类或他的子类实现
```ts
class A {
  protected name: string;
}
interface I extends A {}
class B implements I {} // error Property 'name' is missing in type 'B' but required in type 'I'
class C implements I {
  // error 属性“name”受保护，但类型“C”并不是从“A”派生的类
  name: string;
}
class D extends A implements I {
  getName() {
    return this.name;
  }
}
```
#### 9.11、在泛型中使用类类型
```ts
const create = <T>(c: { new (): T }): T => {
  return new c();
};
class Info {
  age: number;
}
create(Info).age;
create(Info).name; // error 类型“Info”上不存在属性“name”
```
>1、创建了一个一个 create 函数，传入的参数是一个类，返回的是一个类创建的实例  
>2、参数 c 的类型定义中，new()代表调用类的构造函数，他的类型也就是类创建实例后的实例的类型  
>3、return new c()这里使用传进来的类 c 创建一个实例并返回，返回的实例类型也就是函数的返回值类型 

## TS进阶部分

### 1、类型推论
> 在一些定义中如果你没有明确指定类型，编译器会自动推断出适合的类型
#### 1.1、多类型联合
> 定义一个数组或元组这种包含多个不同类型元素的值的时，TypeScript 会将多个类型合并起来，组成一个联合类型
```ts
let arr = [1, "a"];
arr = ["b", 2, false]; // error 不能将类型“false”分配给类型“string | number”

let value = Math.random() * 10 > 5 ? 'abc' : 123
value = false // error 不能将类型“false”分配给类型“string | number”
```

#### 1.2、上下文类型
> 它是根据左侧的类型推断右侧的一些类型
```ts
window.onmousedown = function(mouseEvent) {
  console.log(mouseEvent.a); // error 类型“MouseEvent”上不存在属性“a”
};
//表达式左侧是 window.onmousedown，因此 TypeScript 会推断赋值表达式右侧函数的参数是事件对象
```

### 2、类型兼容
#### 2.1、函数兼容性
##### 2.1.1、函数参数个数
>如果对函数 y 进行赋值，那么要求 x 中的每个参数都应在 y 中有对应，也就是 x 的参数个数小于等于 y 的参数个数
```ts
let x = (a: number) => 0;
let y = (b: number, c: string) => 0;
y = x; // 没问题
x = y; // error Type '(b: number, s: string) => number' is not assignable to type '(a: number) => number'
```

##### 2.1.2、函数参数类型
>除了参数个数，参数的类型需要对应
```ts
let x = (a: number) => 0;
let y = (b: string) => 0;
let z = (c: string) => false;
x = y; // error 不能将类型“(b: string) => number”分配给类型“(a: number) => number”。
x = z; // error 不能将类型“(c: string) => boolean”分配给类型“(a: number) => number”。
```

##### 2.1.3、剩余参数和可选参数
>当要被赋值的函数参数中包含剩余参数（…args）时，赋值的函数可以用任意个数参数代替
```ts
//剩余参数
const getNum = ( // 这里定义一个getNum函数，他有两个参数
  arr: number[], // 第一个参数是一个数组
  callback: (...args: number[]) => number // 第二个参数是一个函数，这个函数的类型要求可以传入任意多个参数，但是类型必须是数值类型，返回值必须是数值类型
): number => {
  return callback(...arr); // 这个getNum函数直接返回调用传入的第二个参数这个函数，以第一个参数这个数组作为参数的函数返回值
};
getNum(
  [1, 2],
  (...args: number[]): number => args.length // 这里传入一个函数，逻辑是返回参数的个数
);
//可选参数
const getNum = (
  arr: number[],
  callback: (arg1: number, arg2?: number) => number // 这里指定第二个参数callback是一个函数，函数的第二个参数为可选参数
): number => {
  return callback(...arr); // error 应有 1-2 个参数，但获得的数量大于等于 0
  //return callback(arr[0], …arr) 这样就没问题了
};
```

##### 2.1.4、函数参数双向协议
>函数参数双向协变即参数类型无需绝对相同  
>要允许双向协变兼容，需要配置tsconfig.json文件的"strictFunctionTypes"选项为false，默认为false  
```ts
let funcA = function(arg: number | string): void {};
let funcB = function(arg: number): void {};
// funcA = funcB 和 funcB = funcA都可以
```

##### 2.1.5、函数返回值类型
```ts
let x = (a: number): string | number => 0;
let y = (b: number) => "a";
let z = (c: number) => false;
x = y;
x = z; // 不能将类型“(c: number) => boolean”分配给类型“(a: number) => string | number”
```

##### 2.1.6、函数重载
>带有重载的函数，要求被赋值的函数的每个重载都能在用来赋值的函数上找到对应的签名
```ts
function merge(arg1: number, arg2: number): number; // 这是merge函数重载的一部分
function merge(arg1: string, arg2: string): string; // 这也是merge函数重载的一部分
function merge(arg1: any, arg2: any) { // 这是merge函数实体
  return arg1 + arg2;
}
function sum(arg1: number, arg2: number): number; // 这是sum函数重载的一部分
function sum(arg1: any, arg2: any): any { // 这是sum函数实体
  return arg1 + arg2;
}
let func = merge;
func = sum; // error 不能将类型“(arg1: number, arg2: number) => number”分配给类型“{ (arg1: number, arg2: number): number; (arg1: string, arg2: string): string; }”
```

#### 2.2、枚举
>数字枚举成员类型与数字类型互相兼容
```ts
enum Status {
  On,
  Off
}
let s = Status.On;
s = 1;
s = 3;
//虽然Status.On的值是0，但是这里数字枚举成员类型和数值类型互相兼容，所以这里给s赋值为3也没问题
```
>不同枚举值之间是不兼容
```ts
enum Status {
  On,
  Off
}
enum Color {
  White,
  Black
}
let s = Status.On;
s = Color.White; // error Type 'Color.White' is not assignable to type 'Status'
```
>字符串枚举成员类型和字符串类型是不兼容的
```ts
enum Status {
  On = 'on',
  Off = 'off'
}
let s = Status.On
s = 'Lison' // error 不能将类型“"Lison"”分配给类型“Status”
```

#### 2.3、类
>比较两个类类型的值的兼容性时，`只比较实例的成员`，类的`静态成员`和`构造函数`不进行比较
```ts
class Animal {
  static age: number;
  constructor(public name: string) {}
}
class People {
  static age: string;
  constructor(public name: string) {}
}
class Food {
  constructor(public name: number) {}
}
let a: Animal;
let p: People;
let f: Food;
a = p; // 只比较实例的成员"name"，所以成功
a = f; // error Type 'Food' is not assignable to type 'Animal'
```
>类的私有成员和受保护成员  
>当检查类的实例兼容性时，如果目标（要被赋值的那个值）类型包含一个私有成员，那么源（用来赋值的值）类型必须包含来自同一个类的这个私有成员，这就允许子类赋值给父类
```ts
class Parent {
  private age: number;
  constructor() {}
}
class Children extends Parent {
  constructor() {
    super();
  }
}
class Other {
  private age: number;
  constructor() {}
}

const children: Parent = new Children();
const other: Parent = new Other(); // 不能将类型“Other”分配给类型“Parent”。类型具有私有属性“age”的单独声明
```

#### 2.4、泛型
```ts
interface Data<T> {}
let data1: Data<number>;
let data2: Data<string>;

data1 = data2;
//接口里没有用到参数 T，所以传入 string 类型还是传入 number 类型并没有影响
```
```ts
interface Data<T> {
  data: T;
}
let data1: Data<number>;
let data2: Data<string>;

data1 = data2; // error 不能将类型“Data<string>”分配给类型“Data<number>”。不能将类型“string”分配给类型“number”
```

### 3、类型保护
```ts
const valueList = [123, "abc"];
const getRandomValue = () => {
  const number = Math.random() * 10; // 这里取一个[0, 10)范围内的随机值
  if (number < 5) return valueList[0]; // 如果随机数小于5则返回valueList里的第一个值，也就是123
  else return valueList[1]; // 否则返回"abc"
};
const item = getRandomValue();
if (item.length) {
  // error 类型“number”上不存在属性“length”
  console.log(item.length); // error 类型“number”上不存在属性“length”
} else {
  console.log(item.toFixed()); // error 类型“string”上不存在属性“toFixed”
}
```
#### 3.1、自定义类型保护
```ts
const valueList = [123, 'abc'];
const getRandomValue = () => {
  const value = Math.random() * 10; // 这里取一个[0, 10)范围内的随机值
  if (value < 5) { return valueList[0]; } else { return valueList[1]; } // 否则返回"abc"
};
function isString(value: number | string): value is string {
  return typeof value === 'string';
}
const item = getRandomValue();
if (isString(item)) {
  console.log(item.length); // 此时item是string类型
} else {
  console.log(item.toFixed()); // 此时item是number类型
}
```

#### 3.2、typeof 类型保护
```ts
const valueList = [123, 'abc'];
const getRandomValue = () => {
  const value = Math.random() * 10; // 这里取一个[0, 10)范围内的随机值
  if (value < 5) { return valueList[0]; } else { return valueList[1]; } // 否则返回"abc"
};
const item = getRandomValue();
if (typeof item === "string") {
  console.log(item.length);
} else {
  console.log(item.toFixed());
}
```
在 TS 中，对 typeof 的处理还有些特殊要求：
>1、只能使用`=`和`!`两种形式来比较  
>2、type 只能是`number`、`string`、`boolean`和`symbol`四种类型

#### 3.2、instanceof 类型保护
>判断一个实例是不是某个构造函数创建的，或者是不是使用 ES6 语法的某个类创建的
```ts
class CreateByClass1 {
  public age = 18;
  constructor() {}
}
class CreateByClass2 {
  public name = "lison";
  constructor() {}
}
function getRandomItem() {
  return Math.random() < 0.5 ? new CreateByClass1() : new CreateByClass2(); // 如果随机数小于0.5就返回CreateByClass1的实例，否则返回CreateByClass2的实例
}
const item = getRandomItem();
if (item instanceof CreateByClass1) { // 这里判断item是否是CreateByClass1的实例
  console.log(item.age);
} else {
  console.log(item.name);
}
```
### 4、显式赋值断言
#### 4.1、严格模式下`null`和`undefined`赋值给其它类型值
>1、在 tsconfig.json 中将 strictNullChecks 设为 true 后，就不能再将 undefined 和 null 赋值给除它们自身和void 之外的任意类型值了  
>2、当需要给一个其它类型的值设置初始值为空，然后再进行赋值，这时使用联合类型来实现 null 或 undefined 赋值给其它类型  
```ts
let str = "lison";
str = null; // error 不能将类型“null”分配给类型“string”
let strNull: string | null = "lison"; // 这里你可以简单理解为，string | null即表示既可以是string类型也可以是null类型
strNull = null; // right
strNull = undefined; // error 不能将类型“undefined”分配给类型“string | null”
```

#### 4.2、可选参数和可选属性
>如果开启了 strictNullChecks，可选参数会被自动加上`|undefined`
```ts
const sum = (x: number, y?: number) => {
  return x + (y || 0);
};
sum(1, 2); // 3
sum(1); // 1
sum(1, undefined); // 1
sum(1, null); // error Argument of type 'null' is not assignable to parameter of type 'number | undefined'
```
#### 4.3、显示赋值断言
```ts
function getSplicedStr(num: number | null): string {
  function getRes(prefix: string) { // 这里在函数getSplicedStr里定义一个函数getRes，我们最后调用getSplicedStr返回的值实际是getRes运行后的返回值
    return prefix + num.toFixed().toString(); // 这里使用参数num，num的类型为number或null，在运行前编译器是无法知道在运行时num参数的实际类型的，所以这里会报错，因为num参数可能为null
  }
  num = num || 0.1; // 但是这里进行了赋值，如果num为null则会将0.1赋给num，所以实际调用getRes的时候，getRes里的num拿到的始终不为null
  return getRes("lison");
}
//因为有嵌套函数，而编译器无法去除嵌套函数的 null（除非是立即调用的函数表达式），所以我们需要使用显式赋值断言，写法就是在不为 null 的值后面加个!
function getSplicedStr(num: number | null): string {
  function getLength(prefix: string) {
    return prefix + num!.toFixed().toString();
  }
  num = num || 0.1;
  return getLength("lison");
}
```