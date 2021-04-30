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
                    reject(promise, y)
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


