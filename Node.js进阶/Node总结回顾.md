# Node总结回顾

------



[TOC]



> command + option + D  隐藏和显示 Duck
>
> Command + Option + -  添加下划线



## Node基础

------



### 01. Node模块机制和包管理器npm

------



#### Node模块机制

+ Node应用由模块组成，采用CJS/ESM模块规范来组织
+ 每个文件就是一个模块，有自己的作用域
+ 在一个文件里面定义的变量、函数、类、都是私有的，对其他文件不可见
+ 在Node中，模块的加载是运行时同步加载的
+ 模块可以多次加载，但是只会在第一次加载是运行一次，然后运行结果就被缓存了



#### 模块加载机制

1. 缓存中存在，直接返回
2. 内置模块，则直接加载
3. 根据找到的文件创建新模块并缓存

> 模块加载的缓存机制的目的：可以减少对文件的查找而引起的延迟



#### 包管理器 - npm

+ Npm 代指Node模块生态，又代指模块安装CLI工具
+ 使用package.json来描述项目的基本信息和依赖，组成树结构
+ 使用nvm管理node版本，使用nrm管理npm源，使用npx执行命令
+ 使用yarn加速包下载
+ 使用scripts组织工程化脚本入口



#### △创建和发布你自己的Node模块

1. 创建一个模块
2. 将整个目录打包
3. 准备发布一个模块
4. 发布模块



### 02.Node提供的原生API能力

------

#### 1. Node.js 数据类型

##### 1. △Buffer

+ 流式数据（非一次性加载完成的数据）由于产生和使用不一定同速，所以需要缓存区
+ 尺寸需要临时占用大量内存的数据，内存中开辟的一片区域，用来存放二进制数据
+ 流的生产者于消费者之间的速度通常是不一致的，因此需要buffer来暂存一些数据
+ buffer大小通过highWaterMark参数指定，默认情况是16kB



##### 2.Stream

+ Stream 模块提供的是**抽象接口**，有很多模块实现了这个接口
+ Stream 就是解决生产者和消费者问题的 一种方式， **解决异步IO问题**
+ Stream 模块对于流的使用者而言无需关心  **readableSrc.pipe(writableDest)**



##### 3. event/EventEmitter

```txt
 EventEmitters --> Event (会进行event loop) --> Event Handlers
```



##### 4. Error

**错误种类**

+ 标准的JavaScript错误，比如：**SyntaxError / ReferenceError**
+ 底层操作触发的系统错误，比如：**文件读写**
+ 用户自定义错误
+ 异常逻辑触发的AssertionError，通常来自assert模块

**错误冒泡和捕获**

+ 所有通过Node.js或JavaScript运行时抛出的异常都是Error实例
+ 大多数的异步方法都接受一个callback函数，该函数会接收一个Error对象传入作为第一个参数

**好好读一下Node.js内置的错误信息，通常是见文知意，例如：ERR_ARG_NOT_ITERABLE**



##### 5. URL

+ 弃用urlObjects，改用WHATWGURL
+ 使用URLSearchParams操作参数

```js
Object.fromEntries(new URLSearchParams('foo=bar & baz = qux'))
// {foo: 'bar', baz: 'qux'}
```

```js
url.path(req.url).pathname
url.parse(req.url).query
Querystring.parse(url.parse(req.url).query)['params2']
```



##### 6. 全局变量 - global

+ **看上去像是全局变量的存在，实际上仅存在于模块的作用域中**
  + `__dirname`
  + `__filename`
  + exports
  + module
  + require()

+ **从JavaScript继承而来的全局变量**
  + console
  + timer全家桶
  + global(容器)
+ **Node.js特有的全局变量**
  + Buffer
  + process
  + URL
  + WebAssembly



### 2. Node.js 工具库

------

#### 1. util

本是内置模块开发时的公共工具集，现已开放给开发者使用



#### 2. assert

内置断言库，需要配合测试框架使用，抛出AssertionError 错误



#### 3. querystring

官方提供的解析和格式化URL查询字符串的实用工具



### 3. Node.js的文件操作能力

------

#### 1. os

+ os模块提供了与操作系统相关的实用方法和属性
+ 通过兼容的方式调用不同平台的底层命令，形成系统快照

```
cpus platform type uptime userInfo
```

