# js 基础进阶&拾遗

**该章节补充主要从以下四个部分进行js基础拾遗**

1. **类型进阶**

2. **作用域**

3. **原型**

4. **函数进阶**

   

## 1.类型进阶

#### 主要内容：

+ 原始类型和对象类型的区别
+ 类型识别的方法
+ 模板字面量



#### 01. 原始类型和对象类型的区别

+ **原始类型**

**原始类型的值无法更改**

```js
var a = 'abc'
a[1] = 'a'
console.log(a) // abc

var s = 'ABC'
s.toLowerCase('')
console.log(s) // ABC
```

**原始类型相等比较**

> **比较原始类型是否相等，是比较它们的值**

```js
var m1 = 123
var n2 = Number(123)
console.log(n1 === n2) // true

var s1 = 'abc'
var s2 = String('ab c')
console.log(s1 === s2) // false
```

+ **对象类型**

**对象类型的值是可以修改的**

```js
var o = {x: 1}
o.x = 2
o.y = 3
console.log(o) // {x: 2, y: 3}
delete o.x
console.log(o) // {y: 3}

 var a = [1, 2, 3]
 a[1] = 4
console.log(a) // [1, 4, 3]
```

**对象类型相等比较**

> **比较对象是否相等，不是比较它们的值**

```js
var o1 = {x： 1}， o2 = {x: 1}
var a1 = [1, 2, 3], a2 = [1, 2, 3]
console.log(o1 === o2) // false
console.log(a1 === a2) // false
```

**对象类型，也叫做引用类型**

> 当给一个变量赋值为对象时，该变量保存的是该对象在内存中的地址

**故对象的比较是在比较引用地址：当且仅当它们的引用的是同一个对象时，它们才相等**

```js
var o1 = {x: 1}
var o2 = o1
o2.y = 2
console.log(o1.y) // 2
console.log(o1 === o2) // true
```

**复制变量的值**

想复制某个变量的值。只要将他赋值给另外一个变量（或是某个对象的属性）。复制原始类型和对象类型有所不同。

**复制原始类型的变量的值时，会将值拷贝一份，和原来的值是相互独立的。**

**复制对象类型的变量的值时，会将存储在变量中的值拷贝一份，拷贝的是其引用，它们两个指向同一个对象**



#### 02.类型识别

##### typeof

+ 可以使用`typeof` 操作符来检测变量的数据类型
+ `typeof`在判断对象类型时有局限性

```js
let d = new Date()
let a = []
let n = null
let r = /\d+/
typeof d // object
typeof a // object
typeof n // object
typeof r // object
```

##### instanceof

> obj instanceof constructor
>
> 判断变量是否是给定类的实例

```js
let d = new Date()
let a = []
let n = null
let r = /\d+/

d instanceof Date  // true
a instanceof Array  // true
n instanceof Object  // true
r instanceof RegExp  // true

function Foo() {}
function Bar() {}
Bar.prototype = new Foo()
new Bar() instanceof Bar // true
new Bar() instanceof Foo // true

let a = []
a instanceof Array // true
a instanceof Object // true
Array instanceof Object // true
```

##### Object.prototype.toString.call(obj)

> 可以检测对象的内部属性[[class]]

```js
function getType(o) {
    return Object.prototype.toString.call(o)
}
let d = new Date()
let a = []
let r = /\d+/

console.log(getType(d)) // [object Date]
console.log(getType(a)) // [object Array]
console.log(getType(r)) // [object RegExp]
```

```js
let d = new Date()
let a = []
let r = /\d+/

function getTypeInner(o) {
    return Object.prototype.toString.call(o).slice(8, -1)
}

function Foo() {}
console.log(getTypeInner(d)) // Date
console.log(getTypeInner(a)) // Array
console.log(getTypeInner(r)) // RegExp
console.log(getTypeInner(new Foo())) // Object
```

**类型识别总结**

| 方法                      | 总结                                               |
| ------------------------- | -------------------------------------------------- |
| typeof                    | 无法检测具体的对象类型，适合检测变量是否定义       |
| instanceof                | 无法检测原始类型，跨frame失效                      |
| constructor               | 不检查原型链，无法检测null和undefined              |
| Object.prototype.toString | 可以检测所以原生对象，无法识别自定义对象的具体类型 |

**检测数组的原生方法**

