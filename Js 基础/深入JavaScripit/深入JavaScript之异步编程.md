# 深入JavaScript 之异步编程

**这一章节主要从以下几个部分讲起**

1. 理解异步
2. EventLoop
3. 异步编程方法-发布订阅
4. 深入理解promise
5. Generator函数
6. 深入理解async/await



## 1. 理解异步

#### 同步与异步

首先我们得清楚的知道，什么是同步，什么是异步？

通俗的来讲，**同步**指的是 **调用之后得到的结果，才可以去做别的任务**

而**异步**指的是 **调用之后先不管结果，继续再干别的任务**



在深一步了解异步相关内容之前我们先来了解两个重要的概念。

+ 进程

> 进程是程序运行的实例，同一个程序可以产生多个进程，一个进程有可以包含一个或者多个线程

+ 线程

> 线程是操作系统能够运算调度的最小单位，一次只能执行一个任务，有自己的调用栈，寄存器环境，同一进程的线程共享进程资源。



#### JavaScript单线程

那么，问题就又来了，我们知道JS是单线程的，那么**单线程的JS又是如何实现一步的呢？**

答案呢，其实就是**单线程的JS是通过浏览器内核多线程实现异步**



我们来深入的了解一下浏览器相关工作原理吧。

以开源的Chromium为例

**浏览器的进程**

+ 浏览器进程
+ 渲染进程（重点展开介绍）
+ GPU进程
+ 网络进程
+ 插件进程

**渲染进程又包含**

+ GUI线程

> 渲染布局（页面的html，css，js，构建DOM树和渲染树就是GUI线程的工作）

+ JS引擎线程

> 解析、执行JS程序（chrome v8引擎），**JS引擎线程只有一个，这也是为什么我们所说的js是单线程的原因，其实呢语言是没有单线程多线程之说的，因为解释这个语言的引擎是单线程的，所以我们说js是单线程的**
>
> **JS引擎线程与GUI线程互斥，因为JS引擎线程也可以操作DOM**，容易造成混乱
>
> 尽量控制js文件的大小，不要让js执行时间太长

+ 定时触发器线程

> setTimeout
>
> setInterval

+ 事件触发线程

> 将满足触发条件的事件放入任务队列（异步事件放入任务队列）

+ 异步HTTP请求线程

> 处理ajax请求的线程
>
> XHR所在线程
>
> 如果请求完成时有回调函数，它就会通知事件触发线程往任务队列里面添加事件



知道了浏览器是如何进行工作的之后，我们回顾一下**前端常见的有哪些异步场景**?

+ 定时器
+ 网络请求
+ 事件绑定
+ ES6 Promise



#### 定时器

##### 定时器的执行过程

> Event Loop

1. 主线程--执行栈（代码是在执行栈中执行）
2. web APIs--setTimeout（webAPi可以理解成浏览器提供的一种能力比如setTimeout）
3. 定时器线程--计时2s
4. 事件触发线程（事件触发线程将定时器事件放入任务队列）
5. 任务队列--异步任务

```
顺序如下：
1.调用webApi(setTimeout)
2.定时器线程计数2s
3.事件触发线程将定时器事件放入任务队列（往执行栈中加任务）
4.主线程通过EventLoop遍历任务队列（往执行栈中出任务）
```

##### 定时器应用场景

+ 防抖
+ 节流
+ 倒计时
+ 动画（会存在丢帧的问题）

##### 定时器存在的问题

1. 定时任务可能不会按时执行（如果同步任务好事很久的话，定时器任务不一定会及时执行）
2. 定时器嵌套5次之后最小间隔不能低于4ms

##### 看一个定时器的常见示例

```js
// for 循环是同步任务，所以等for 执行完之后才会去执行定时器这个异步任务, var作用域是全局的，没有块级作用域
for (var i = 1; i <= 10; i ++) {
    setTimeout(function() {
        console.log(i)
    }, 1000 * i)
}
```