+ 定义操作系统级别的枚举常量

```txt
信号常量 SIG* 、 错误常量E* 、Windows特有WSA* 、 优先级PRIORITY*
```



#### 2. fs

+ fs模块模拟linux环境，提供了用于与文件系统进行交互的API
+ 所有的文件系统操作都具有同步和异步的形式
+ URI作为特殊的文件也可以被fs模块使用
+ 操作文件夹
  + mkdir / rmdir
+ 操作文件
  + chmod/open/read/write



### 4. Nodejs的模块机制以及原理

#### 1. CommonJS

+ 模块引用

  通过 require(module)来引入module

+ 模块定义

  通过挂载在module.exports对象上实现定义

+ 模块标识

  通过路径标识引入的是哪个模块



#### 2. Nodejs的模块机制 - Node的实现

路径分析 -> 文件定位 -> 编译执行 -> 加入缓存



##### 路径分析

+ 内置模块
  + 在node进程开始的时候就开始预加载了
  + 加载的是二进制文件，无需定位和编译
+ 文件模块
  + 通过NPM安装到第三方模块
  + 本地模块
+ 模块内容
  + 函数、对象或者属性，如函数、数组甚至任意类型的JS对象



##### 模块加载的优先级

1. 已缓存的模块
2. 内置模块
3. 文件模块
4. 文件目录模块
5. node_module模块



##### 模块文件定位

1. 拓展名判断
   1.  .js文件
   2.  .json文件
   3.  .node文件
2. 解析package.json
   1. 解析为对象
   2. 读取main指定的路径
3. 查找入口文件
   1. 将 index 作为默认值
   2. 查看index.js
   3. index.json
   4. index.node
4. 进入下一个模块路径
   1. 在父目录中重复以上步骤
   2. 轮询后依旧失败则报错



##### 模块编译执行

+ `.js`文件
  + 通过 fs模块同步读取后编译执行，未识别类型也会当做js 处理
+ `.json`文件
  + 通过 fs 模块同步读取后，用 JSON.parse() 解析并返回结果
+ `.node`
  + 这是用 C/C++ 写的拓展文件，通过 process.dlopen 方法加载最后编译生成的



##### 模块js文件的编译

+ 注入全局变量
  + 以参数形式，注入 module/exports/require 方法
  + 同时注入路径解析时得到的 **filename/dirname**
+ 构建上下文环境
  + 闭包产生作用域，通过 runInThisContext() 执行
  + 将function 对象挂载到 exports 对象上，并导出



##### 加入缓存以及清除缓存

+ 核心模块
  + 登记在 NativeModule._cache 上
+ 文件模块
  + 封装后的方法以字符串形式存储，等待调用
+ 清除缓存
  + 通过delete  require.cache[require.resolve(module)]



##### require vs import

+ **import**
  + ES6的规范
  + 静态加载模块
  + 编译的时候执行代码
  + 缓存执行结果
  + 按需引入，节省内存
+ **require**
  + commonJS规范
  + 动态加载模块
  + 调用的时候加载源码
  + 加载全部代码



### 4. Nodejs的网络编程能力

##### 网络模型OSI & TCP/IP



##### Socket ? 套接字 ？快递盒 ？？？ 插座

+ 实现底层通信，几乎所有的应用层都是通过socket 进行通信
+ 对TCP/IP协议进行封装，向应用层协议暴露接口调用
+ TCP/IP协议族中，传输层存在两种协议：TCP、UDP
+ 两种协议不同，因为不同的参数的socket实现过程也不一样



##### Nodejs网络基础模块 -  net / dgram

+ net模块是 TCP/IP的node实现，提供了一些用于底层的网络通信的小工具

+ http Server 继承自 net.Server

+ http 客户端 与 http 服务端的通信均依赖于 socket (net.socket)

  + net.Server: TCP  server ， 内部通过socket 来实现与客户端的 通信

  + net.Socket: 本地socket的 node 版 实现，它实现了全双工的 stream 接口

    

#### net.Socket

+ net.Socket对象时TCP或UNIX Socket 的抽象
+ net.Socket实例实现了一个双工流接口
+ API归纳
  + 连接相关connect
  + 数据读写 write
  + 数据属性 bufferSize
  + 地址相关 address

