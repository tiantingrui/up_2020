# TypeScript教程

 

## 01. 环境和安装

环境：node

安装：

```shell
$ npm install typescript -g
```



#### 简单使用

```ts
// demo1.ts
function terry() {
    let web : string = 'hello world'
    console.log(web);
}
terry()
```

输入命令

```shell
$ node demo1.ts
# SyntaxError: Unexpected token ':'
```

解决方法

```shell
$ tsc demo1.ts
# 会生成一个 demo1.js
// demo1.js
function terry() {
    var web = 'hello world';
    console.log(web);
}
terry();
$ node demo1.js
# hello world
```

这样子是不是会太麻烦了，来看下面的优化方法

+ 全局安装 ts-node 

```shell 
$ npm i -g ts-node
```

+ 执行命令

```shell
$ ts-node demo1.ts
# hello world
```



## 02. Typescript 静态类型

 使用静态类型

```ts
// demo2.ts
let count: number = 8

interface zmn {
    uname: string,
    age: number
}

const ice: zmn = {
    uname: 'ice',
    age: 24
}

console.log(ice.uname);
```



## 03.基础静态类型和对象静态类型

#### 基础静态类型

![image-20200927230147664](/Users/terry/Library/Application Support/typora-user-images/image-20200927230147664.png)



#### 对象静态类型

+ 普通的对象类型
+ 数组 - 对象类型
+ 类（构造函数）- 对象类型
+ 函数类型

![image-20200927230313126](/Users/terry/Library/Application Support/typora-user-images/image-20200927230313126.png)

![image-20200927230651483](/Users/terry/Library/Application Support/typora-user-images/image-20200927230651483.png)



## 04.类型注解和类型推断

+ type annotation 类型注解
+ type inference 类型推断

```js
let count: number;
count = 1234

let countInterface = 123
```

![image-20200927231630722](/Users/terry/Library/Application Support/typora-user-images/image-20200927231630722.png)



## 05. 函数参数和返回类型的注解

