//! 1.实现一个 new 操作符 
/* 
 *   new 操作符做了哪些事情
 *   1. 创建了一个全新的对象
 *   2. 它的 `__proto__` 指向原型对象
 *   3. 它使this 指向了新创建的对象
 */

function ObjectFactory() {
    const obj = new Object()
    const Constructor = [].shift.call(arguments)

    obj.__proto__ = Constructor.prototype
    const ret = Constructor.apply(obj, arguments)
    return typeof ret === 'object' ? ret : obj
}

//! 2.实现一个call
/* 
 *   call 做了哪些事情
 *   1. 将函数设为对象的属性
 *   2. 执行 && 删除这个函数
 *   3. 指定this到函数并传入参数执行函数
 *   4. 如果不传入函数，默认指向window
 */
Function.prototype.myCall = function (context) {
    context.fn = this
    let args = []
    for (let i = 1; i < arguments.length; i++) {
        args.push(arguments[i])
    }
    context.fn(...args)
    let result = context.fn(...args)
    delete context.fn
    return result
}

//! 3.实现一个apply
/* 
 *   apply 的原理与call很相似，apply接收一个数组
 */
Function.prototype.myapply = function (context, arr) {
    let context = Object(context) || window
    context.fn = this

    let result
    if (!arr) {
        result = context.fn()
    } else {
        let args = []
        for (let i = 0; i < arr.length; i++) {
            args.push('arr[' + i + ']')
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn
    return result
}

//! 4.实现一个bind
/* 
 *   实现一个bind 要做哪些事情
 *   1. 返回一个函数、绑定this、传递预置参数
 *   2. bind返回的函数可以作为构造函数使用。故作为构造函数时应使得this失效，但是传入的参数依然有效
 */



//! 5. 实现 Object.create
/* 
 *   Object.create() 方法创建一个新对象，使用现有的对象来提供新创建的对象的 __proto__
 */

function create(proto) {
    function F() {}
    F.prototype = proto

    return new F()
}

//! 6. 防抖
/* 
 *   防抖函数原理：在事件被触发 n 秒后再执行回调，如果再这 n 秒内又被触发，则重新计时
 *   使用场景：
 *   1. 按钮提交场景：防止多次提交按钮，只执行最后提交的一次
 *   2. 服务端验证场景：表单验证需要服务端配合，只执行一段连续的输入事件的最后一次，还有搜索联想词功能类似
 */

const debounce = (fn, delay) => {
    let timer = null
    return (...args) => {
        if (timer) clearTimeout
        timer = setTimeout(() => {
            fn.call(this, args)
        }, delay)
    }
}

//! 7. 节流
/* 
 *   节流函数原理：规定再一个单位时间内，只能触发一次函数，如果这个单位时间内触发多次函数，只有一次生效
 *   使用场景：
 *   1. 拖拽场景：固定时间内只执行一次，防止超高频次触发位置变动
 *   2. 缩放场景：监控浏览器resize
 *   3. 动画场景：避免短时间内多次触发动画引起性能问题
 */

const throttle = (fn, delay) => {
    let flag = true
    return (...args) => {
        if (!flag) return
        flag = false
        setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

//! 8. 深拷贝（递归实现）
const deepClone = obj => {
    let newObj = Array.isArray(obj) ? [] : {}
    if (obj && typeof obj === 'object') {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] && typeof obj[key] === 'object') {
                    newObj[key] = deepClone(obj[key])
                } else {
                    newObj[key] = obj[key]
                }
            }
        }
    }
    return newObj
}

//! 浅拷贝
const shallowCopy = obj => {
    let rst = {}
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            rst[key] = obj[key]
        }
    }
    return rst
}
