let isObject = obj => typeof obj === 'object' && obj !== null;
let deepClone = (source, hash = new WeakMap()) => {

    if (!isObject(source)) return source // 非对象返回自身
    if (hash.has(source)) return hash.get(source) // 新增检测, 查哈希表
    let target = Array.isArray(source) ? [] : {}
    hash.set(source, target) // 设置哈希表值
    for (let key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = isObject(source[key]) ? deepClone(source[key], hash) : source[key]; // 传入哈希表
        }
    }
    return target
}
let obj = {
    a: 1,
    b: {
        c: 2,
        d: 3
    }
}
obj.a = obj.b;
obj.b.c = obj.a;
let clone_obj = deepClone(obj)
console.log(clone_obj)