##### 动手写一个案例感受一下

+ 服务器A启动服务，等待连接
+ 基于事件驱动，服务器B访问服务器A提供的服务
+ 关闭数据请求，结束服务

##### Nodejs的网络编程-http/https/http2

+ http 模块是 Node 的门脸，是编写 Web Server 最常见的模块
+ Server部分继承自 net.Server， 并对请求和响应数据进行了封装
+ 也提供了request/get 的能力，允许向其他服务器端发起http请求
+ Node封装了 HTTPS/HTTP2 的实现，可以轻松创建 HTTP 服务



### 5. Node.js 的进程管理

#### 操作系统的进程和线程

+ 运行任务的程序叫做“进程”，一个进程只能执行一个任务
+ 进程并发：以多进程形式，允许多个任务同时运行
+ 线程并发：以多线程形式，允许单个任务分成不同的部分运行
+ 操作系统是提供协调机制，防止冲突，共享资源
+ JavaScript是单线程语言，所以多个任务只能排队进行



##### 多进程 vs 多线程

| 维度       | 多进程                                          | 多线程                                   | 比较       |
| ---------- | ----------------------------------------------- | ---------------------------------------- | ---------- |
| 数据共享   | 数据共享复杂，需要用IPC；数据是分开的，同步简单 | 因为共享进程数据，数据共享简单，同步复杂 | 各有千秋   |
| 资源利用   | 占用内存多，切换复杂，CPU利用率低               | 占用内存少，切换简单，CPU利用率高        | 多线程更好 |
| 性能开销   | 创建销毁，切换复杂，速度慢                      | 创建销毁，切换简单，速度很快             | 多线程更好 |
| 编码实践   | 编码简单、调式方便                              | 编码、调试复杂                           | 多进程更好 |
| 可靠性     | 进程独立运行，不会相互影响                      | 线程同呼吸共命运                         | 多进程更好 |
| 分布式支持 | 可用于多机多核分布式，易于拓展                  | 只能用于多核分布式                       | 多进程更好 |



##### Event Loop

+ JavaScript 通过 EventLoop 的形式解决单线程任务调度问题
+ EventLoop 是一个程序结构，用于等待和发送消息和事件
+ 浏览器的EventLoop 和 Node 的 EventLoop 是两个概念

##### 浏览器的Event Loop



##### nodejs的Event Loop



##### Nodejs 进程 - process

+ process是一个全局对象，无需require直接使用，提供进程描述
+ process对象是一个EventEmiter的实例，暴露了进程事件的钩子
  + exit监听进程退出
  + encautchException 监听异常
+ 提供标准流输出，对应的是进程的I/O操作
  + node版本的console底层是由stdio实现的
  + 数据流与其他双工数据流不同，同步写会阻塞进程导致性能开销

##### Nodejs 进程创建 - child_process/cluster

+ child_process 是 Node.js 的内置模块
  + spawn：适用于返回大量数据，例如图像处理，二进制数据处理
  + exec：适用于小量数据，maxBuffer 默认值为 200 * 1024 超出奔溃
  + fork：衍生新的进程，进程 之间是仙湖独立的，每个进程独立
+ cluster 是 Node.js的内置模块
  + Worker 对象包含了关于工作进程的所有的公共的信息和方法
  + fork：衍生新的进程，进程之间是相互独立的，每个进程独立
  + 使用主从模型轮询处理服务的负载任务，通过IPC通信



##### 进程守护

+ 最佳实践说：该挂就挂，挂了怎么自启动？
+ 进程并发：以多进程形式，允许多个任务同时运行
+ 线程并发：以多线程形式，允许单个任务分成不同的部分运行
+ 操作系统提供协调机制，防止冲突，共享资源
+ JavaScript是单线程语言，所以多个任务只能排队进行

**使用工具实现进程守护 pm2 forever**



## Node 原生Web Server

------

### 1. Web server 的构成

+ 处理 http 的动词
  + 对 http 的动词（GET/POST/PUT）进行相应
+ 路由管理
  + 分别处理不同URL路径的请求，返回对应的网络请求
+ 静态文件托管
  + 对网络请求的静态资源进行相应或使用模块动态响应请求
+ 文件数据存储
  + 将请求携带的数据存储到文件或者数据库中



#### Web Server 的基本架构

