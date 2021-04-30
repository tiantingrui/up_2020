// js new操作符都干了些什么?

/*  1. 新生成了一个对象
    2. 将该对象的__proto__ 链接到了原型对象上面
    3. 绑定this 到生成的这个新对象上
    4. 返回这个新对象 
*/

function create(Con, ...args) {
    let obj = {}
    Con = [].shift.call(arguments)
    Object.setPrototypeOf(obj, Con.prototype)
    let result = Con.apply(obj, args)
    return result instanceof Object ? result : {}
}

function Test(name, age) {
    this.name = name 
    this.age = age
}
Test.prototype.sayName = function() {
    console.log(this.name)
}

const a = create(Test, 'terry', 24)
console.log('a', a)