```
// 利用函数闭包构建作用域
for (var i = 1; i <= 10; i ++) {
    (function(i) {
        setTimeout(function() {
            console.log(i)
        }, 1000 * i)
    })(i)
}
```

```
// ES6新增的let 块级作用域
for (let i = 1; i <= 10; i ++) {
    setTimeout(function() {
        console.log(i)
    }, 1000 * i)
}
```



## 2. Event Loop机制（微观角度看异步）

**主要根据在浏览器环境下的Event Loop来说明**，node.js的EventLoop 后续node部分会讲到。

首先，我们要明白异步是怎么去实现的：

1. 宏观角度：是由于浏览器多线程
2. 微观角度：Event Loop



**异步的任务有两类**

+ 宏任务（普通任务 task）
  + script
  + setTimeout/setInterval(定时器)
  + setImmediate(Node.js的一个方法)
  + I/O操作
  + UI rendering
+ 微任务（microtask）
  + Promise
  + Object.observe 监听对象变化的一个方法
  + MutationObserver 是一个类，可以监听DOM结构变化
  + postMessage Window对象之间用来通信



**Event Loop执行顺序**

1. 首先执行script，script被称为全局任务，也属于macrotask(宏任务)
2. 当script这个macrotask（宏任务）执行完以后，再去执行所有的微任务
3. 然后再去取任务队列中取宏任务一个一个执行



**注意**

+ 一个Event Loop 有一个或多个task queue

+ 每个Event Loop 有一个 Microtask queue

  

## 3. 异步编程方法-发布/订阅

  首先呢，我们要先去知道，**异步编程的方法有哪些？**

+ 回调函数
+ 事件发布/订阅
+ Promise
+ generator函数
+ async函数

我们一个一个的来讲述，回调函数大家很常用，直接开始事件发布/订阅这个异步编程方法。



**那么如何理解发布/订阅呢？**

有三个核心概念我们得了解一下

+ publish(发布者)
+ Event Center（事件中心）
+ SubScriber(订阅者)

```js
1. 首先发布者 发布消息到 事件中心
2. 然后订阅者 从事件中心 订阅消息
3. 订阅者可以有多个
```



**如何实现一个事件的发布/订阅呢？**

```js
class PubSub {
    constructor() {
        // 用对象来存储，是因为事件的名字和事件的处理函数用对象可以很方便的对应起来
        this.events = {}
    }
    publish(eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(cb => {
                cb.apply(this, data)
            })
        }
    }
    subscribe(eventName, cb) {
        if (this.events[eventName]) {
            this.events[eventName].push(cb)
        } else {
            this.events[eventName] = [cb]
        }
    }
    // 取消订阅
    unSubscribe(eventName, cb) {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(item => item !== cb)
        } 
    }
}
```

**优点**

+ 松耦合
+ 灵活

**缺点**

+ 无法确保消息被触发或者触发几次



## 4. promise

我们先来看一看**promise/A+ 规范**。

### 术语

+ promise

> 一个有then方法的对象或者函数，行为符合本规范

+ thenable

> 一个定义了then方法的对象或函数

+ 值（value）

> 任何JavaScript的合法值

+ 异常（exception）

> throw语句抛出的值

+ 拒绝原因（reason）

> 表示一个promise的拒绝原因



### **promise的状态**

- pending--等待
- fulfilled--完成
- rejected--拒绝

```
state: pending
1.	value --> state: fulfilled
2.	reason --> state: rejected
```



### then方法

> 一个promise必须提供一个then方法来访问其当前值、终值和拒因

promise的then方法接受两个参数

```js
const promise2 = promise1.then(onFulfilled, onRejected)
```

#### 1. 参数

onFulfilled 和 onRejected都是**可选参数**

如果onFulfilled不是函数，其必须被忽略

如果onRejected不是函数，其必须被忽略

```
onFulfilled 不是函数,promise1的状态是fulfilled
state:fulfilled
value:同promise1

onFulfilled 不是函数,promise1的状态是rejected
state:rejected
value:同promise1

onFulfilled或者onRejected 是一个函数
return x
进入解析过程
```