`Array.isArray()`

```js
Array.isArray([]) // true
Array.isArray([1]) // true
Array.isArray(new Array()) // true
// Array.prototype 也是一个数组
Array.isArray(Array.prototype) // true
```



#### 03.模板字面量

+ 模板字面量允许嵌入表达式的字符串字面量。可以使用多行字符串和字符串插值功能

```js
`string text`

`string text line1
string text line2`

`my name is ${aa}`

var multiLineStr = '' + 
`<pre>` + 
`<span>aaaa</span>` +
`<pre>`
```

+ 支持所有合法的JavaScript表达式，函数调用等

```js
let getName = () => {
    return 'terry'
}
console.log(`my name is ${getName()}`)
```

+ 插值表达式支持嵌套

```js
const classes = `header ${ isLargeScreen()
	? ''
	: `icon-${(isA ? 'A' : 'B')}`
}`
```

+ 原始字符串值（raw value）

`String.raw`

```js
let message1 = 'Multuline\nsting'
// 'Multiline
// string'
let message2 = String.raw'Multuline\nsting' // 'Multuline\nsting'
```



## 2. 作用域

#### 作用域分类

+ 静态作用域

> 也叫此法作用域。代码写完后，变量的作用域就已确定不变

+ 动态作用域

> 代码写完后，变量的作用域无法确定，它和调用它所在的函数有关

```js
// 作用域示例（JavaScript） 静态作用域
let x = 10
function f() {
    return x;
}
function g() {
    let x = 20
    return f();
}
console.log(g()) // 10
```



#### 声明提前（hoisting）

+ 函数作用域

使用`var`声明的变量在声明它的函数体以及该函数体中的嵌套函数体内都是可以访问的

```js
var x = 5
function f() {
    var y = 10
    console.log(x, y) // 5, 10
    function g() {
        var z = 15
        console.log(x, y, z) // 5, 10, 15
    }
    g()
}
f()
```

函数内所有使用`var`声明的变量在函数体内可见。这意味着变量在声明之前就已经可用，这个特性就叫做 **声明提前**，即函数中的所有变量及函数声明都会提升至函数体的顶部

```JS
var x = 5
function f() {
    // undefined 声明提前，但赋值不会
    var x = 10
}

// 等同于
function f() {
    var x
    console.log(x)
    x = 10
}
```

**函数声明提前**

```js
function f() {
    x()
    function x() {
        console.log(1)
    }
}
f()
```

```js
function f() {
    x()
    var x = function() {
        console.log(1)
    }
}
f()
```

**变量声明和函数声明的提升优先级**

函数声明提前高于变量声明提前

```js
var double = 22
function double(num) {
    return num * 2
}
console.log(typeof double) // 'number'

// 上述代码等同于
function double(num) {
	return num * 2    
}
double = 22
console.log(typeof double) // 'number'
```



#### 块级作用域

是指变量在指定块的作用域外部无法被访问，语法和var语句一样，只是它使用let 和 const 来声明

```js
let y = 1
if (true) {
    var x = 2,
    let y = 2
}
console.log(x) // 2
console.log(y) // 2
```

**块级作用域：禁止重复声明**（let 和 const 不可重复声明变量，会报语法错误）

```js
var x = 1;
let x = 2 // 'x' has already been declared
```

**const声明的原始类型是常量，之后不可以更改；声明的对象类型变量，变量本身无法赋值为其他类型，但它的属性可以修改**

```js
const x = 1
x = 2  // TypeError: Assignment to constant variable. 
```

```js
const x = {}
x.age = 23
```

**暂时性死区**

```js
var x = 1
if (true) {
    // x is not defined 
    console.log(x)  // x 的暂时性死区，这个区域中的所有代码不可以访问x
    let x = 2
}
```



#### 最佳实践

1. 优先使用const
2. 如果之后会改变，则使用let
3. 避免使用var



#### 作用域链

```js
var x = 5
function f() {
    var y = 10
    console.log(x, y) // x 是全局作用域， y 是 f 的作用域
    function g() {
        var z = 15
        console.log(x, y, z) // x 是全局作用域，y 是 f 的作用域 ，z 是 g的作用域
    }
    g()
}
f()
```

在js的最顶层代码中，作用域由一个全局对象组成，这个全局对象可以通过**this**访问到。



## 3. 原型

