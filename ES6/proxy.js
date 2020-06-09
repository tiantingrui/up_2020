/*
 * @Author: terry 
 * @Date: 2020-05-21 08:44:02 
 * @Last Modified by: terry
 * @Last Modified time: 2020-06-01 16:40:18
 */

//! Proxy

let person = {
    name: 'terry'
}

let proxy = new Proxy(person, {
    get(target, propKey) {
        if (propKey in target) {
            return target[propKey]
        } else {
            throw new ReferenceError("Prop name \"" + propKey + "\" does not exist.");
        }
    }
})

console.log('name' in person);

