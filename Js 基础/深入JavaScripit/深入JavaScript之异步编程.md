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

