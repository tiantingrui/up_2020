//! Array的变化侦测

//* 拦截器
// const arrayProto = Array.prototype
// const arrayMethods = Object.create('arrayProto');
// ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
//     //? 缓存原始方法
//     const original = arrayProto[method]
//     Object.defineProperty(arrayMethods, method, {
//         value: function mutator (...args) {
//             return original.apply(this, args)
//         },
//         enumerable: false,
//         writable: true,
//         configurable: true
//     })
// })

// console.dir(Array);
// console.dir(Array.prototype);
console.log(Object.create());
// console.dir(Object.prototype);
