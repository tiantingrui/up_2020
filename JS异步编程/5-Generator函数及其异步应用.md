# Generator函数及其异步异步应用



### 目标：

+ **Generotor函数**
+ **Thunk函数**



### **Generotor函数**

首先呢我们先来看两个概念

#### **迭代器**

+ 有next方法，执行返回结果对象
+ 结果对象
  + value
  + done

```js
function createIterator(items) {
    var i = 0;
    return {
        next: function() {
            var done = i >= items.length;
            var value = !done ? items[i++] : undefined
            return {
                done,
                value
            }
        }
    }
}

var iterator = createIterator([1, 2, 3])

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

//*   { done: false, value: 1 }
//*  { done: false, value: 2 }
//*  { done: false, value: 3 }
//*  { done: true, value: undefined }
```

其中ES6还定义了可迭代协议和迭代器协议

> 可迭代协议&迭代器协议：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#%E5%8F%AF%E8%BF%AD%E4%BB%A3%E5%8D%8F%E8%AE%AE

**可迭代协议**

+ [Symbol。iterator]属性
+ 内置可迭代对象
  + String Array Set Map等

**迭代器协议**

+ next方法
  + done
  + value



#### **生成器**

**Generator函数**（生成器）

+ ES6异步编程解决方案
+ 声明：通过function*声明
+ 返回值：符合可迭代协议和迭代器协议的生成器对象
+ **特点**：在执行是能暂停，又能从暂停处继续执行

执行Generator函数生成一个生成器对象

**生成器对象的原型上有三个方法**

+ next(param)
+ return(param)
+ throw(param)

**yield**

+ 只能出现在Generator函数
+ 用来暂停和恢复生成器函数
+ **next执行**
  + 遇yield暂停，将紧跟yield表达式的值作为返回的对象的value
  + 没有yield，一直执行到return，将return的值作为返回的对象的value
  + 没有return，将undefined作为返回的对象的value

+ **next参数**
  + next方法可以带一个参数，该参数会被当作上一个yield表达式的返回值

**generatora函数运行流程如下：**

```js
//! 生成器 Generator函数
function* createGenerator() {
    let first = yield 1;
    let second = yield first + 2;
    yield second + 3
}
let gen = createGenerator();

let g1 = gen.next()  //* { value: 1, done: false }
let g2 = gen.next(4) //* { value: 6, done: false }
let g3 = gen.next(5) //* { value: 8, done: false }
let g4 = gen.next() //* { value: undefined, done: true }
```

**yield* 生成器函数/可迭代对象**

+ 委托给其他可迭代对象
+ **作用：** 复用生成器（多个生成器同时使用）

举个栗子：

```js
function* generator1() {
    yield 1;
    yield 2;
}

function* generator2() {
    yield 100;
    yield* generator1();
    yield 200;
}

let g = generator2()
g.next() //? { value: 100, done: false }
g.next() //? { value: 1, done: false }
g.next() //? { value: 2, done: false }
g.next() //? { value: 200, done: false }
g.next() //? { value: undefined, done: true }
```

**return(param)**

+ 给定param值终结遍历器，param可缺省。

```js
//! return(param)
function* createIterator() {
    yield 1;
    yield 2;
    yield 3;
}
let iterator = createIterator();

iterator.next(); // { value: 1, done: false }
iterator.return();// { value: undefined, done: true }
iterator.next();// { value: undefined, done: true }
```

**throw(param)**

+ 让生成器对象内部抛出错误，走到try,catch语句中

```js
//! throw(param)
function* createIterator() {
    let first = yield 1;
    let second;
    try{
        second = yield first + 2;
    } catch (e) {
        second = 6;
    }
    yield second + 3
}
let iterator = createIterator();

console.log(iterator.next());   // { value: 1, done: false }
console.log(iterator.next(10));  // { value: 12, done: false }
console.log(iterator.throw(new Error('error'))); // { value: 9, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```



#### Generator函数的实现原理

首先得先了解一个概念~

**协程**

> 介绍协程：https://cnodejs.org/topic/58ddd7a303d476b42d34c911

+ 一个线程存在多个协程，但同时只能执行一个
+ Generator函数是协程在ES6的实现
+ yield挂起x协程（交给其他协程），next唤醒x协程

#### **Generator函数应用**

> 耦合程度还是挺高的



### Thunk函数

+ **求值策略**	传值调用，传名调用sum(x+1, x+2)
+ thunk函数是传名调用的实现方式之一
+ 可以实现自动执行Generator函数

##### 举个栗子：

```js
//? Thunk函数

const fs = require('fs');
const Thunk = function(fn) {
    return function(...args) {
        return function(callback) {
            return fn.call(this, ...args, callback)
        }
    }
}

const readFileThunk = Thunk(fs.readFile);

function run(fn) {
    var gen = fn();
    function next(err, data) {
        var result =gen.next(data);
        if (result.done) return;
        result.value(next);
    }
    next()
}

const g = function*() {
    const s1 = yield readFileThunk('./g1.json')
    console.log(s1.toString());
    const s2 = yield readFileThunk('./g2.json')
    console.log(s2.toString());
    const s3 = yield readFileThunk('./g3.json')
    console.log(s3.toString());
}

run(g);
```

#### co模块

> co模块是generator函数的自动执行器，功能类似与Thunk函数作用
>
> co源码：https://github.com/tj/co



#### 最后思考：

+ 浏览器采用多进程架构有什么优势和劣势
+ requestAnimationFrame实现动画比定时器有哪些优势
+ 整理定时器的思维导图







