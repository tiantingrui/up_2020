//! Array的变化侦测

//* 拦截器
const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto);
['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
    //? 缓存原始方法
    const original = arrayProto[method]
    Object.defineProperty(arrayMethods, method, {
        value: function mutator (...args) {
            return original.apply(this, args)
        },
        enumerable: false,
        writable: true,
        configurable: true
    })
})

const hasProto = '__proto__' in {};
// console.log(hasProto)
const arrayKeys = Object.getOwnPropertyNames(arrayMethods);
// console.log('arrayKeys', arrayKeys)  



export class Observe {
    constructor (value) {
        this.value = value
        if (Array.isArray(value)) {
            const argument = hasProto
            ? protoAugment
            : copyAugment
            augment(value, arrayMethods, arrayKeys)
            // value.__proto__ = arrayMethods // 新增
        } else {
            this.walk(value)
        }
    }

    walk() {}
}

function protoAugment (target, src, keys) {
    target.__proto__ = src
}

function copyAugment (target, src, keys) {
    for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i]
        def(target, key, src[key])
    }
}