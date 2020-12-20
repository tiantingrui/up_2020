# Vue3.0 新特性详解

兼容vue2



### 性能提升

+ 打包大小减少41%
+ 初次渲染快55%，更新快133%
+ 内存使用减少54% 

重写了 tree-shaking 的实现 以及 虚拟dom 的优化



### Composition API

+ ref & reactive
+ computed & watch
+ 新的生命周期函数
+ 自定义函数 - Hooks 函数



### 其他新增特性

+ Teleport - 瞬移组件的位置
+ Suspense - 异步加载组件的新福音
+ 全局API的修改和优化
+ 更多的实验性特性

### 更好的 TypeScript 支持

Vue2 对于 ts 的支持非常的有限





### vue-cli

```sh
# 安装
npm install -g @vue/cli
yarn global add @vue/cli
# > v4.5 即可享有 vue3

# 创建
vue create vue3-demo
```



### vscode 插件推荐

+ eslint
+ vetur



### ref的妙用

+ setup
+ ref



### computed

```vue
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>{{count}}</h1>
    <h1>{{double}}</h1>
    <button @click="increase">👍 +1</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    const count = ref(0)
    const double = computed(() => {
      return count.value * 2
    })
    const increase = () => {
      count.value++
    }
    return {
      count,
      double,
      increase
    }
  }
  
});
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```



### reactive

```vue
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>{{ data.count }}</h1>
    <h1>{{ data.double }}</h1>
    <button @click="data.increase">👍 +1</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from "vue";
interface DataProps {
  count: number,
  double: number,
  increase: () => void
}

export default defineComponent({
  name: "App",
  setup() {
    const data: DataProps = reactive({
      count: 0,
      increase: () => {data.count++},
      double: computed(() => data.count * 2)
    })
    return {
      data
    };
  },
});
</script>
```



### toRefs

```vue
setup() {
    const data: DataProps = reactive({
      count: 0,
      increase: () => {data.count++},
      double: computed(() => data.count * 2)
    })
    const refData = toRefs(data)
    return {
      ...refData
    };
  },
```





