function remove(arr, item) {
    if (arr.length) {
        let index = arr.indexOf(item)
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}

//* Define a reactive property on an Object.
function defineReactive(obj, key, val) {
    if (typeof val === 'object') {
        new Observe(val)
    }
    let dep = new Dep()
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            dep.depend()
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

//* A dep is an observable that can have multiple
//* directives subscribing to it.
class Dep {
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
        const subs = this.subs.slice()
        for (let i = 0, l = subs.length; i < l; i++) {
            subs[i].update()
        }

    }

}

class Watcher {
    constructor (vm, expOrFn, cb) {
        this.vm = vm
        // 执行this.getter，读取data.a.b.c的内容
        this.getter= parsePath(expOrFn)
        this.cb = cb
        this.value = this.get()
    }
    get () {
        window.target = this
        let value = this.getter.call(this.vm, this.vm)
        window.target = undefined
        return value
    }
    update () {
        const oldValue = this.value
        this.value = this.get()
        this.cb.call(this.vm, this.value, oldValue)
    } 
}

//* 解析简单路径
const bailRE = /[^\w.$]/
function parsePath (path) {
    if (bailRE.test(path)) {
        return
    }
    const segments = path.split('.')
    return function (obj) {
        for (let i = 0; i < segments.length; i ++) {
            if (!obj) return
            obj = obj[segments[i]]
        }
        return obj
    }
}

//* 递归侦测所有key
class Observe {
    constructor(value) {
        
        this.value = value
        if (!Array.isArray(value)) {
            this.walk(value)
        }
    }
    walk(obj) {
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i], obj[keys[i]])
        }
    }
}
