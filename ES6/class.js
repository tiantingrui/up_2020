class Point {

}
typeof Point // function
//! 三位一体，构造函数的prototype 指向原型对象，原型对象的constructor 指向构造函数
Point === Point.prototype.constructor  // true

class B {}
let b = new B();

console.log(b.constructor);
console.log(B.prototype.constructor);
console.log(B.constructor);
console.log(B['__proto__']);