#### 2. onFulfilled特性

如果onFulfilled是函数：

当promise执行结束后其必须被调用，其第一个参数为promise的终值

在promise执行结束前其不可被调用

其调用次数不可超过一次

#### 3. onRejected特性

如果onRejected是函数：

当promise被拒绝执行后其必须被调用，其第一个参数为promise的拒因

在promise被拒绝执行前其不可被调用

其调用次数不可超过一次

#### 4. 多次调用

then方法可以被同一个promise调用多次

- 当 `promise` 成功执行时，所有 `onFulfilled` 需按照其注册顺序依次回调
- 当 `promise` 被拒绝执行时，所有的 `onRejected` 需按照其注册顺序依次回调

#### 5. 注意事项

+ onFulfilled和onRejected必须被作为函数调用
+ onFulfilled在promise完成后被调用，onRejected在promise被拒绝执行后调用
+ onFulfilled和onRejected只被调用一次
+ 如果参数不是一个函数，直接被忽略掉（Promise.resolve(1).then(Promise.resolve(3)）

#### 6. 返回

```js
const promise2 = promise1.then(onFulfilled, onRejected)
```

```
onFulfilled 不是函数,promise1的状态是fulfilled
state:fulfilled
value:同promise1

onFulfilled 不是函数,promise1的状态是rejected
state:rejected
value:同promise1

onFulfilled或者onRejected 是一个函数
return x
进入解析过程
```



### promise的解析过程

**先抽象出一个模型resolove(promise, x)**

##### 1. x 与 promise 相等

如果 `promise` 和 `x` 指向同一对象，以 `TypeError` 为据因拒绝执行 `promise`

##### 2. x 为 promise

如果 `x` 为 Promise ，则使 `promise` 接受 `x` 的状态

- 如果 `x` 处于等待态， `promise` 需保持为等待态直至 `x` 被执行或拒绝
- 如果 `x` 处于执行态，用相同的值执行 `promise`
- 如果 `x` 处于拒绝态，用相同的据因拒绝 `promise`

##### 3. x 为对象或者函数

如果 `x` 为对象或者函数：

把 `x.then` 赋值给 `then`

- 如果取 `x.then` 的值时抛出错误 `e` ，则以 `e` 为据因拒绝 `promise`
- 如果`then`是函数，将`x`作为函数的作用域`this`调用之。传递两个回调函数作为参数，第一个参数叫做`resolvePromise`，第二个参数叫做`rejectPromise`:
  - 如果 `resolvePromise` 以值 `y` 为参数被调用，则运行 `[[Resolve]](promise, y)`
  - 如果 `rejectPromise` 以据因 `r` 为参数被调用，则以据因 `r` 拒绝 `promise`
  - 如果 `resolvePromise` 和 `rejectPromise` 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用

- 如果调用`then`方法方法抛出了异常`e`
  - 如果 `resolvePromise` 或 `rejectPromise` 已经被调用，则忽略之
  - 否则以 `e` 为据因拒绝 `promise`
- 如果 `then` 不是函数，以 `x` 为参数执行 `promise`

##### 4. x 不为对象或函数

如果 `x` 不为对象或者函数，以 `x` 为参数执行 `promise`



那么我们来实现以下这个解析过程吧

```js
import { isObject, isFunction } from "util"
//! promise 解析过程
function resolve(promise, x) {
    if (x === promise) {
        return reject(promise, new TypeError('cant be the same'))
    }
    if (isPromise(x)) {
        if (x.state === 'pending') {
            return x.then(() => {
                resolve(promise, x.value)
            }, () => {
                reject(promise, x.value)
            })
        }
        if (x.state === 'fulfilled') {
            return fulfill(promise, x.value)
        }
        if (x.state === 'rejected') {
            return reject(promise, x.value)
        }
    } else if (isObject(x) || isFunction(x)) {
        let then;
        try {
            then = x.then
        } catch (e) {
            return reject(promise, e)
        }
        if (isFunction(then)) {
            let isCalled = false;
            try {
                then.call(x, function resolvePromise(y) {
                    if (isCalled) {
                        return 
                    }
                    isCalled = true
                    resolve(promise, y)
                }, function rejectPromise(r) {
                    if (isCalled) {
                        return
                    }
                    isCalled = true
                    reject(promise, r)
                })
            } catch (e) {
                if (!isCalled) {
                    reject(promise, e)
                }
            }
        } else {
            return fulfill(promise, x)
        }
    
    } else {
        return fulfill(promise, x)
    }
}
```



接下来我们来看一下**ES6 Promise API**

### ES6 Promise API

#### **Promise构造函数**

| 构造函数                                   | 说明                                                       |
| ------------------------------------------ | ---------------------------------------------------------- |
| new Promise(function(resolve, reject) { }) | 函数作为参数                                               |
|                                            | resolve函数将promise状态从pending变成resolved（fulfilled） |
|                                            | reject函数将promise状态从pending变成rejected               |

#### **静态方法**

| 方法                            | 说明                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| Promise.resolve(param)          | 等同于 new Promise(function(resolve, reject){resolve(param)}) |
| Promise.reject(reason)          | 等同于 new Promise(function(resolve, reject){reject(reason)}) |
| Promise.all([p1,...,pn])        | 输入一组promise返回一个新的promise,全部promise都是fulfilled结果才是fulfilled状态 |
| Promise.allSettled([p1,...,pn]) | 输入一组promise返回一个新的promise,所有的promise都是fulfilled结果才是fulfilled状态 |
| Promise.race([p1,...,pn])       | 输入一组promise返回一个新的promise,结果promise的状态根据第一个变化的promise状态 |

#### **Promise实例方法**

| 方法                                         | 说明                                                         |
| -------------------------------------------- | ------------------------------------------------------------ |
| promise.then(onFulfilled,onRejected)         | promise 状态改变之后的回调，返回新的promise对象              |
| promise.catch(function(reason) {})           | 同promise.then(null, onRejected),promise状态为rejected的回调 |
| promise.finally(function(reason) { // test}) | 同promise.then(function(){ // test}, function(){ // test})，不管promise状态如何都会执行 |

**注意点**

- then、catch返回的promise是新的promise，不是原来的promise。
- Promise对象的错误会“冒泡”，直到捕获为止，错误会被下一个catch语句捕获。

所以说写catch的时候只需要在链式调用的最后面加一个catch语句去捕获就可以。

### 最佳实践

+ 不要忘记catch捕捉错误
+ then方法中使用return
+ 传递函数给then方法
+ 不要把promise写成嵌套

#### 来实战一下

**题目：**3秒之后亮一次红灯，再过两秒亮一次绿灯，再过一秒亮一次黄灯，用promise 实现多次交替亮灯的效果，console.log 模拟亮灯

```js
// 思路拆解：
// 1.多少秒后亮某个颜色的灯
// 2.顺序亮一批灯
// 3.循环顺序亮一批灯

function light(color, second) {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            console.log(color)
            resolve()
        }, second * 1000)
    })
}

function orderLights(list) {
    let promise = Promise.resolve()
    list.forEach(item => {
        promise = promise.then(() => {
            return light(item.color, item.second)
        })
    })
    promise.then(function() {
        return orderLights(list)
    })
}

const list = [
    {color: 'red', second: 3},
    {color: 'green', second: 2},
    {color: 'yellow', second: 1},
]

orderLights(list)
```



## 5. Generator函数及其异步应用

#### Generator函数

首先先来看两个概念

##### 迭代器

+ 有next方法，执行返回结果对象
+ 结果对象
  + value
  + done

```js
function createIterator(items) {
    var i = 0;
    return {
        next: function() {
            var done = i >= items.length
            var value = !done ? items[i++] : undefined
            return {
                done, 
                value
            }
        }
    }
}
```

##### 可迭代协议

+ [Symbol.iterator]属性
+ 内置可迭代对象
  + String Array Map Set 等



##### 迭代器协议

+ next方法
  + done
  + value



##### 生成器

**Generator函数（生成器）**

+ ES6异步编程解决方案
+ 声明：通过function*声明
+ 返回值：符合可迭代协议和迭代器协议的生成器对象
+ 特点：在执行时能暂停，又能从暂停处继续执行

执行Generator函数生成一个生成器对象



##### 生成器对象的原型上有三个方法

+ next(param)
+ return(param)
+ throw(param)



##### yield

+ 只能出现在Generator函数里
+ 用来暂停和恢复生成器函数

+ **next执行**
  + 遇到yield暂停，将紧跟yield表达式的值作为返回的对象的value
  + 没有yield，一直执行到return，将return的值作为返回的对象的value
  + 没有return，将undefined作为返回的对象的value
+ **next参数**
  + next方法可以带一个参数，该参数会被当做上一个yield表达式的返回值



##### generator函数运行流程如下：

```js
function* createGenerator() {
    let first = yield 1
    let second = yield first + 2
    yield second + 3
}

let gen = createGenerator();

let g1 = gen.next()  // {value: 1, done: false}
let g2 = gen.next(4) // {value: 6, done: false}
let g3 = gen.next(5) // {value: 8, done: false}
let g4 = gen.next()  // {value: undefined, done: true}
```

yield生成器函数 / 可迭代对象

+ 委托给其他可迭代对象
+ 作用：复用生成器（多个生成器同时使用）

举个栗子

```
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

- 给定param值终结遍历器，param可缺省。

```
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

- 让生成器对象内部抛出错误，走到try,catch语句中

```
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



接下来我们来看一下**generator函数的实现原理**

首先先得了解找一个概念

##### 协程

> 介绍协程：https://cnodejs.org/topic/58ddd7a303d476b42d34c911

+ 一个线程存在多个协程，但同时只能执行一个
+ Generator函数式协程在ES6的实现
+ yield挂起x 协程（交给其他协程），next唤醒 x协程



##### Generator函数应用

> 耦合程度还是挺高的



#### Thunk函数

+ **求值策略**  传值调用，传名调用 sum(x+1, x+2)
+ thunk函数是传名调用的实现方式之一
+ 可以实现自动执行Generator函数



举个栗子

```js
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



### 6. 深入理解async/await

#### async函数

+ 是一个语法糖，使异步操作更简单
+ 返回值 是一个 promise对象
  + return的值是promise  resolved时候的value
  + throw的值是promise rejected时候的reason

```js
async function test() {
    return 1;
}
const p = test();
console.log(p);  // Promise { 1 }
p.then(function (data) {
    console.log(data) // 1
})

async function test() {
    throw new Error('error')
}
const p = test();
console.log(p); 
p.catch(function (data) {
    console.log(data) 
})
```

#### await

+ 只能出现在async函数内或者最外层
+ 等待一个promise对象的值
+ await的promise状态为rejected，后续执行中断

```
await
1. promise
	1> resolved 返回promise的值
	2> rejected 抛出promise的拒因
	
2. 非promise
	1> 返回对应的值  await 1
```



#### async函数实现原理

**Generator + 自动执行器**

```
// async函数实现原理
async function example(params) {
    // ...
}

function example(params) {
    return spawn(function*() {
        // ...
    })
}

function spawn(genF) {
    return new Promise(function(resolve, reject) {
        const gen = genF(); // 生成器对象
        function step(nextF) {
            let next;
            try {
                next = nextF(); //执行gen.next()
            } catch (e) {
                return reject(e)
            }
            if (next.done) {
                return resolve(next.value)
            }
            //* next.done 为 false时，继续step;
            Promise.resolve(next.value).then(
                function(v) {
                    step(function() {
                        return gen.next(v)
                    })
                },
                function(e) {
                    stop(function() {
                        return gen.throw(e)
                    })
                }
            )
        }
        step(function() {
            return gen.next(undefined)
        })
    })
}
```

