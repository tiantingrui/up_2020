// //! 迭代器
// function createIterator(items) {
//     var i = 0;
//     return {
//         next: function() {
//             var done = i >= items.length;
//             var value = !done ? items[i++] : undefined
//             return {
//                 done,
//                 value
//             }
//         }
//     }
// }

// var iterator = createIterator([1, 2, 3])

// // console.log(iterator.next());
// // console.log(iterator.next());
// // console.log(iterator.next());
// // console.log(iterator.next());

// //! 生成器 Generator函数
// function* createGenerator() {
//     let first = yield 1;
//     let second = yield first + 2;
//     yield second + 3
// }
// let gen = createGenerator();

// let g1 = gen.next()  //* { value: 1, done: false }
// let g2 = gen.next(4) //* { value: 6, done: false }
// let g3 = gen.next(5) //* { value: 8, done: false }
// let g4 = gen.next() //* { value: undefined, done: true }

// function* generator1() {
//     yield 1;
//     yield 2;
// }

// function* generator2() {
//     yield 100;
//     yield* generator1();
//     yield 200;
// }

// let g = generator2()
// g.next() //? { value: 100, done: false }
// g.next() //? { value: 1, done: false }
// g.next() //? { value: 2, done: false }
// g.next() //? { value: 200, done: false }
// g.next() //? { value: undefined, done: true }

//! return(param)
// function* createIterator() {
//     yield 1;
//     yield 2;
//     yield 3;
// }
// let iterator = createIterator();

// iterator.next();
// iterator.return();
// iterator.next();

//! throw(param)
function* createIterator() {
    let first = yield 1;
    let second;
    try{
        second = yield first + 2;
    } catch (e) {
        second = 6;
    }
    yield second + 3
}
let iterator = createIterator();

console.log(iterator.next());   // { value: 1, done: false }
console.log(iterator.next(10));  // { value: 12, done: false }
console.log(iterator.throw(new Error('error'))); // { value: 9, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
