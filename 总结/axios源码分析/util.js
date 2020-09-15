// Determine if a value is an Array
// @{params} val test value
// @{return} Boolean 
function isArray(val) {
    return toString.call(val) === '[object Array]'
}

/**
 * Iterate over an Array or an Object invoking a function for each item.(迭代数组或对象，为每个项调用函数。)
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
    // 空值判断
    if (obj === null || typeof obj === 'undefined') {
        return
    }

    // 判断是否为一个对象，如果不是将其变为数组, 使其iterable
    // Force an array if not already something iterable
    if (typeof obj !== 'object') {
        obj = [obj]
    }
    if (isArray(obj)) {
        // Iterate over array values (迭代数组值)
        for (var i = 0, l = obj.length; i < l; i++) {
            fn.call(null, obj[i], i, obj)
        }
    } else {
        // Iterate over object keys (迭代对象的keys)
        for (var key in obj) {
            //! hasOwnProperty() 方法返回一个Boolean,指示对象自身属性中是否具有指定的属性（非继承来的）
            if (Object.prototype.hasOwnProperty.call(obj.key)) {
                fn.call(null, obj[key], key, obj)
            }
        }
    }
}

const bind = require('./bind')

/* 
   将 b的属性拓展到 a 上面 （Extends object a by mutably adding to it the properties of object b.）
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArgs The object to bind function to
 * @return {Object} The resulting value of object a
*/

function extend(a, b, thisArg) {
    forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === 'function') {
            a[key] = bind(val, thisArg)
        } else {
            a[key] = val
        }
    })
    return a
}

// merge 合并对象的属性，相同的属性后面替换前面的
function merge( /* obj1, obj2, obj3, ... */ ) {
    var result = {};

    function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
            result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
            result[key] = merge({}, val);
        } else if (isArray(val)) {
            result[key] = val.slice();
        } else {
            result[key] = val;
        }
    }

    for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
    }
    return result;
}




module.exports = {
    forEach: forEach,
    extend: extend,
    merge: merge
}