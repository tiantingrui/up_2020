# 函数



## 1. 防抖和节流

### 防抖

> 函数防抖的关键在于，**在一个动作发生一定时间之后，才执行特定事件**
>
> **侧重于：一定时间，连续触发，只在最后一次执行**

**实现防抖**

```js
let debounce = (fn, delay) => {
    let timer = null
    return function(...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn(args)
        }, delay)
    }
}
```

**函数防抖存在的问题**

如果？一直触发事件，且每次触发事件的间隔小于delay。



#### 节流

> 函数节流：**当持续触发事件时，保证一定时间内只调用一次事件处理函数**
>
> 侧重于：**一段时间内执行一次**

**实现节流**

```js
let throttle = (fn, delay) => {
    let flag = true
    return function(...args) {
        if (!flag) return
        flag = false
        setTimeout(() => {
            fn(...args)
        }, delay)
    }
}
```

