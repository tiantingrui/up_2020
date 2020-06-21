# js 基础进阶&拾遗

**该章节补充主要从以下四个部分进行js基础拾遗**

1. **类型进阶**

2. **作用域**

3. **原型**

4. **函数进阶**

   

## 1.类型进阶

#### 主要内容：

+ 原始类型和对象类型的区别
+ 类型转换的场景和类型识别的方法
+ 模板字面量
+ Symbol



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

**比较原始类型是否相等，是比较它们的值**

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
```



