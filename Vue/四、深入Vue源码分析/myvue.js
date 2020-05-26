function myVue(params) {
    
}

// remove an item from am array
function remove(arr, item) {
    if (arr.length) {
        let index = arr.indexOf(item)
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}

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
        if (Dep.target) {
            Dep.target.addDep(this)
        }
    }
    notify() {
        const subs = this.subs.slice()
        for (let i = 0, l = subs.length; i < l; i++) {
            subs[i].update();
        }
    }

}

class Observer {
    constructor(value) {
        this.value = value
        if (!Array.isArray(value) ) {
            this.walk(value)
        }
    }
    walk(obj) {
        const keys = Object.keys(obj)
        for (let i =0; i < keys.length; i++) {
            defineReactive(obj, keys[i], obj[keys[i]])
        }
    }

}

// Define a reactive property on an Object.
function defineReactive(obj, key,val) {
    // 新增，递归子属性
    if (typeof val === 'object') {
        new Observer(val)
    }
    let dep = new Dep()
    let property = Object.getOwnPropertyDescriptor(obj, key) 
    if (property && property.configurable === false) {
        return
    }
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get() {
            dep.depend()
            return value
        },
        set(newVal) {
            if (newVal === value) {
                return
            }
            val = newVal
            dep.notify()
        }
    })
}

let o = { age: 42 }
let d = Object.getOwnPropertyDescriptor(o, 'age')
// console.log(d);
let arr = [1, 2, 3]
const arr1 = arr.slice()
console.log(arr1);