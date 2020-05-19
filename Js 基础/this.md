# this

> JavaScript 中 this 的指向



#### 1.在一般函数中，指向global全局对象

```js
function demo() {
    console.log(this);
}
demo()
```

+ 在浏览器环境中，指  **Window对象**
+ 在node 环境中，指 **Object [global]**



### 2.作为对象方法调用，this指代上级对象

```js
let obj = {
    demo: demo
}
obj.demo() // this 指向 obj
```



### 3.作为构造函数，this指代 new 出的实例对象

```js
function P () {
    this.x = 1
}
let p1 = new P()
p1.x = 2
console.log('p1', p1.x); // p1  x

```



### 4.call,bind,apply方法作用是改变函数的调用对象，此方法的第一个参数为改变后调用这个函数的对象，this指代第一个参数

**注意：apply()的参数为空时，默认调用全局对象。因此，这时的运行结果为0，证明this指的是全局对象。如果把最后一行代码修改为o.m.apply(o);//1**

```js
var x = 0;
function test(){
    alert(this.x);
}
var o={};
o.x = 1;
o.m = test;
o.m.apply(); //0
```



### 5.es6 的语法糖 箭头函数 this

**es6箭头函数里的`this`指的是定义这个函数时外层代码的`this`**

这句话可以从两个方面理解：

+ es6箭头函数没有自己的`this`
+ es6箭头函数里的`this`是外层代码（定义时，非执行时）`this`的引用

举个栗子：

```js
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
```

可以看到更改执行上下文，并没有影响到speak函数中的this指向。



参考：https://www.jianshu.com/p/6eedea4ea3d0