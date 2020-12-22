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



### watch

```js
// watch 简单应用
watch(data, () => {
  document.title = 'updated ' + data.count
})
// watch 的两个参数，代表新的值和旧的值
watch(refData.count, (newValue, oldValue) => {
  console.log('old', oldValue)
  console.log('new', newValue)
  document.title = 'updated ' + data.count
})

// watch 多个值，返回的也是多个值的数组
watch([greetings, data], (newValue, oldValue) => {
  console.log('old', oldValue)
  console.log('new', newValue)
  document.title = 'updated' + greetings.value + data.count
})

// 使用 getter 的写法 watch reactive 对象中的一项
watch([greetings, () => data.count], (newValue, oldValue) => {
  console.log('old', oldValue)
  console.log('new', newValue)
  document.title = 'updated' + greetings.value + data.count
})
```



### 自定义 hook

封装一个用户鼠标点击页面的位置

+ ref 方法的实现

```ts
// hooks/useMouseTracker

import {ref} from 'vue'

export default function useMouseTracker() {
  const x = ref(0)
  const y = ref(0)
  const updatePosition = (e: MouseEvent) => {
    x.value = e.pageX
    y.value = e.pageY
  }
  onMount(() => {
    documnet.addEventListener('click', updatePosition)
  })
  onUnMount(() => {
    document.removeEventListener('click', updatePosition)
  })
  return {x, y}
}
```

+ reactive & toRefs 实现

```ts
import { onMounted, onUnmounted, reactive, toRefs} from 'vue'

// 将组件内逻辑抽象成复用的函数
export default function useMouseTracker() {
    const data = reactive({
        x: 0,
        y: 0
    })
    const updatePosition = (e: MouseEvent) => {
        data.x = e.pageX
        data.y = e.pageY
    }
    onMounted(() => {
        document.addEventListener('click', updatePosition)
    })
    onUnmounted(() => {
        document.removeEventListener('click', updatePosition)
    })
    const refsData = toRefs(data)
    return {
        ...refsData
    }
}
```



### useUrlLoader

需求：异步获取一张图片

api链接：https://dog.ceo/api/breeds/image/random

返回数据结构

```json
{
    "message": "https://images.dog.ceo/breeds/coonhound/n02089078_243.jpg",
    "status": "success"
}
```

安装axios 

```sh
npm install axios --save
```

实现自定义hook

```ts
// hooks/useUrlLoader.ts
import {ref} from 'vue'
import axios from 'axios'

export default function useUrlLoader(url: string) {
  const result = ref(null)
  const loading = ref(true)
  const loaded = ref(true)
  const error = ref(null)
  
  axios.get(url)
  	   .then((rawData) => {
    			loading.value = false
    			loaded.value = true
    			result.value = rawData.data
  			})
  			.catch(e => {
    			error.value = e
    			loading.value = false
  			})
  
  return {
    result,
    loaded,
    loading,
    error
  }
}
```



```vue
// App.vue
import useUrlLoader from './hooks/useUrlLoader'

export default {
  setup() {
    const {result, loaded, loading} = useUrlLoader()
    
    return {result, loaded, loading}
  }
}

// html
<h1 v-if="loading"> img is Loading...</h1>
<img v-if="loaded" :src="result.message">
```



### 模块化结合typescript - 泛型改造

```ts
// 为函数添加泛型
function useUrlLoader<T>(url: string) {
  const result = ref<T | null>(null)
}

// 在应用中的使用，可以定义不同的数据类型
interface DogResult {
  message: string;
  status: string;
}

interface CatResult {
  id: string;
  url: string;
  height: number;
  width: number
}

// 免费猫图片的 API  https://api.thecatapi.com/v1/images/search?limit=1
const { result, loading, loaded } = useURLLoader<CatResult[]>('https://api.thecatapi.com/v1/images/search?limit=1')

```



#### Vue2遇到的难题

+ Vue2 对于 typescript 的支持非常的有限



### 使用 defineComponent 包裹组件

defineComponent是一个函数，接受一个对象，使其有ts type 检测以及 vue3 的语法提示



### Teleport - 瞬间移动





### emit





























