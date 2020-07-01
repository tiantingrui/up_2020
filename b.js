function A() {
    this.name = 'terry'
}

let a = new A()

console.log('A构造函数的 __proto__', A.__proto__)
console.log('A构造函数的 __proto__的constructor', A.__proto__.constructor)
console.log('A构造函数的 __proto__的constructor的__proto__', A.__proto__.constructor.__proto__)
console.log('A构造函数的 __proto__的constructor的prototype', A.__proto__.constructor.prototype)
console.log(`A构造函数的原型的原型`, A.__proto__.__proto__)
console.log(`A构造函数的原型的原型的构造函数`, A.__proto__.__proto__.constructor)
console.log(`A构造函数的原型的原型的原型`, A.__proto__.__proto__.__proto__)
console.log(`实例a 的 __proto__`, a.__proto__)
console.log(`实例a 的 __proto__的prototype`, a.__proto__.prototype)
console.log(`实例a 的 原型的原型`, a.__proto__.__proto__)
console.log(`实例a 的 原型的原型的原型`, a.__proto__.__proto__.__proto__)

console.log(a.constructor)

var a = 'terry'
