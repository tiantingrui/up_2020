# vue练习



+ `单选`以下哪个说法错误？

A. v-show 基于 CSS 的 “display” 属性进行切换

B. v-if 是真正的条件渲染

C. v-if  确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重

D. v-show 是惰性的

```txt
解析：(D)
v-if 是惰性的，如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。所以 D是错误的
```



+ `单选` 以下说法哪个是错误的？

A. vue 中的数据默认是单向数据流的

B.  vue 中的数据默认是双向绑定的

C.  vue 中的双向绑定是语法糖

D. vue 中可以通过v-model实现双向绑定

```txt
解析：(B)
vue中的数据流向默认是单向数据流的，而双向绑定只是语法糖，所以B是错误的
```



+ `单选` 以下说法哪个是错误的？

A.  computed是计算属性，依赖其它属性值进行计算

B. computed 的值有缓存，只有它依赖的属性值发生改变，可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算

C.  可以利用 watch 的缓存特性，避免每次获取值时，都要重新计算

D.  当我们需要在数据变化时执行异步或开销较大的操作时，应该使用 watch

```txt
解析：(C)
computed有缓存特性，而watch没有，可以利用computed的缓存特性来缓存要使用的常量。
```



+ `单选` Vue 2.0 以下哪种方法不能检测到数据变化?

```js
vm = new Vue({
    data: {
        a: 1,
        b: []
    }
})
```

A.  vm.a = 3;

B. vm.b = null;

C. vm.b[0] = 1;

D.  vm.b.push(1);

```txt
解析：(C)
c是新增了一个数据，而vue2.0中使用object.defineproperty只能监听到数据的get,set操作，不能监听到增删操作，故选C
```



+ `单选`  以下哪个生命周期钩子函数会在vue2.0 ssr被调用 ?

A.  created

B.  mounted

C.  update

D. destroyed

```txt
解析：(A)
只有created和beforeCreated在vue2.0的ssr中会被调用
```

+ `单选` 以下哪个生命周期钩子函数中可以访问dom结构？

A. created

B. beforeCreate

C. mounted

D. beforeMount

```txt
解析：(C)
只有在模板生成完毕，以及mounted生命周期钩子中才能获取模板的dom结构。选C
```

+ `单选` kkep-alive 中的缓存淘汰用到以下哪个算法？

A. LRU

B. LFU

C. FIFO

D. LIFO

```txt
解析：(A)
keep-alive 组件中使用的是LRU的淘汰算法, 所以选A
```



+ `单选` vue 中的 provide / inject 是属于以下哪个api实现的？

A. $emit / $on

B. $parent / $children

C. $attrs / $listeners

D.  props / $emit

```txt
解析：(B)
在课程依赖注入相关的内容中，介绍过provide/inject是基于$parent来实现的, 所以选B
```



+ vuex中通过以下哪种方式去发送异步操作

A. action

B. mutation

C. state

D. getter

```txt
解析：(A)
vuex中的异步数据操作均需要让在action中，所以选A
```

+ `单选` 以下哪种组件之间的通信方式有比较低的耦合性？

A. props / $emit

B. provide / inject

C. $parent / $children

D. EventBus

```txt
解析：(D)
课程中介绍过 a、c选项中父子组件是强的依赖关系，而b是基于c实现的，耦合度都比较高。 而 d 的eventbus相对是一个订阅发布的模式，有比较低的耦合性，故选D
```



+ `多选`  vue-router 主要有哪几种模式？

A. hash

B. history

C. abstract

D. normal

```txt
解析：(A,B,C)
vue-router 有 3 种路由模式：hash、history、abstract。hash: 使用 URL hash 值来作路由。支持所有浏览器；history : 依赖 HTML5 History API 和服务器配置；abstract : 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式.
```



+ `多选` 以下关于虚拟dom的说法正确的是？

A. 使用虚拟DOM从而使我们得业务逻辑具备跨平台的能力

B. 使用虚拟DOM，不再需要手动去操作DOM，提高开发效率

C. 使用虚拟DOM能够保证性能的下限，也即由框架解决了DOM操作的性能问题

D. 无法进行极致的性能优化

```txt
解析：(A,b,C,D)
使用虚拟 DOM 从而使我们的业务逻辑具备跨平台的能力，使开发者不再需要手动去操作 DOM， 提高开发效率，保证性能的下限，同时开发者无法进行极致的性能优化。故选a/b/c/d
```



+ `多选` vue 中的 key 以下说法正确的是？

A.  使用v-for 的时候必须 v-bind:key

B.  key只能和v-for 一起使用

C.  key 能提高diff的效率

D.  vue2.0中的key 只要在diff过程中的双指针都失效的情况才发挥作用

```txt
解析：(A,C,D)
vue中的key可以独立于v-for使用，是为了帮助提升diff过程效率的存在，故以上所发只有b是不正确的。
```



+ `多选` vue3.0使用proxy 替换Object.defineproperty 的原因是？

A.  使用 Object.defineproperty 无法拦截到数组长度的改变

B.  使用 Object.defineproperty 无法拦截到数组原型方法push、pop等对数组的改变

C.  使用 Object.defineproperty 无法拦截到数组中内容的改变

D.  使用 Object.defineproperty 无法拦截到数据的新增和删除操作

```txt
解析：(A,B,D)
Object.defineproperty可以用于描述一个数组的下标形式，如 var x = 3; var m = Object.defineProperty([], 0, { get(){ return x; }, set(z){ x = z; }}); m[0]; // log 11
```



+ `多选` vue ssr 中有哪些方式能帮助我们提升页面访问性能？

A. renderToStream

B. LRUcache

C. prerendering

D. prefetch

```txt
解析：(A,B,C,D)
课程介绍过以上几种方式均能提升同构应用的性能
```

