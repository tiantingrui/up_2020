# 深入理解promise

### 目标:

+ **promise规范**
+ **ES6 Promise API**
+ **Promise 实践**



### Promise/A+ 规范

**术语**

+ promise	一个有then方法的对象或函数，行为符合本规范
+ thenable  一个定义了then方法的对象或函数
+ 值，value  任何JavaScript的合法值
+ 异常，exception  throw语句抛出的值
+ 拒绝原因，reason  一个标示promise被拒绝原有的值



**promise的状态**

+ pending--等待
+ fulfilled--完成
+ rejected--拒绝

```
state: pending
1.	value --> state: fulfilled
2.	reason --> state: rejected
```

**then方法**

+ const  promise2 = promise1.then(onFulfilled, onRejected)
+ **then方法的参数**：
  + 两个函数参数
  + onFulfilled在promise完成后被调用，onRejected在promise被拒绝执行后调用
  + 只被调用一次
  + 如果参数不是一个函数，直接被忽略掉（Promise.resolve(1).then(Promise.resolve(3)）
+ **then方法的调用**：可以调用多次Promise.resolve(3
+ **then方法的返回值**：promise**（***）

```
onFulfilled 不是函数,promise1的状态是fulfilled
state:fulfilled
value:同promise

onFulfilled 不是函数,promise1的状态是rejected
state:rejected
value:同promise

onFulfilled或者onRejected
return x
进入解析过程

```

**promise解析过程**

+ 抽象模型resolve(promise, x)
+ 如果promise和x指向相同的值
+ 如果x是一个promise
+ 如果x是一个对象或一个函数
+ 如果x不是对象也不是函数

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



### ES6 Promise API



**Promise构造函数**

| 构造函数                                   | 说明                                                       |
| ------------------------------------------ | ---------------------------------------------------------- |
| new Promise(function(resolve, reject) { }) | 函数作为参数                                               |
|                                            | resolve函数姜promise状态从pending变成resolved（fulfilled） |
|                                            | reject函数姜promise状态从pending变成rejected               |

**静态方法**

| 方法                            | 说明                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| Promise.resolve(param)          | 等同于  new Promise(function(resolve, reject){resolve(param)}) |
| Promise.reject(reason)          | 等同于  new Promise(function(resolve, reject){reject(reason)}) |
| Promise.all([p1,...,pn])        | 输入一组promise返回一个新的promise,全部promise都是fulfilled结果才是fulfilled状态 |
| Promise.allSettled([p1,...,pn]) | 输入一组promise返回一个新的promise,所有的promise都是fulfilled结果才是fulfilled状态 |
| Promise.race([p1,...,pn])       | 输入一组promise返回一个新的promise,结果promise的状态根据第一个变化的promise状态 |

**Promise实例方法**

| 方法                                             | 说明                                                         |
| ------------------------------------------------ | ------------------------------------------------------------ |
| promise.then(onFulfilled,onRejected)             | promise 状态改变之后的回调，返回新的promise对象              |
| promise.catch(function(reason) {})               | 同promise.then(null, onRejected),promise状态为rejected的回调 |
| promise.finally(function(reason) {     // test}) | 同promise.then(function(){ // test}, function(){ // test})，不管promise状态如何都会执行 |

**注意点**

+ then、catch返回的promise是新的promise，不是原来的promise。
+ Promise对象的错误会“冒泡”，直到捕获为止，错误会被下一个catch语句捕获。

所以说写catch的时候只需要在链式调用的最后面加一个catch语句去捕获就可以。



### 实践

**最佳实践**

+ 不要忘记catch捕捉错误
+ then方法中使用return
+ 传递函数给then方法
+ 不要把promise写成嵌套

举个栗子：

```js
//* 3秒之后亮一次红灯，再过两秒亮一次绿灯，再过一秒亮一次黄灯，用promise 实现多次交替亮灯的效果
//* console.log 模拟亮灯

//? 拆解：
//? 1.多少秒后亮某个颜色的灯
//? 2.顺序亮一批灯
//? 3.循环顺序亮一批灯

function light(color, second) {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            console.log(color);
            resolve()
        }, second * 1000)
    })
}
// [{color: xx, second: xx}]
function orderLights(list) {
    let promise = Promise.resolve();
    list.forEach(item => {
        promise = promise.then(() => {
            return light(item.color, item. second)
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

#### 最后实践：

+ 根据Promise/A+规范实现promise，使用promises-aplus/promises-tests插件验证。