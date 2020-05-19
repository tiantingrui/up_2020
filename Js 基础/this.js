//! 1. 在函数中使用this，指向global全局对象
function demo() {
    console.log(this);
}
// demo()

//! 2. 作为对象方法调用，this指代上级对象
let obj = {
    demo: demo
}
// obj.demo()

// function aa (arr) {
//     const id = arr ? arr.join() : 123
//     console.log(id);
// }

// let list = [4,5]
// aa(list)
// aa()

//! 3. 作为构造函数，this指代 new 出的实例对象
function P () {
    this.x = 1
}
let p1 = new P()
p1.x = 2
console.log('p1', p1.x); // p1  x


//! 4. call,apply,bind 方法作用是改变函数的调用对象，此方法的第一个参数为改变后调用这个函数的对象，this指代第一个参数
var x = 0;
function test(){
    alert(this.x);
}
var o={};
o.x = 1;
o.m = test;
o.m.apply(); //0

//! 5. es6 箭头函数 this 
/* 
一句话概括，es6箭头函数里的this指的是定义这个函数时外层代码的this，这句话可以从两个方面理解：

es6箭头函数没有自己的this
es6箭头函数里的this是外层代码（定义时，非执行时）this的引用 */


var Animal = function() {
    this.name = "Animal";
    this.speak = (words) => {
        console.log(this.name + ' is saying ' + words + '.');
    }
}
var cat = new Animal();
cat.speak("miao ~"); // Animal is saying miao ~.
var speak = cat.speak;
speak("miao ~"); // Animal is saying miao ~. In ES5, it should be undefined is saying miao~.
