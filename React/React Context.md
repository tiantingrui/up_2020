# React Context



Context API 有三个关键的要素：**React.createContext、Provider、Consumer**

我们通过调用 React.createContext，可以创建出一组 Provider。Provider 作为数据的提供方，可以将数据下发给自身组件树中任意层级的 Consumer。

**注意**：

Consumer 不仅能够读取到 Provider下发的数据，**还能读取到这些数据后续的更新**，**这意味着数据在生产者和消费者之间能够及时同步**，这对 Context 这种模式来说至关重要



### 从编码的角度认识“三要素”

+ **React.createContext**

  作用是创建一个 `context`对象，栗子：

  ```js
  const AppContext = React.createContext()
  ```

  注意，在创建的过程中，我们可以选择性地传入一个 `defaultValue`:

  ```js
  const AppContext = React.createContext(defaultValue)
  ```

  从创建出的 `context` 对象中，我们可以读取到 `Provider` 和 `Consumer`

  ```js
  const {Provider, Consumer} = AppContext
  ```

+ **Provider**  -  数据的提供者

  我们使用 Provider 对组件树中的跟组件进行包裹，然后传入名为 `value`  的属性，这个value 就是后续在组件树中流动的 “数据”，他可以被 `Consumer` 消费，栗子

  ```jsx
  <Provider valeu={title: this.state.title, content: this.state.content}>
      <Title />
      <Content />
  </Provider>
  ```

+ **Consumer**  - 数据的消费者，它可以读取下发下来的数据

  特点是需要接受一个函数作为子元素，这个函数需要返回一个组件，几个栗子

  ```jsx
  <Consumer>
  	{value => <div> {value.title} </div>}
  </Consumer>
  ```

  



### 新的 Context API  解决了什么问题

想要知道新的 Context API 解决了什么问题，先要知道过时的 Context API 存在什么问题

**我们先从编码角度认识“过时的”Context API**

```jsx
import PropTypes from 'prop-types';
class Button extends React.Component {
  render() {
    return (
      <button style={{background: this.context.color}}>
        {this.props.children}
      </button>
    );
  }
}
Button.contextTypes = {
  color: PropTypes.string
};
class Message extends React.Component {
  render() {
    return (
      <div>
        {this.props.text} <Button>Delete</Button>
      </div>
    );
  }
}
class MessageList extends React.Component {
  getChildContext() {
    return {color: "purple"};
  }
  render() {
    const children = this.props.messages.map((message) =>
      <Message text={message.text} />
    );
    return <div>{children}</div>;
  }
}
MessageList.childContextTypes = {
  color: PropTypes.string
};
```







## React Hooks

> 函数组件会捕获 render 内部的状态，这是两类组件最大的不同

js 闭包机制能给到我们这么重要的解决问题的灵感

**类组件和函数组件之间，纵有千差万别，但最不能够被我们忽略掉的，是心智模式层面的差异，是面向对象和函数式编程这两套不同的设计思想之间的差异**

说得更加具体一点，函数组件更加切合 React 框架的设计理念。

react 公式：

```
UI = render (data)
UI = f (data)
```

不夸张地说，**React 组件本身的定位就是函数，一个吃进数据，吐出UI 的函数**。作为开发者，我们编写的是声明式的代码，而 React 框架的主要工作，就是及时地**把声明式的代码转换为命令式的 DOM 操作，把数据层面的描述映射到用户可见的 UI 变化中去**。这就意味着从原则上来讲，**react的数据应该总是紧紧的和渲染绑定在一起的，而类组件做不到这一点**







#### 心智模式



`useEffect` 回调函数中成为“清楚函数”







#### 为什么需要 react-hooks

+ 告别难以理解的Class
+ 解决业务逻辑难以拆分的问题
+ 使状态逻辑复用变得简单可行
+ 函数组件从设计思想来看，更加契合 React 的理念



1. #####  class 难以理解，这个说法的背后是 this 和 生命周期这两个痛点

2. ##### Hooks如何实现更好的逻辑拆分

3. ##### 状态复用：hooks 将复杂的问题变简单

4. ##### 保持清醒：Hooks 并非万能

   1. Hooks 暂时还不能完全地为函数组件补齐类组件的能力，比如：`getSnapshotBeforeUpdate`、`componentDidCatch`这些生命周期，目前都还是强依赖类组件的。
   2. “轻量”几乎是函数组件的基因，这可能会是使他不能够很好的消化“复杂”。**函数组件给了我们一定程度的自由，却也对开发者的水平提出了更高的要求**
   3. Hooks在使用层面有着严格的规则约束





## 深入 React-Hooks 工作机制：“原则”的背后，是“原理”

React 团队面向开发者给出了两条 React-Hooks的使用原则，原则的内容如下：

1. 只在React 函数中调用 Hook
2. 不要在循环、条件或嵌套函数中调用Hook

