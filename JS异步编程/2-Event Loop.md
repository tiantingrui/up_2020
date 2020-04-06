# EventLoop机制（微观角度看异步）



### 目标：

+ 浏览器的Event Loop

+ Node.js的EventLoop

  

### 浏览器的Event Loop

**异步实现**

1. 宏观：浏览器多线程

2. 微观：Event Loop，事件循环，实现异步的一种机制

   

**异步的任务有两类**

+ 宏任务（普通任务 task）
  + script
  + setTimeout/setInterval(定时器)
  + setImmediate(Node.js的一个方法)
  + I/O操作
  + UI rendering
+ 微任务（microtask）
  + Promises
  + Object.observe  监听对象变化的一个方法
  + MutationObserver 是一个类，可以监听DOM结构变化
  + postMessage  Window对象之间用来通信



**Event Loop执行顺序**

1. 首先执行script，script被称为全局任务，也属于macrotask;
2. 当macrotask执行完以下，执行所有的微任务；
3. 微任务全部执行完，再取任务队列中的一个宏任务执行。



**浏览器的Event Loop**

一个EventLoop 有一个或多个task queue

每个EventLoop有一个Microtask queue



### Node.js的Event Loop



**Node.js的架构图**（三层）

+ node-core(node.js的核心js库)
+ 绑定（负责包装和暴露libuv和js其他低级的功能）
+ V8引擎（js 引擎，js在服务端运行的基础） && libuv
  + libuv是一个第三方库，nodejs异步编程的基础，node 底层的I/O引擎，C语言编写事件驱动的一个库，主要负责Node API 的执行，可以将不同的任务分配给不同的线程，从而形成了event loop事件循环，（node是非阻塞IO主要实现在libuv这一层）

**Node.js的Event Loop 的阶段（6个）**

1. timers：执行timer的回调（定时器的回调:setTimeout,setInterval）
2. pending callbacks：系统操作的回调
3. idle，pepare：内部使用
4. poll：等待新I/O事件
5. check：执行setImmediate回调
6. close callbacks：内部使用

**Poll阶段的两个主要功能：**

+ 计算应该被block多久
+ 处理poll队列的事件

**process.nextTick()**

是一个异步的node API，但不属于event loop阶段，它会让event loop停止下来，先去执行自己。



### 最后思考

以"Event Loop是什么“为主题整理一篇文章。

















