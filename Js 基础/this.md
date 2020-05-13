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



### 3.作为构造函数