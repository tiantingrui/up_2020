

## Redux

### 基本概念 & API

#### 1. store

> store  就是保存数据的地方，你可以把它看成一个容器，整个应用 只能有一个 Store

**Redux 提供 `createStore` 这个函数，用来生成 Store**

```js
import {createStore} from 'redux'
const store = createStore(fn)
```

`createStore` 函数接收另一个函数作为参数，返回新生成的 store 对象



#### 2. State

store 对象包含所有数据，如果想得到 某个时点的数据，就要对 Store 生成快照，这种时点的数据集合，就叫做`state`。

当前时刻的 `state` ，可以通过 `store.getState()` 拿到。

```js
import {createStore} from 'redux'
const store = createStore(fn)

const state = store.getState()
```

**Redux 规定，一个 state 对应一个view。只要 State 相同， view 就相同，你知道 state，就知道view 是什么样，反之亦然**



#### 3. Action

State 的变化，会导致 View 的变化。但是，用户接触不到 State , 只能接触到View 。所以，state 的变化必须是 View 导致的。Action 就是View 发出的通知，表示State 应该要发生变化了。

Action 是一个对象，其中的`type` 属性是必须的，表示 Action的名称。其他属性可以自由设置

```js
const action = {
    type: 'ADD_TODO',
    payload: 'learn Redux'
}
```

上面代码中，Action 的名称是 `ADD_TODO`，它携带的信息是字符串 `learn Redux`

可以这样理解，Action 描述当前发生的事情，改变State 的 唯一办法，就是使用Action，它会运送数据到 Store



#### 4. Action Creator

VIew  要发送多少张消息，就会有多少种Action , 如果都手写，会很麻烦，可以定义一个函数来生成Action , 这个函数就叫 `Action Creator`

``` js
const ADD_TODO = '添加 TODO'
function addTodo(text) {
    return {
        type: ADD_TODO,
        text
    }
}
const action = addTodo('learn Redux')
```

上面代码中，`addTodo` 函数就是一个 Action Creator



#### 5. store.dispatch()

`store.dispatch()` 是 View 发出 Action 的唯一方法。

```js
import {createStore} from 'redux'
const store = createStore(fn)

store.dispatch({
    type: 'ADD_TODO',
    payload: 'learn Redux'
})
```



上面的代码中，`store.dispatch` 接受一个Action 对象作为参数，将它发送出去。

结合Action Creator，这段代码可以改写成如下。

```js
store.dispatch.addTodo('learn Redux')
```





#### 6. Reducer

Store 接收到Action 之后，必须给出一个新的state ，这样View 才会发生变化。这种state 的计算过程就叫做 `Reducer`，`Reducer`  是一个函数，他接受 Action 和当前State 作为参数，返回一个新的 State

```js
const reducer = function (state, action) {
    // ...
    return new_state
}
```

整个应用的初始状态，可以作为 State 的默认值。下面是一个实际的例子

```js
const defaultState = 0
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD':
            return state + action.payload
        default:
            return state
    }
}

const state = reducer(1, {
    type: 'ADD',
    payload； 2
})
```

上面代码中，`reducer`函数收到名为`ADD`的 Action 以后，就返回一个新的 State，作为加法的计算结果。其他运算的逻辑（比如减法），也可以根据 Action 的不同来实现。

实际应用中，Reducer 函数不用像上面这样手动调用，`store.dispatch`方法会触发 Reducer 的自动执行。为此，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入`createStore`方法。

```js
import {createStore} from 'redux'
const store = createStore(reducer)
```

上面代码中，`createStore` 接收一个Reducer 作为参数，生成一个新的 Store，以后每当 `store.dispatch`发送过来一个新的 Action , 就会自动调用Reducer ，得到新的State

为什么这个函数叫做 Reducer 呢？因为它可以作为数组的`reduce`方法的参数。请看下面的例子，一系列 Action 对象按照顺序作为一个数组。

```js
const actions = [
    {type: 'ADD', payload: 0},
    {type: 'ADD', payload: 1},
    {type: 'ADD', payload: 2}
]

const total = actions.reduce(reducer, 0) // 3
```

上面代码中，数组 `actions` 表示依次有三个 Action , 分别是  加0，加1， 加2。数组的 `reduce` 方法接受  Reducer 作为参数，就可以直接得到最终的状态 `3`



#### 7. 纯函数

Reducer 函数最重要的特征是，它是一个纯函数。也就是说，只要是同样的输入，必定得到同样的输出。

纯函数是函数式编程的概念，必须遵守以下一些约束。

+ 不得改写参数
+ 不能调用 `I/O`的API
+ 不能调用 Date.now() 或者 Math.random() 等不纯的方法，因为每次会得到不一样的结果

由于Reducer 是纯函数，就可以保证同样的 State，必定得到同样的View .但也正因为这一点，Reducer 函数里面不能改变 State，必须返回一个全新的对象，请参考下面的写法。

```js
// State 是一个对象
function reducer(state, action) {
  return Object.assign({}, state, { thingToChange });
  // 或者
  return { ...state, ...newState };
}

// State 是一个数组
function reducer(state, action) {
  return [...state, newItem];
}
```

最好把 State 对象设成只读。你没法改变它，要得到新的 State，唯一办法就是生成一个新对象。这样的好处是，任何时候，与某个 View 对应的 State 总是一个不变的对象。

#### 8.store.subscribe()

Store 允许使用 `store.subscribe` 方法设置监听函数，一旦State 发生变化，就自动执行这个函数

```js
import {createStore} from 'redux'
const store = createStore(reducer)

store.subscribe(listener)
```

显然，只要把 View 的更新函数（对于 React 项目，就是组件的`render`方法或`setState`方法）放入`listen`，就会实现 View 的自动渲染。

`store.subscribe`方法返回一个函数，调用这个函数就可以解除监听。

```js
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

unsubscribe();
```



### Store的实现

从上面我们可以发现，Store 提供











## react 学习路线

1. react 基本语法

   1. jsx 
   2. 元素
   3. 组件
   4. props
   5. state
   6. 生命周期
   7. 条件&循环

2. react router

   1. Router
   2. Link
   3. Route
   4. Switch
   5. NavLint
   6. Redirect

3. redux && react-redux

   1. redux
   2. react-redux

4. react Hooks

   1. useState

   2. useEffect

   3. useCallback

   4. useMemo

   5. useRef

      



#### 项目开发

+ **依赖**

  ```
  redux react-redux  --save
  redux-logger redux-devtools-extension --save-dev
  redux-thunk --save
  ```

  