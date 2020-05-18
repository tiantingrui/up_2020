/*
 * @Author: mikey.zhaopeng 
 * @Date: 2020-05-18 23:24:00 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-05-18 23:28:50
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
}
//? 将promise 设置为rejected状态
function fulfilledPromise(promise, reason) {
    //! 只能从pending状态转换为其他状态
    if (promise.status !== statusMap.PENDING) {
        return; 
    }
    promise.status = statusMap.REJECTED;
    promise.reason = reason;
}
function isFunction(fn) {
    return Object.prototype.toString.call(fn).toLocaleLowerCase() === '[object function]';
}
//? promise的解析
function resolvePromise(promise, x) {
    //todo
}
class Promise {
    constructor(fn) {
        this.status = statusMap.PENDING; //* 定义状态
        this.value = undefined; //* promise 的值
        this.reaso = undefined; //* promise 的拒因
        this.fulfilledCbs = []; //* then fulfilled cb
        this.rejectedCbs = []; //* then rejected cb
        fn((value) => {
            fulfilledPromise(this, value);
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
        
        return promise2;
    }
}