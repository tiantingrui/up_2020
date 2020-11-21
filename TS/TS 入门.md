# TS 入门



## 了解基础类型









## 定义我们的类型

+ interfce 接口
+ class类
+ type 类型别名



#### 什么是泛型？

可以使用泛型来创建可重用的组件，

一个组件可以支持多种类型的数据

```ts
interface Generic<T> {
  attr: T
}
let x: Generic<number> = { attr: 1 }
```





## 类型的组合

+ 交叉类型（且）- Intersection Types 

  ```ts
  let x: A & B
  // x 同时具有 A + B 的能力
  ```

  

+ 联合类型（或）- Union Types

  ```ts
  let y : A | B
  // y 可能是A, 也可能是B， 共有的属性
  ```



#### 类型保护 与 区分类型

**联合类型使用时能确定是哪个类型吗？**

+ 类型断言



+ 通过 typeof \ instanceof 判断



+ 自定义类型保护



## 类型的推论



类型推论的2个规则

+ 最佳通用类型

  ```ts
  let x = ['x', 1, null] 
  // 推导出x的类型是 string | number | null 的数组
  ```

  

+ 上下文类型

  ```ts
  let y : {a : string} = {a: ''}
  let z = y.a
  // 推导出z 的类型是string
  ```



### 最后小结

+ 基础类型
  + 基础中的基础，必须熟练的掌握
+ 自定义接口
  + 如何自定义3者的区别
+ 类型组合
  + 交叉类型
  + 联合类型
+ 类型推论
  + 推论的2个原则

