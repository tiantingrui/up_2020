function A() {
    this.name = 'terry'
}

let a = new A()

// console.log('A构造函数的 __proto__', A.__proto__)
// console.log('A构造函数的 __proto__的constructor', A.__proto__.constructor)
// console.log('A构造函数的 __proto__的constructor的__proto__', A.__proto__.constructor.__proto__)
// console.log('A构造函数的 __proto__的constructor的prototype', A.__proto__.constructor.prototype)
// console.log(`A构造函数的原型的原型`, A.__proto__.__proto__)
// console.log(`A构造函数的原型的原型的构造函数`, A.__proto__.__proto__.constructor)
// console.log(`A构造函数的原型的原型的原型`, A.__proto__.__proto__.__proto__)
// console.log(`实例a 的 __proto__`, a.__proto__)
// console.log(`实例a 的 __proto__的prototype`, a.__proto__.prototype)
// console.log(`实例a 的 原型的原型`, a.__proto__.__proto__)
// console.log(`实例a 的 原型的原型的原型`, a.__proto__.__proto__.__proto__)

// console.log(a.constructor)






const statusMap = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
}

function resolvePromise(promise, x) {
    if (x === promise) {
        rejectedPromise(promise, new TypeError(`cant be the same`))
        return
    }
    if (isPromise(x)) {
        if (x.status === statusMap.FULFILLED) {
            fulfilledPromise(promise, x.value)
            return
        }
        if (x.status === statusMap.REJECTED) {
            rejectedPromise(promise, x.reason)
            return
        }
        if (x.status === statusMap.PENDING) {
            x.them(() => {
                fulfilledPromise(promise, x.value)
            }, () => {
                rejectedPromise(promise, x.reason)
            })
            return
        }
        return
    }
    if (isFunction(x) || isObject(x)) {
        let then
        let called = false
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
    runCbs(promise.rejectedCbs, reason)
}

function runCbs(cbs, value) {
    cbs.forEach(cb => {
        cb(value)
    })
}

function isFunction(fn) {
    return Object.prototype.toString.call(fn).toLocaleCase() === '[object function]'
}
function isObject(obj) {
    return Object.prototype.toString.call(obj).toLocaleCase() === '[object object]'
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
        }, (reason) => {
            rejectedPromise(this, reason)
        })
    }

    then(onFulFilled, onRejected) {
        const promise1 = this
        const promise2 = new Promise(() => {})
        if (promise1.status === statusMap.FULFILLED) {
            if (!isFunction(onFulFilled)) {
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
            onFulFilled = isFunction(onFulfilled) ? onFulfilled : value => value
            onRejected = isFunction(onRejected) ? onRejected : err => {throw err}

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
                    }, 0);
                }
            })
        }
        return promise2
    }
}

const obj1 = {
    name: 'zmn',
    say() {
        return this.name
    }
}

class B {
    constructor() {
        this.name = 'terry'
        return obj1
    }
    say() {
        return 'hello' + this.name
    }
}

let b = new B()

console.log(b.say())

/**
 *降频函数
 *这个 debounce 函数在给定的时间间隔内只允许你提供的回调函数执行一次，以此降低它的执行频率。
 *调用:	debounce(function() {}, 250) 
 * @param {*} func回调函数
 * @param {*} wait等待时间,推荐250
 * @param {*} immediate
 * @returns
 */
function debounce(func, wait, immediate) {
    var timeout
    return function() {
        var context = this, args = arguments
        var later = function() {
            timeout = null
            if (!immediate) func.apply(context, args)
        }
        var callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
    }
}

const throttle = function(fn, delay) {
    let timer 
    return function () {
        if (timer) {
            return 
        }
        timer = setTimeout(() => {
            fn()
        }, delay)
    }
}