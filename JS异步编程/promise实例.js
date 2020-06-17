//* 3秒之后亮一次红灯，再过两秒亮一次绿灯，再过一秒亮一次黄灯，用promise 实现多次交替亮灯的效果
//* console.log 模拟亮灯

/* 
    思路拆解：
        1. 实现多少秒后亮某个颜色的灯
        2. 顺序亮一批灯
        3. 循环顺序亮一批灯
*/

function light(color, second) {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            console.log(color)
            resolve()
        }, second * 1000)
    })
}

function orderLights(list) {
    let promise = Promise.resolve();
    list.forEach(item => {
        promise = promise.then(() => {
            return light(item.color, item.second)
        })
    })
    promise.then(() => {
        return orderLights(list)
    })
}

const list = [
    {color: 'red', second: 3},
    {color: 'green', second: 2},
    {color: 'yellow', second: 1}
]

orderLights(list)

// 函数防抖
let debounce = (fn, delay) => {
    let timer = null
    return function(...args) {
        if (timer) {
            clearTimeout(timer)
        } 
        timer = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}

// 函数节流
let throttle = (fn, delay) => {
    let flag = true
    return function(...args) {
        if (!flag) return 
        flag = false
        setTimeout(() => {
            fn(...args)
        },delay)
    }
}

const statusMap = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
}

function runCbs(cbs, value) {
    cbs.forEach(cb => cb(value))
}

// 将promise设置为fulfilled状态
function fulfilledPromise(promise, value) {
    if (promise.status !== statusMap.PENDING) {
        return 
    }
    promise.status = statusMap.FULFILLED
    promise.value = value
    runCbs(promise.fulfilledCbs, value)
}

function rejectedPromise(promise, reason) {
    if (promise.status !== statusMap.PENDING) {
        return 
    }
    promise.status = statusMap.REJECTED
    promise.reason = reason
    runCbs(promise.rejectedCbs, value)
}

function resolvePromise(promise, x) {
    if (promise === x) {
        rejectedPromise(promise, new TypeError(`cant be the same`))
        return
    }
    if (isPromise(x)) {
        if (x.status = statusMap.FULFILLED) {
            fulfilledPromise(promise, x.value)
            return
        }
        if (x.status === statusMap.REJECTED) {
            rejectedPromise(promise, x.reason)
            return 
        }
        if (x.status === statusMap.PENDING) {
            x.then(() => {
                fulfilledPromise(promise, x.value)
            }, () => {
                rejectedPromise(promise, x.reason)
            })
            return 
        }
        return
    }
    if (isObject(x) || isFunction(x)) {
        let then;
        // 防止fulfilledPromise && rejectedPromise 被调用几次，只可以调用一次
        let called = false; 
        if (isFunction(then)) {
            try {
                then.call(x, (y) => {
                    if (called) {
                        return 
                    }
                    called = true
                    resolvePromise(promise, y)
                }, (r) => {
                    if (called) {
                        return 
                    }
                    called = true
                    rejectedPromise(promise, r)
                })
            } catch (error) {
                if (called) {
                    return 
                } 
                called = true
                rejectedPromise(promise, error)
            }
            return
        } else {
            fulfilledPromise(promise, x)
            return
        }
    } else {
        fulfilledPromise(promise, x)
        return 
    }

}

function isFunction(fn) {
    return Object.prototype.toString.call(fn).toLocaleLowerCase() === '[object function]'
}

function isObject(obj) {
    return Object.prototype.toString.call(obj).toLocaleLowerCase() === '[object object]'
}

function isPromise(p) {
    return p instanceof Promise
}
class Promise {
    constructor(fn) {
        this.status = statusMap.PENDING
        this.value = undefined
        this.reason = undefined
        this.fulfilledCbs = []
        this.rejectedCbs = []
        fn((value) => {
            resolvePromise(this, value)
        }
        , (reason) => {
            rejectedPromise(this, reason)
        })
    }
    then(onFulfilled, onRejected) {
        const promise1 = this.then
        const promise2 = new Promise(() => {})
        if (promise1.status === statusMap.FULFILLED) {
            if (!isFunction(onFulfilled)) {
                return promise1
            }
            setTimeout(() => {
                try {
                    const x = onFulfilled(promise1.value)
                    resolvePromise(promise2, x)
                } catch (error) {
                    rejectedPromise(promise2, error)
                }
            }, 0)
        }
        if (promise1.status === statusMap.REJECTED) {
            if (!isFunction(onRejected)) {
                return promise1
            }
            setTimeout(() => {
                try {
                    const x = onRejected(promise1.value)
                    resolvePromise(promise2, x)
                } catch (error) {
                    rejectedPromise(promise2, error)
                }
            }, 0)
        }
        if (promise.status === statusMap.PENDING) {
            onFulfilled = isFunction(onFulfilled) 
            ? onFulfilled
            : value => {
                return value
            }
            onRejected = isFunction(onRejected)
            ? onRejected
            : err => {
                throw err
            }
            promise1.fulfilledCbs.push(() => {
                () => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(promise1.value)
                            resolvePromise(promise2, x)
                        } catch (error) {
                            rejectedPromise(promise2, error)
                        }
                    }, 0)
                }
            })
            promise.rejectedCbs.push(() => {
                () => {
                    setTimeout(() => {
                        try {
                            const x = onRejected(promise1.value)
                            resolvePromise(promise2, x)
                        } catch (error) {
                            rejectedPromise(promise2, error)
                        }
                    })
                }
            })
        }
        return promise2
    }
}