//! Map 对比 Object  
//* Object '字符串--值'
//* Map    '值--值'  属于一种更完善的Hash 结构

const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')

//! Iterator

function makeIterator(arr) {
    let nextIndex = 0
    return {
        next: function() {
            return this.nextIndex < arr.length 
            ? { value: arr[nextIndex++], done: false }
            : { value: undefined, done: true}
        }
    }
}

//! ES6 规定，默认的Iterator 接口部署在数据结构的 Symbol.iterator 属性，或者说，一个数据结构只要具有 Symbol.iterator 属性，就可以认为 是 “可遍历的”
//? data structure  数据结构

let arr = [1, 2, 3]

let iter = arr[Symbol.iterator]()

iter.next()

let set = new Set().add('a').add('b').add('c');

let [x, ...y] = set;

function* createIterator() {
    let first = yield 1;
    let second;
    try{
        second = yield first + 6;
    } catch (e) {
        second = 6;
    }
    yield second + 3
}
let iterator = createIterator();

console.log(iterator.next()); 
console.log(iterator.next(10)); 