+ 简单一点的

```html
Client <==>(HTTP req && res) Web Server <==> DataBase
```

+ 复杂一点的

```html
Client <==>(HTTP req && res) Web Server <==> Application Server <==> DataBase
```



### 2. Nodejs 作为Web Server 的优势

#### 优势

+ **并发性能优异**

  基于事件驱动的服务在响应请求的场景中有极高的并发性能表现

+ **JavaScript同构**

  减少学习成本，使用最流行的Js或其他可编译/转换为Js的语言均可实现

+ **生态活跃完善**

  npm 提供了数十万个可重用的工具包，提供了一流的依赖解决方案，可实现自动化工具链构建

+ **代码可移植**

  兼容各种操作系统运行环境，一份代码可以运行在多种环境中

+ **框架高度包容**

  Node以及Node的Web框架都拥有天然的包容性，易于拓展和维护

+ **友好的社区氛围**

  丰富的生态诞生了大量的开源社区，聚集了众多的开发人员

#### 

### 3. Web Server 最小系统

示例代码

```js
const http = require('http')

http.createServer(function (rea, res) {
  res.write('Hello node')
  res.end()
}).listen(3000)
```

#### Web Server 的构成

1. **处理HTTP**

   对HTTP的动词（GET、POST、PUT、DELETE）进行响应

2. **路由管理**

   分别处理不同URL路径的请求，返回对应的网络资源

3. **静态资源托管**

   对网络请求的静态资源进行响应或使用模板动态响应请求

4. **文件数据存储store**

   将请求携带的数据存储到文件或者数据库中

```js
const http = require('http')
const fs = require('fs')
const url = require('url')
const path = require('path')
const qs = require('querystring')

const notFound = (req, res) => {
    fs.readFile(path.join(__dirname, '404.html'), (err, data) => {
        if (err) {
            res.write(404, 'not found')
        } else {
            res.writeHead(404, {
                "Content-Type": "text/html;charset='utf-8' "
            })
            res.write(data)
            res.end()
        }
    })
}

const writeDb = (chunk) => {
    fs.appendFile(path.join(__dirname, 'db'), chunk, err => {
        if (err) throw err
        console.log('db insert', chunk && chunk.toString())
    })
}

http.createServer((req, res) => {
    // 1. 路由处理
    // 2. 静态资源托管
    // 3. Http verb
    // 4. store

    let pathName = url.parse(req.url).pathname

    // /api =>
    if (pathName.startsWith('/api')) {
        const method = req.method
        if (method === 'GET') {
            const query = qs.parse(url.parse(req.url).query)

            const resData = {
                code: 200,
                msg: 'success',
                data: query
            }

            res.end(JSON.stringify(resData))

            return 
        }
        if (method === 'POST') {
            const contentType = req.headers['content-type']
            if (contentType === 'application/json') {
                let postData = ''
                req.on('data', chunk => {
                    postData += chunk
                    writeDb(chunk)
                })
                res.end('end', () => {
                    res.end(postData)
                })
            }
        }
    }
    
    if (pathname === '/') {
        pathName = path.join(__dirname, 'index.html')
    }

    const extName = path.extname(pathName)

    if (extName === '.html') {
        // index.html
        fs.readFile(pathName, (err, data) => {
            if (err) {
                // 404 => 404.html
                notFound(req, res)
            } else {
                res.writeHead(200, {
                    "Content-Type": "text/html;charset='utf-8'"
                })
                res.write(data)
                res.end()
            }
        })
    }
}).listen(7777)
```



## 使用Express 搭建Web Server

------















## Koa

------

> 专注于异步流程改进

### Koa 概览

+ express 很简洁，Koa更简洁
+ Koa应用程序是一个包含一组中间件函数的对象，它是按照类似堆栈的方式组织和执行的
+ 内置优雅的底层中间件处理内容协商，缓存清理，代理支持和重定向等常见任务的方法，开箱即用



### 洋葱模型



### Koa 常用插件

+ koa-static
  + 处理静态资源
+ koa-router
  + 处理路由
+ koa-session
  + 保持网路请求
+ koa-bodyparser
  + 处理请求体
+ koa-compress
  + 压缩响应数据
+ koa-logger
  + 输出服务日志
+ koa-error
  + 处理响应错误





