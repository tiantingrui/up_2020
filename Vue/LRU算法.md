# LRU算法

首先呢，为什么前端要学习LRU算法呢？

**在浏览器缓存淘汰策略中以及Vue 的 keep-alive 等等场景中都用到了这个LRU算法。**

那么你说它重不重要？

**这个也是前端技能的一大亮点**，在以后中当面试官在问到你前端开发中遇到过哪些算法，这是不是一个很好的骚操作。

那么我们接着来学习一下这个LRU算法吧。



### 了解LRU算法

LRU是**Least Recently Used** 的缩写，即最近最少使用，是一种常用的页面置换算法。选择最近最久未使用的页面予以淘汰。该算法赋予每个页面一个访问字段，用来记录一个页面自上次被访问以来所经历的时间 t，当须淘汰一个页面时，选择现有页面中其 t 值最大的，即最近最少使用的页面予以淘汰。



### 从浏览器缓存策略来讲解LRU算法原理

先举一个栗子来简单了解一下：

当我们访问一个网页时，打开很慢，但是在此打开这个网页的时候，打开就会很快。

**这就涉及到了：浏览器缓存。**

在我们打开一个网页的时候，比如`https:///juejin.im/timeline`，它会在发起真正地网络请求前，查询浏览器缓存，看是否有要请求的文件，如果有，浏览器将会拦截请求，返回缓存文件，并直接结束请求，不再去服务器上下载；如果不存在，才会去服务器请求。

浏览器中的缓存就是一种在本地保存资源的一个小仓库，仓库的容量是有限的，当我们请求过多时，仓库没有了空间之后，如果继续进行网络请求我们就需要将仓库中确定留下哪些缓存下来的数据，将哪些数据给送出仓库。**这就是浏览器缓存策略**

**常见的淘汰策略有：**

+ FIFO（先进先出）
+ LFU（最少使用）
+ LRU（最近最少使用）



#### LRU缓存淘汰策略

> LRU （ `Least Recently Used` ：最近最少使用 ）

根据数据的历史访问记录来进行淘汰数据，其核心思想是 **如果数据最近被访问过，那么将来被访问的几率也会更高，优点去淘汰最近没有被访问到的数据**

![LRU算法](D:\chromeDownloads\LRU算法.png)

我们看一下上面的图更加的清晰。



### keep-alive 如何运用 LRU

#### keep-alive

> 用于实现组件的缓存，当组件切换时不会对当前组件进行卸载
>
> 提升组件更新效率

```vue
<keep-alive>
    <component :is='currentComponent'></component>
</keep-alive>
```

**Props**:

| include     | 字符串或者正则表达式，只有名称匹配的组件会被缓存     |
| ----------- | ---------------------------------------------------- |
| **exclude** | **字符串或者正则表达式，任何名称匹配的组件会被缓存** |
| **max**     | **数字。最多可以缓存多少组件实例。**                 |

这个`max`属性，用于最多可以缓存多少组件实例，一旦超过上限，**在新实例被创建之前，已缓存组件中醉酒没有被访问的实例会被销毁掉，这里就用到了LRU算法**。



**我们来看一下keep-alive 实现的源码部分**

