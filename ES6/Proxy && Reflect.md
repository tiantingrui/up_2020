# Proxy && Reflect

> 深入学习Proxy 的目的就是因为 Vue3 的响应式原理是基于 Proxy 实现的



首先呢，我们要理清楚这样的一件事情，vue作者为什么在写vue3响应式原理的时候会将Proxy代替vue2中的Object.defineProperty

对比一下（**监听性能消耗**）

| Object.definProperty() | 只能一个属性一个属性的去监听 |
| ---------------------- | ---------------------------- |
| **Proxy**              | **可以监听一整个对象**       |

+ **Object.defineProperty只可以一个属性一个属性的监听，也就是说，对于date对象，需要进行深度遍历，去监听每一个属性的变化，而一旦我们对data一个比较深的对象直接修改它的值，那么就又得对其进行重新地遍历，会非常损耗性能。**

+ **反观，proxy可以监听一整个对象，且基于proxy监听，只有当一个数据被用到的时候，才会去监听它，所以就会避免上面的问题，在监听上面就会大大的降低性能的消耗**