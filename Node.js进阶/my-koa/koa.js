//* const app = new Koa()
//* app.use()
//* app.listen()

const http = require('http');

class Koa {
    middleware = () => {}

    constructor() {}

    listen(port, cb) {
        const server = http.createServer((req, res) => {
            this.middleware(req, res)
        });
        server.listen(port, cb)
    }

    use(middleware) {
        this.middleware = middleware
        return this
    }
}

module.exports = Koa


function resolvePromise(promise, x) {
    if (promise === x) {
        rejectedPromise(promise, new TypeError(`cant be the same`))
    }
    if (isPromise(x)) {
        if (x.status === statusMap.FULFILLED) {
            fulfilledPromise(promise, x.value)
            return
        }
        if (x.status === statusMap.REJECTED) {
            rejectedPromise(promise, x.reason)
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
    //* x 是一个对象或者函数
    if (isObject(x) || isFunction(x)) {
        let then
        let called = false
        if (isFunction(then)) {
            try {
                then.call(x, (y) => {
                    if (called) return
                    called = true
                    resolvePromise(promise, y)
                }, (r) => {
                    if (called) return
                    called = true
                    rejectedPromise(promise, r)
                })
            } catch (error) {
                if (called) return
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

function fulfilledPromise(promise, value) {
    if (promise.status !== statusMap.PENDING) return
    promise.status = statusMap.FULFILLED
    promise.value = value
    runCbs(promise.fulfilledCbs, value)
}

function rejectedPromise(promise, reason) {
    if (promise.status !== statusMap.PENDING) return
    promise.status = statusMap.REJECTED
    promise.reason = reason
    runCbs(promise.rejectedCbs, reason)
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

function runCbs(cbs, value) {
    cbs.forEach(cb => cb(value))
}

const statusMap = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
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
        }, (reason) => {
            rejectedPromise(this, reason)
        })
    }

    then(onFulfilled, onRejected) {
        const promise1 = this
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
                    const x = onRejected(promise1.reason)
                    resolvePromise(promise2, x)
                } catch (error) {
                    rejectedPromise(promise2, error)
                }
            }, 0)
        }
        if (promise1.status === statusMap.PENDING) {
            onFulfilled = isFunction(onFulfilled) ?
                onFulfilled :
                value => value

            onRejected = isFunction(onRejected) ?
                onRejected :
                err => {
                    throw err
                }

            promise1.fulfilledCbs.push(() => {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(promise1.value)
                        resolvePromise(promise2, x)
                    } catch (error) {
                        rejectedPromise(promise2, error)
                    }
                }, 0);
            })

            promise1.rejectedCbs.push(() => {
                setTimeout(() => {
                    try {
                        const x = onRejected(promise1.reason)
                        resolvePromise(promise2, x)
                    } catch (error) {
                        rejectedPromise(promise2, error)
                    }
                }, 0);
            })
        }
        return promise2
    }
}