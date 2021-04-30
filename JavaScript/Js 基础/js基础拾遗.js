// function Foo() {}
// function Bar() {}
// Bar.prototype = new Foo()
// new Bar() instanceof Bar // true
// new Bar() instanceof Foo // true

// let a = []
// a instanceof Array // true
// a instanceof Object // true
// Array instanceof Object // true

// Object.prototype.toString.call(o) // 检测对象的内部属性[[class]]
function getType(o) {
    return Object.prototype.toString.call(o)
}
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

`string text`

`string text line1
string text line2`

`my name is ${aa}`

var multiLineStr = '' + 
`<pre>` + 
`<span>aaaa</span>` +
`<pre>`
