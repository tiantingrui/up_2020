## underscore代码组织结构

https://underscorejs.bootcss.com/#map

#### underscore为数不多的亮点

+ 链式语法

```js
语法风格  
  数据源	迭代器函数   对象   静态方法
_.map([1, 2, 3], function(num){ return num * 3; });
=> [3, 6, 9]
  数据源	迭代器函数   函数  实例对象的方法
_([1,2,3]).map(function(num){ return num * 3; })

函数就是一个对象

构造函数  _() 创建实例对象 无new化的构建方式

```

