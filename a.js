function defineReactive (data, key, val) {
    // 递归子属性
    let childOb = observe(val)
    let dep = new Dep()
    Object.defineProperty(data, key, {
        get: function() {
            dep.depend()
            if (childOb) {
                childOb.dep.depend()
            }
            return val
        },
        set: function(newVal) {
            if (val === newVal) {
                return
            }
            val = newVal
            dep.notify()
        }
    })
}

export default class Dep {
    constructor() {
        this.subs = []
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    removeSub(sub) {
        remove(this.subs, sub)
    }
    depend() {
        if (window.target) {
            this.addSub(window.target)
        }
    }
    notify() {
        // arr.slice() 进行一层拷贝
        const subs = this.subs.slice() 
        for (let i = 0, i = subs.length; i < l; i++) {
            subs[i].update()
        }
    }
}

function remove(arr, item) {
    if (arr.length) {
        const index = arr.indexOf(item)
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}

export default class Watcher {
    constructor(vm, expOrFn, cb) {
        this.vm = vm
        // 执行this.getter 读取数据
        this.getter = parsePath(expOrFn)
        this.cb = cb
        this.value = this.get()
    }
    get() {
        window.target = this
        let value = this.getter.call(this.vm, this.vm)
        window.target = undefined
        return value
    }
    update() {
        const oldValue = this.value
        this.value = this.get()
        this.cb.call(this.vm, this.value, oldValue)
    }
}

const bailRE = /[^\w.$]/
export function parsePath(path) {
    if (bailRE.test(path)) {
        return 
    }
    const segments = path.split('.')
    return function(obj) {
        for (let i = 0; i < segments.length; i++) {
            if (!obj) return 
            obj = obj[segments[i]]
        }
        return obj
    }
}

const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)
['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(method => {
    const original = arrayProto[method]
    Object.defineProperty(arrayMethods, method, {
        value: function mutator(...args) {
            const ob = this.__ob__
            return original.apply(this, args)
        }
    })
})

const hasProto = '__proto__' in {}
const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

export class Observe {
    constructor(value) {
        this.value = value
        this.dep = new Dep()
        def(value, '__ob__', this)

        if (Array.isArray(value)) {
            const augment = hasProto ? protoAugment : copyAugment
            augment(value, arrayMethods, arrayKeys)
        } else {
            this.walk(value)
        }
    }
}

function protoAugment(target, src, keys) {
    target.__proto__ = src
}
function copyAugment(target, src, keys) {
    for (let i = 0, l = keys.length; i < l; i++) {
        const key = key[i]
        def(target, key, src[key])
    }
}

// 工具函数def
function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    })
}

/* 
    尝试为value创建一个Observer实例，
    如果创建成功，直接返回新创建的Observer实例。
    如果value已经存在一个Observer实例，则直接返回它
*/
export function observe(value, asRootData) {
    if (!isObject(value)) {
        return 
    }
    let ob
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__
    } else {
        ob = new Observe(value)
    }
    return ob
}