```js
export default {
  name: "keep-alive",
  // 抽象组件属性 ,它在组件实例建立父子关系的时候会被忽略,
  // 发生在 initLifecycle 的过程中
  abstract: true,
  props: {
    // 被缓存组件
    include: patternTypes,
    // 不被缓存组件
    exclude: patternTypes,
    // 指定缓存大小
    max: [String, Number]
  },
  created() {
    // 初始化用于存储缓存的 cache 对象
    this.cache = Object.create(null);
    // 初始化用于存储VNode key值的 keys 数组
    this.keys = [];
  },
  destroyed() {
    for (const key inthis.cache) {
      // 删除所有缓存
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },
  mounted() {
    // 监听缓存（include）/不缓存（exclude）组件的变化
    // 在变化时，重新调整 cache
    // pruneCache：遍历 cache，
    //   如果缓存的节点名称与传入的规则没有匹配上的话，
    //   就把这个节点从缓存中移除
    this.$watch("include", val => {
      pruneCache(this, name => matches(val, name));
    });
    this.$watch("exclude", val => {
      pruneCache(this, name => !matches(val, name));
    });
  },
  render() {
    // 获取第一个子元素的 vnode
    const slot = this.$slots.default;
    const vnode: VNode = getFirstComponentChild(slot);
    const componentOptions: ?VNodeComponentOptions =
      vnode && vnode.componentOptions;
    if (componentOptions) {
      // name 不在 inlcude 中或者在 exlude 中则直接返回 vnode，
      // 否则继续进行下一步
      // check pattern
      const name: ?string = getComponentName(componentOptions);
      const { include, exclude } = this;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode;
      }
      
      const { cache, keys } = this;
      // 获取键，优先获取组件的 name 字段，否则是组件的 tag
      const key: ?string =
        vnode.key == null
          ? // same constructor may get registered as
            // different local components
            // so cid alone is not enough (#3269)
            componentOptions.Ctor.cid +
            (componentOptions.tag ? `::${componentOptions.tag}` : "")
          : vnode.key;
        
      // --------------------------------------------------
      // 下面就是 LRU 算法了，
      // 如果在缓存里有则调整，
      // 没有则放入（长度超过 max，则淘汰最近没有访问的）
      // --------------------------------------------------
      // 如果命中缓存，则从缓存中获取 vnode 的组件实例，
      // 并且调整 key 的顺序放入 keys 数组的末尾
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      }
      // 如果没有命中缓存,就把 vnode 放进缓存
      else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        // 如果配置了 max 并且缓存的长度超过了 this.max，还要从缓存中删除第一个
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }
      
      // keepAlive标记位
      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0]);
  }
};

// 移除 key 缓存
function pruneCacheEntry (
  cache: VNodeCache,
  key: string,
  keys: Array<string>,
  current?: VNode
) {
  const cached = cache[key]
  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy()
  }
  cache[key] = null
  remove(keys, key)
}

// remove 方法（shared/util.js）
/**
 * Remove an item from an array.
 */
exportfunction remove (arr: Array<any>, item: any): Array<any> | void {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}
```

在 `keep-alive` 缓存超过 `max` 时，使用的缓存淘汰算法就是 LRU 算法，它在实现的过程中用到了 `cache` 对象用于保存缓存的组件实例及 `key` 值，`keys` 数组用于保存缓存组件的 `key` ，当 `keep-alive` 中渲染一个需要缓存的实例时：

- 判断缓存中是否已缓存了该实例，缓存了则直接获取，并调整 `key` 在 `keys` 中的位置（移除 `keys` 中 `key` ，并放入 `keys` 数组的最后一位）
- 如果没有缓存，则缓存该实例，若 `keys` 的长度大于 `max` （缓存长度超过上限），则移除 `keys[0]` 缓存



### 看leetcode关于LRU算法题

> leetcode 链接：https://leetcode-cn.com/problems/lru-cache/

**题目：**

运用你所掌握的数据结构，设计和实现一个  LRU (最近最少使用) 缓存机制。它应该支持以下操作： 获取数据 get 和 写入数据 put 。

获取数据 get(key) - 如果关键字 (key) 存在于缓存中，则获取关键字的值（总是正数），否则返回 -1。
写入数据 put(key, value) - 如果关键字已经存在，则变更其数据值；如果关键字不存在，则插入该组「关键字/值」。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。

**进阶:**

你是否可以在 **O(1)** 时间复杂度内完成这两种操作？

**示例：**

```
LRUCache cache = new LRUCache( 2/* 缓存容量 */ );

cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // 返回  1
cache.put(3, 3);    // 该操作会使得密钥 2 作废
cache.get(2);       // 返回 -1 (未找到)
cache.put(4, 4);    // 该操作会使得密钥 1 作废
cache.get(1);       // 返回 -1 (未找到)
cache.get(3);       // 返回  3
cache.get(4);       // 返回  4
```

我们先来思考，后面揭晓答案！

