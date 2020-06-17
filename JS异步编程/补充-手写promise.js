/*
 * @Author: terry 
 * @Date: 2020-05-18 23:24:00 
 * @Last Modified by: terry
 * @Last Modified time: 2020-06-17 13:37:17
 */
//! 根据Promise/A+ 规范实现promise，使用promise-aplus-tests插件验证。

/* 
    思路构思：
    1. 了解promise 规范
    2. 实现promise
    3. 测试
*/

const statusMap = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
};
//? 将promise 设置为fulfilled状态
function fulfilledPromise(promise, value) {
    //! 只能从pending状态转换为其他状态
    if (promise.status !== statusMap.PENDING) {
        return;
    }
    promise.status = statusMap.FULFILLED;
    promise.value = value;
    runCbs(promise.fulfilledCbs, value); //* promise 状态改变
}
//? 将 promise 设置为rejected状态
function rejectedPromise(promise, reason) {
    //! 只能从pending状态转换为其他状态
    if (promise.status !== statusMap.PENDING) {
        return;
    }
    promise.status = statusMap.REJECTED;
    promise.reason = reason;
    runCbs(promise.rejectedCbs, value); //* promise 状态改变
}

function runCbs(cbs, value) {
    cbs.forEach(cb => cb(value));
}

function isFunction(fn) {
    return Object.prototype.toString.call(fn).toLocaleLowerCase() === '[object function]';
}

function isObject(obj) {
    return Object.prototype.toString.call(obj).toLocaleLowerCase() === '[object object]';
}

function isPromise(p) {
    return p instanceof Promise;
}
//? promise的解析
function resolvePromise(promise, x) {
    //* 1. x与 promise 相同（指向相同的值）
    if (promise === x) {
        rejectedPromise(promise, new TypeError('cant be the same'));
        return
    }
    //* 2. x是一个promise
    if (isPromise(x)) {
        if (x.status === statusMap.FULFILLED) {
            fulfilledPromise(promise, x.value);
            return
        }
        if (x.status === statusMap.REJECTED) {
            rejectedPromise(promise, x.reason);
            return
        }
        if (x.status === statusMap.PENDING) {
            x.then(() => {
                fulfilledPromise(promise, x.value);
            }, () => {
                rejectedPromise(promise, x.reason);
            })
            return
        }
        return
    }
    //* 3. x是一个对象或者一个函数
    if (isObject(x) || isFunction(x)) {
        let then;
        let called = false; //! 防止fulfilledPromise && rejectedPromise 被调用多次，只可以调用一次
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
            //* 如果then 不是一个函数，则以x为fulfill promise
            fulfilledPromise(promise, x);
            return
        }
    } else { //* 4. x不是对象也不是函数, 则以x 为值fulfill promise
        fulfilledPromise(promise, x);
        return
    }


}
class Promise {
    constructor(fn) {
        this.status = statusMap.PENDING; //* 定义状态
        this.value = undefined; //* promise 的值
        this.reason = undefined; //* promise 的拒因
        this.fulfilledCbs = []; //* then fulfilled cb
        this.rejectedCbs = []; //* then rejected cb
        fn((value) => {
            // fulfilledPromise(this, value);
            resolvePromise(this, value);
        }, (reason) => {
            rejectedPromise(this, reason);
        });
    }
    //* then 方法接受两个参数
    then(onFulfilled, onRejected) {
        const promise1 = this;
        const promise2 = new Promise(() => {});
        if (promise.status === statusMap.FULFILLED) {
            if (!isFunction(onFulfilled)) {
                return promise1;
            }
            setTimeout(() => {
                try {
                    const x = onFulfilled(promise1.value);
                    resolvePromise(promise2, x);
                } catch (error) {
                    rejectedPromise(promise2, error)
                }
            }, 0)
        }
        if (promise.status === statusMap.REJECTED) {
            if (!isFunction(onRejected)) {
                return promise1;
            }
            setTimeout(() => {
                try {
                    const x = onRejected(promise1.value);
                    resolvePromise(promise2, x);
                } catch (error) {
                    rejectedPromise(promise2, error)
                }
            }, 0)
        }
        if (promise.status === statusMap.PENDING) {
            //! 这里对onFulfilled 和 onRejected 设置了默认值
            onFulfilled = isFunction(onFulfilled) ?
                onFulfilled :
                (value) => {
                    return value;
                };
            onRejected = isFunction(onRejected) ?
                onRejected :
                (err) => {
                    throw err;
                }

            promise1.fulfilledCbs.push(() => {
                //! 注意这里 push 的是一个方法
                () => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(promise1.value);
                            resolvePromise(promise2, x);
                        } catch (error) {
                            rejectedPromise(promise2, error);
                        }
                    }, 0)
                }
            });
            promise.rejectedCbs.push(() => {
                () => {
                    setTimeout(() => {
                        try {
                            const x = onRejected(promise1.value);
                            resolvePromise(promise2, x);
                        } catch (error) {
                            rejectedPromise(promise2, error);
                        }
                    })
                }
            });
        }
        return promise2;
    }
}

//* 测试用到的钩子
Promise.deferred = function () {
    const deferred = {};
    deferred.promise = new Promise((resolve, reject) => {
        deferred.resolve = resolve;
        deferred.reject = reject;
    });
    return deferred
}

module.exports = Promise;