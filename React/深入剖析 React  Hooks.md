# 深入剖析 React  Hooks

> （官网描述）Hook 是 React 16.8 的新增特性，它可以让你在不编写 class 的情况下使用 state 以及其他的React 特性



## React - Hooks 设计动机与工作模式

------



### 掌握 React-Hooks 的正确姿势

在这里首先来提及一个很重要的学习方法。

当我们由浅入深地认知一样新事物的时候，往往需要遵循“why-what-how”这样一个认知的过程。



但实际生活中，我们往往在“what”和“how” 这两个环节中做的都很不错，但是却疏于钻研背后的“why”，**其实这三者是相辅相成、缺一不可的**，当我们了解了具体的“what” 和“how”之后，往往能够更加具象地回答理论层面“why”的问题；而我们对“why”的探索和认知，也必然会反哺到对“what”的理解和对“how”的实践。



**对于一个工程师来说，他对“why”的执着程度，很大程度上能够反映其职业天花板的高度**



Hooks 对一个老React 开发来说，他就是一个新事物（笔者很幸运，在学习react这门优秀的框架的时候就有Hook了，也不知道老的react 开发写类组件的烦恼。）。如果在认知他的过程中我们遵循“why-what-how”这样的一个学习法则，并且以此为线索，梳理出属于自己的完整知识链路，那么我相信，无论面对who，你都可以做到心中有数，对答如流。

那么，我们就遵循这个学习法则，向react-hooks发起挑战，真正理解它背后的设计动机与工作模式。



### React-Hooks 设计动机初探

开篇我们先来聊“why”。hooks这个东西比较特别，他是facebook团队在真刀真枪的react 组件开发实践中，逐渐认知到的一个改进点，这背后其实涉及对 **类组件和函数组件**两种形式的思考和侧重。因此，你首先得知道，什么是类组件，什么是函数组件，并完成对这两种组件形式的辨析。

#### 什么是类组件（Class  Component）

类组件，就是基于 ES6 Class 这种写法，通过继承 React.Component 得来的 React 组件，先来看一个典型的类组件：

```jsx
class DemoClass extends React.Component {
    // 初始化类组件的state
    state = {
        text: ''
    }
	// 编写生命周期方法 didMount
	componentDidMount() {
        // ...
    }
	// 编写自定义的实例方法
	changeText = (newText) => {
        // 更新state
        this.setState({
            text: newText
        })
    }
    // 编写生命周期方法render
    render() {
        return (
        	<div>
            	<p>{this.state.text}</p>
                <button onClick={this.changeText}>修改state</button>
            </div>
        )
    }
}
```



#### 什么是函数组件/无状态组件（Function Component / Stateless Component）

函数组件，就是以 **函数的形态** 存在的React组件，react16.8 之前没有 react-hooks，函数组件内部无法定义和维护state，因此它还有一个别名叫作“无状态组件”，我们也来看一个例子：

```jsx
function DemoFunction(props) {
    const {text} = props
    return (
    	<div>
        	<p>{`function 组件接收到的来自外界的内容是: ${text}`}</p>
        </div>
    )
}
```



#### 函数组件于类组件的对比：无关优劣，只谈不同

我们先基于上面的两个例子，从形态上对两种组件做区分。他们之间肉眼可见的区别就包括但不限于：

+ 类组件需要继承class，函数组件不需要
+ 类组件可以访问生命周期方法，函数组件不可以
+ 类组件中可以获取到实例化后的`this`,并基于 this 做各种各样的事情，而函数组件不可以
+ 类组件可以定义维护 state（状态），而函数组件不可以
+ ……

单就我们列出的这几点里面，频繁出现了“类组件可以 xxx，函数组件不可以 xxx”，这是否就意味着类组件比函数组件更好呢？

答案当然是否定的。你可以说，在 React-Hooks 出现之前的世界里，**类组件的能力边界明显强于函数组件**，但要进一步推导“类组件强于函数组件”，未免显得有些牵强。同理，一些文章中一味鼓吹函数组件轻量优雅上手迅速，不久的将来一定会把类组件干没（类组件：我做错了什么？）之类的，更是不可偏听偏信。

当我们谈论这两种组件形式时，**不应怀揣“孰优孰劣”这样的成见，而应该更多地去关注两者的不同，进而把不同的特性与不同的场景做连接**，这样才能求得一个全面的、辩证的认知。



#### 重新理解类组件：包裹在面向对象思想下的“重装战舰”

类组件是面向对象编程思想的一种表征，面向对象是一个老生常谈的概念了，当我们应用面向对象的时候，总是会有意和无意的做这两件事情

+ 封装：将一类属性和方法，“聚拢”到一个 Class中去
+ 继承：新的Class 可以通过继承现有 Class ，实现对某一类属性和方法的复用

React类组件也不例外。

不难看出，React 类组件内部预置了相当多的“现成的东西”等着你去调度/定制，state 和生命周期就是这些“现成东西”中的典型。要想得到这些东西，难度也不大，你只需要轻轻地**继承**一个 React.Component 即可。

这种感觉就好像是你不费吹灰之力，就拥有了一辆“重装战舰”，该有的枪炮导弹早已配备整齐，就等你操纵控制台上的一堆开关了。

毋庸置疑，类组件给到开发者的东西是足够多的，但“多”就是“好”吗？其实未必。

把一个人塞进重装战舰里，他就一定能操纵这台战舰吗？如果他没有经过严格的训练，不清楚每一个操作点的内涵，那他极有可能会把炮弹打到友军的营地里去。

React 类组件，也有同样的问题——它提供了多少东西，你就需要学多少东西。假如背不住生命周期，你的组件逻辑顺序大概率会变成一团糟。**“大而全”的背后，是不可忽视的学习成本**。

再想这样一个场景：假如我现在只是需要打死一只蚊子，而不是打掉一个军队。这时候继续开动重装战舰，是不是正应了那句老话——“可以，但没有必要”。这也是类组件的一个不便，**它太重了**，对于解决许多问题来说，编写一个类组件实在是一个过于复杂的姿势。复杂的姿势必然带来高昂的理解成本，这也是我们所不想看到的。

更要命的是，由于开发者编写的逻辑在**封装**后是和组件粘在一起的，这就使得类组件内部的逻辑难以实现拆分和复用。如果你想要打破这个僵局，则需要进一步学习更加复杂的设计模式（比如高阶组件、Render Props 等），用更高的学习成本来交换一点点编码的灵活度。

这一切的一切，光是想想就让人头秃。所以说，**类组件固然强大， 但它绝非万能**。

#### 深入理解函数组件：呼应React 设计思想的“轻巧快艇”

```jsx
function DemoFunction(props) {
    const {text} = props
    return (
    	<div>
        	<p>{`function 组件接收到的来自外界的内容是: ${text}`}</p>
        </div>
    )
}
```

当然啦，要是你以为函数组件的简单是因为它只能承担渲染这一种任务，那可就太小瞧它了。它同样能够承接相对复杂的交互逻辑，像这样：

```jsx
function DemoFunction(props) {
  const { text } = props 
  const showAlert = ()=> {
    alert(`我接收到的文本是${text}`)
  } 
  return (
    <div className="demoFunction">
      <p>{`function 组件所接收到的来自外界的文本内容是：[${text}]`}</p>
      <button onClick={showAlert}>点击弹窗</button>
    </div>
  );
}
```

相比于类组件，函数组件肉眼可见的特质自然包括轻量、灵活、易于组织和维护、较低的学习成本等。这些要素毫无疑问是重要的，它们也确实驱动着 React 团队做出改变。但是除此之外，还有一个非常容易被大家忽视、也极少有人能真正理解到的知识点，我在这里要着重讲一下。这个知识点缘起于 React 作者 Dan 早期特意为类组件和函数组件写过的[一篇非常棒的对比文章](https://overreacted.io/how-are-function-components-different-from-classes/)，这篇文章很长，但是通篇都在论证这一句话：

> 函数组件会捕获render 内部的状态，这是两类组件最大的不同。

**类组件和函数组件之间，纵有千差万别，但最不能够被我们忽视掉的，是心智模式层面的差异，是面向对象和函数式编程这两套不同的设计思想之间的差异。**

说得更具体一点，**函数组件更加契合 React 框架的设计理念**。何出此言？不要忘了这个赫赫有名的 React 公式：

```
UI = render(data)
// OR
UI = f(data)
```

不夸张地说，**React 组件本身的定位就是函数，一个吃进数据、吐出 UI 的函数**。作为开发者，我们编写的是声明式的代码，而 React 框架的主要工作，就是及时地**把声明式的代码转换为命令式的 DOM 操作，把数据层面的描述映射到用户可见的 UI 变化中去**。这就意味着从原则上来讲，**React 的数据应该总是紧紧地和渲染绑定在一起的**，**而类组件做不到这一点**。

为什么类组件做不到？这里我摘出上述[文章](https://overreacted.io/how-are-function-components-different-from-classes/)中的 Demo，站在一个新的视角来解读一下“**函数组件会捕获 render 内部的状态，这是两类组件最大的不同”**这个结论。

因为**虽然 props 本身是不可变的，但 this 却是可变的，this 上的数据是可以被修改的**，this.props 的调用每次都会获取最新的 props，而这正是 React 确保数据实时性的一个重要手段。

多数情况下，在 React 生命周期对执行顺序的调控下，this.props 和 this.state 的变化都能够和预期中的渲染动作保持一致。但在这个案例中，**我们通过 setTimeout 将预期中的渲染推迟了 3s，打破了 this.props 和渲染动作之间的这种时机上的关联**，进而导致渲染时捕获到的是一个错误的、修改后的 this.props。这就是问题的所在。



**函数组件会捕获 render 内部的状态**

经过岁月的洗礼，React 团队显然也认识到了，**函数组件是一个更加匹配其设计理念、也更有利于逻辑拆分与重用的组件表达形式**，接下来便开始“用脚投票”，用实际行动支持开发者编写函数式组件。于是，React-Hooks 便应运而生。



### Hooks 的本质：一套能够使函数组件更加强大、更灵活的“钩子”

React-Hooks 是什么？它是一套能够使函数组件更强大、更灵活的“钩子”。

前面我们已经说过，函数组件比起类组件“少”了很多东西，比如生命周期、对 state 的管理等。这就给函数组件的使用带来了非常多的局限性，导致我们并不能使用函数这种形式，写出一个真正的全功能的组件。

React-Hooks 的出现，就是为了帮助函数组件补齐这些（相对于类组件来说）缺失的能力。

**如果说函数组件是一台轻巧的快艇，那么 React-Hooks 就是一个内容丰富的零部件箱**。“重装战舰”所预置的那些设备，这个箱子里基本全都有，同时它还不强制你全都要，而是**允许你自由地选择和使用你需要的那些能力**，然后将这些能力以 Hook（钩子）的形式“钩”进你的组件里，从而定制出一个最适合你的“专属战舰”。

到此，关于“Why”的研究已经基本到位，对于“What”的认知也已经初见眉目。接下来，我们将会和 React-Hooks 面对面交锋，从编码层面上认知“What”，从实践角度理解“How”。



### 先导知识：从核心API看Hooks的基本形态

#### useState(): 为函数组件引入状态

早期的函数组件相比于类组件，其一大劣势是缺乏定义和维护 state 的能力，而 state（状态）作为 React 组件的**灵魂**，必然是不可省略的。因此 React-Hooks 在诞生之初，就优先考虑了对 state 的支持。useState 正是这样一个能够为函数组件引入状态的 API。

#### 函数组件，真的很轻

```jsx
import React, { useState } from "react";
export default function Button() {
  const [text, setText] = useState("初始文本");
  function changeText() {
    return setText("修改后的文本");
  }
  return (
    <div className="textButton">
      <p>{text}</p>
      <button onClick={changeText}>点击修改文本</button>
    </div>
  );
}
```

用了hooks的函数组件和类组件可以达到相同的效果，但是其代码量几乎是类组件代码量的一半！

**同样逻辑的函数组件相比类组件而言，复杂度要低得多得多**。



#### useState 快速上手

从用法上看，useState 返回的是一个数组，数组的第一个元素对应的是我们想要的那个 state 变量，第二个元素对应的是能够修改这个变量的 API。我们可以通过数组解构的语法，将这两个元素取出来，并且按照我们自己的想法命名。一个典型的调用示例如下：

```js
const [state, setState] = useState(initialState);
```

在这个示例中，我们给自己期望的那个状态变量命名为 state，给修改 state 的 API 命名为 setState。useState 中传入的 initialState 正是 state 的初始值。后续我们可以通过调用 setState，来修改 state 的值，像这样：

```js
setState(newState)
```

状态更新后会触发渲染层面的更新，这点和类组件是一致的。

这里需要向初学者强调的一点是：**状态和修改状态的 API 名都是可以自定义的**。比如在上文的 Demo 中，就分别将其自定义为 text 和 setText：

```
const [text, setText] = useState("初始文本");
```

“set + 具体变量名”这种命名形式，可以帮助我们快速地将 API 和它对应的状态建立逻辑联系。

当我们在函数组件中调用 React.useState 的时候，实际上是给这个组件关联了一个状态——注意，是“一个状态”而不是“一批状态”。这一点是相对于类组件中的 state 来说的。在类组件中，我们定义的 state 通常是一个这样的对象，如下所示：

```
this.state {
  text: "初始文本",
  length: 10000,
  author: ["xiuyan", "cuicui", "yisi"]
}
```

这个对象是“包容万物”的：整个组件的状态都在 state 对象内部做收敛，当我们需要某个具体状态的时候，会通过 this.state.xxx 这样的访问对象属性的形式来读取它。

而在 useState 这个钩子的使用背景下，state 就是单独的一个状态，它可以是任何你需要的 JS 类型。像这样：

复制代码

```
// 定义为数组
const [author, setAuthor] = useState(["xiuyan", "cuicui", "yisi"]);
// 定义为数值
const [length, setLength] = useState(100);
// 定义为字符串
const [text, setText] = useState("初始文本")
```

你还可以定义为布尔值、对象等，都是没问题的。**它就像类组件中 state 对象的某一个属性一样，对应着一个单独的状态**，允许你存储任意类型的值。



#### useEffect(): 允许函数组件执行副作用操作

函数组件相比于类组件来说，最显著的差异就是 state 和生命周期的缺失。useState 为函数组件引入了 state，而 useEffect 则在一定程度上弥补了生命周期的缺席。

useEffect 能够为函数组件引入副作用。过去我们习惯放在 componentDidMount、componentDidUpdate 和 componentWillUnmount 三个生命周期里来做的事，现在可以放在 useEffect 里来做，比如操作 DOM、订阅事件、调用外部 API 获取数据等。

##### useEffect 和生命周期函数之间的“替换”关系

我们可以通过下面这个例子来理解 useEffect 和生命周期函数之间的替换关系。这里我先给到你一个用 useEffect 编写的函数组件示例：

复制代码

```
// 注意 hook 在使用之前需要引入
import React, { useState, useEffect } from 'react';
// 定义函数组件
function IncreasingTodoList() {
  // 创建 count 状态及其对应的状态修改函数
  const [count, setCount] = useState(0);
  // 此处的定位与 componentDidMount 和 componentDidUpdate 相似
  useEffect(() => {
    // 每次 count 增加时，都增加对应的待办项
    const todoList = document.getElementById("todoList");
    const newItem = document.createElement("li");
    newItem.innerHTML = `我是第${count}个待办项`;
    todoList.append(newItem);
  });
  // 编写 UI 逻辑
  return (
    <div>
      <p>当前共计 {count} 个todo Item</p>
      <ul id="todoList"></ul>
      <button onClick={() => setCount(count + 1)}>点我增加一个待办项</button>
    </div>
  );
}
```

**有时候，我们必须学会忘记旧的知识，才能够更好地拥抱新的知识**。对于每一个学习 useEffect 的人来说，生命周期到 useEffect 之间的转换关系都不是最重要的，最重要的是在脑海中构建一个“组件有副作用 → 引入 useEffect”这样的条件反射——**当你真正抛却类组件带给你的刻板印象、拥抱函数式编程之后，想必你会更加认同“useEffect 是用于为函数组件引入副作用的钩子”这个定义**。

#### useState快速上手

useEffect 可以接收两个参数，分别是回调函数与依赖数组，如下面代码所示：

复制代码

```
useEffect(callBack, [])
```

useEffect 用什么姿势来调用，本质上取决于你想用它来达成什么样的效果。下面我们就以效果为线索，简单介绍 useEffect 的调用规则。

- 每一次渲染后都执行的副作用：传入回调函数，不传依赖数组。调用形式如下所示：

复制代码

```
useEffect(callBack)
```

- 仅在挂载阶段执行一次的副作用：传入回调函数，**且这个函数的返回值不是一个函**数，同时传入一个空数组。调用形式如下所示：

复制代码

```
useEffect(()=>{
  // 这里是业务逻辑 
}, [])
```

- 仅在挂载阶段和卸载阶段执行的副作用：传入回调函数，**且这个函数的返回值是一个函数**，同时传入一个空数组。假如回调函数本身记为 A， 返回的函数记为 B，那么将在挂载阶段执行 A，卸载阶段执行 B。调用形式如下所示：

复制代码

```
useEffect(()=>{
  // 这里是 A 的业务逻辑
  // 返回一个函数记为 B
  return ()=>{
  }
}, [])
```

这里需要注意，这种调用方式之所以会在卸载阶段去触发 B 函数的逻辑，是由 useEffect 的执行规则决定的：**useEffect 回调中返回的函数被称为“清除函数”**，当 React 识别到清除函数时，会在卸载时执行清除函数内部的逻辑。**这个规律不会受第二个参数或者其他因素的影响，只要你在 useEffect 回调中返回了一个函数，它就会被作为清除函数来处理**。

- 每一次渲染都触发，且卸载阶段也会被触发的副作用：传入回调函数，且这个函数的返回值是一个函数，同时不传第二个参数。如下所示：

复制代码

```
useEffect(()=>{
  // 这里是 A 的业务逻辑
  // 返回一个函数记为 B
  return ()=>{
  }
})
```

上面这段代码就会使得 React 在每一次渲染都去触发 A 逻辑，并且在卸载阶段去触发 B 逻辑。

其实你只要记住，如果你有一段副作用逻辑需要在卸载阶段执行，那么把它写进 useEffect 回调的返回函数（上面示例中的 B 函数）里就行了。也可以认为，这个 B 函数的角色定位就类似于生命周期里 componentWillUnmount 方法里的逻辑（虽然并不推荐你再继续钻生命周期的牛角尖，哈哈）。

- 根据一定的依赖条件来触发的副作用：传入回调函数（若返回值是一个函数，仍然仅影响卸载阶段对副作用的处理，此处不再赘述），同时传入一个非空的数组，如下所示：

复制代码

```
useEffect(()=>{
  // 这是回调函数的业务逻辑 
  // 若 xxx 是一个函数，则 xxx 会在组件卸载时被触发
  return xxx
}, [num1, num2, num3])
```

这里我给出的一个示意数组是 [num1, num2, num3]。首先需要说明，数组中的变量一般都是来源于组件本身的数据（props 或者 state）。若数组不为空，那么 React 就会在新的一次渲染后去对比前后两次的渲染，查看数组内是否有变量发生了更新（只要有一个数组元素变了，就会被认为更新发生了），并在有更新的前提下去触发 useEffect 中定义的副作用逻辑。



#### why React-hooks: Hooks 是如何帮助我们升级工作模式的

函数组件相比类组件来说，有着不少能够利好 React 组件开发的特性，而 React-Hooks 的出现正是为了强化函数组件的能力。现在，基于对 React-Hooks 编码层面的具体认知，想必你对“动机”的理解也已经上了一个台阶。这里我们就趁热打铁，针对“Why React-Hooks”这个问题，做一个加强版的总结。

手把手教你做“为什么需要 React-Hooks”这道面试题。以“Why xxx”开头的这种面试题，往往都没有标准答案，但会有一些关键的“点”，只要能答出关键的点，就足以证明你思考的方向是正确的，也就意味着这道题能给你加分。这里，我梳理了以下 4 条答题思路：

- 告别难以理解的 Class；
- 解决业务逻辑难以拆分的问题；
- 使状态逻辑复用变得简单可行；
- 函数组件从设计思想上来看，更加契合 React 的理念。

第四点上面的内容已经讲得很通透了，这里我主要是借着代码的东风，把 1、2、3 摊开来给你看一下。

#### 1. 告别难以理解的 Class：把握 Class 的两大“痛点”

坊间总有传言说 Class 是“难以理解”的，这个说法的背后**是 this 和生命周期这两个痛点**。

先来说说 this，在上个课时，你已经初步感受了一把 this 有多么难以捉摸。但那毕竟是个相对特殊的场景，更为我们所熟悉的，可能还是 React 自定义组件方法中的 this。看看下面这段代码：

复制代码

```
class Example extends Component {
  state = {
    name: '修言',
    age: '99';
  };
  changeAge() {
    // 这里会报错
    this.setState({
      age: '100'
    });
  }
  render() {
    return <button onClick={this.changeAge}>{this.state.name}的年龄是{this.state.age}</button>
  }
}
```

你先不用关心组件具体的逻辑，就看 changeAge 这个方法：它是 button 按钮的事件监听函数。当我点击 button 按钮时，希望它能够帮我修改状态，但事实是，点击发生后，程序会报错。原因很简单，changeAge 里并不能拿到组件实例的 this，至于为什么拿不到，我们将在第 15课时讲解其背后的原因，现在先不用关心。单就这个现象来说，略有一些 React 开发经验的同学应该都会非常熟悉。

为了解决 this 不符合预期的问题，各路前端也是各显神通，之前用 bind、现在推崇箭头函数。但不管什么招数，**本质上都是在用实践层面的约束来解决设计层面的问题**。好在现在有了 Hooks，一切都不一样了，我们可以在函数组件里放飞自我（毕竟函数组件是不用关心 this 的）哈哈，解放啦！

至于生命周期，它带来的麻烦主要有以下两个方面：

- 学习成本
- 不合理的逻辑规划方式

对于第一点，大家都学过生命周期，都懂。下面着重说说这“不合理的逻辑规划方式”是如何被 Hooks 解决掉的。

#### 2. Hooks 如何实现更好的逻辑拆分

在过去，你是怎么组织自己的业务逻辑的呢？我想多数情况下应该都是先想清楚业务的需要是什么样的，然后将对应的业务逻辑拆到不同的生命周期函数里去——没错，**逻辑曾经一度与生命周期耦合在一起**。

在这样的前提下，生命周期函数常常做一些奇奇怪怪的事情：比如在 componentDidMount 里获取数据，在 componentDidUpdate 里根据数据的变化去更新 DOM 等。如果说你只用一个生命周期做一件事，那好像也还可以接受，但是往往在一个稍微成规模的 React 项目中，一个生命周期不止做一件事情。下面这段伪代码就很好地诠释了这一点：

复制代码

```
componentDidMount() {
  // 1. 这里发起异步调用
  // 2. 这里从 props 里获取某个数据，根据这个数据更新 DOM
  // 3. 这里设置一个订阅
  // 4. 这里随便干点别的什么 
  // ...
}
componentWillUnMount() {
  // 在这里卸载订阅
}
componentDidUpdate() {
  // 1. 在这里根据 DidMount 获取到的异步数据更新 DOM
  // 2. 这里从 props 里获取某个数据，根据这个数据更新 DOM（和 DidMount 的第2步一样）
}
```

像这样的生命周期函数，它的体积过于庞大，做的事情过于复杂，会给阅读和维护者带来很多麻烦。最重要的是，**这些事情之间看上去毫无关联，逻辑就像是被“打散”进生命周期里了一样**。比如，设置订阅和卸载订阅的逻辑，虽然它们在逻辑上是有强关联的，但是却只能被分散到不同的生命周期函数里去处理，这无论如何也不能算作是一个非常合理的设计。

而在 Hooks 的帮助下，我们完全可以把这些繁杂的操作**按照逻辑上的关联拆分进不同的函数组件里：\**我们可以有专门管理订阅的函数组件、专门处理 DOM 的函数组件、专门获取数据的函数组件等。Hooks 能够帮助我们\**实现业务逻辑的聚合，避免复杂的组件和冗余的代码**。

#### 3. 状态复用：Hooks 将复杂的问题变简单

过去我们复用状态逻辑，靠的是 HOC（高阶组件）和 Render Props 这些组件设计模式，这是因为 React 在原生层面并没有为我们提供相关的途径。但这些设计模式并非万能，它们在实现逻辑复用的同时，也破坏着组件的结构，其中一个最常见的问题就是“嵌套地狱”现象。

Hooks 可以视作是 React 为解决状态逻辑复用这个问题所提供的一个原生途径。现在我们可以通过自定义 Hook，达到既不破坏组件结构、又能够实现逻辑复用的效果。

要理解上面这两段话，需要你对组件设计模式有基本的理解和应用。如果你读下来觉得一头雾水，也不必心慌。对于组件状态复用这个问题（包括 HOC、Render Props 和自定义 Hook），现在我对你的预期是“知道有这回事就可以了”。如果你实在着急，可以先通过[文档中的相关内容](https://zh-hans.reactjs.org/docs/hooks-custom.html)简单了解一下。在专栏的第三模块，我会专门把这块知识提出来，放在一个更合适的上下文里给你掰开来讲。

### 保持清醒：Hooks 并非万能

尽管我们已经说了这么多 Hooks 的“好话”，尽管 React 团队已经用脚投票表明了对函数组件的积极态度，但我们还是要谨记这样一个基本的认知常识：事事无绝对，凡事皆有两面性。更何况 React 仅仅是推崇函数组件，并没有“拉踩”类组件，甚至还官宣了“类组件和函数组件将继续共存”这件事情。这些都在提醒我们，**在认识到 Hooks 带来的利好的同时，还需要认识到它的局限性**。

关于 Hooks 的局限性，目前社区鲜少有人讨论。这里我想结合团队开发过程当中遇到的一些瓶颈，和你分享实践中的几点感受：

- **Hooks 暂时还不能完全地为函数组件补齐类组件的能力**：比如 getSnapshotBeforeUpdate、componentDidCatch 这些生命周期，目前都还是强依赖类组件的。官方虽然立了“会尽早把它们加进来”的 Flag，但是说真的，这个 Flag 真的立了蛮久了……（扶额）
- **“轻量”几乎是函数组件的基因，这可能会使它不能够很好地消化“复杂”**：我们有时会在类组件中见到一些方法非常繁多的实例，如果用函数组件来解决相同的问题，业务逻辑的拆分和组织会是一个很大的挑战。我个人的感觉是，从头到尾都在“过于复杂”和“过度拆分”之间摇摆不定，哈哈。耦合和内聚的边界，有时候真的很难把握，**函数组件给了我们一定程度的自由，却也对开发者的水平提出了更高的要求**。
- **Hooks 在使用层面有着严格的规则约束**：这也是我们下面要重点讲的内容。对于如今的 React 开发者来说，如果不能牢记并践行 Hooks 的使用原则，如果对 Hooks 的关键原理没有扎实的把握，很容易把自己的 React 项目搞成大型车祸现场。

现在， 我们结合编码层面的认知，辩证地探讨了 Hooks 带来的利好与局限性。现在，你对于 React-Hooks 的基本形态和前世今生都已经有了透彻的了解，也真刀真枪地感受到了 Hooks 带来的利好。学习至此，相信你已经建立了对 React-Hooks 的学习自信。

接下来，我们将续上结尾处的“悬念”，向 React-Hooks 的执行规则发问，同时也将进入 React-Hooks 知识链路真正的深水区。



## **深入 React-Hooks 工作机制：“原则”的背后，是“原理”**

------

React 团队面向开发者给出了两条 React-Hooks 的使用原则，原则的内容如下：

1. 只在 React 函数中调用 Hook；
2. 不要在循环、条件或嵌套函数中调用 Hook。

原则 1 无须多言，React-Hooks 本身就是 React 组件的“钩子”，在普通函数里引入意义不大。我相信更多的人在原则 2 上栽过跟头，或者说至今仍然对它半信半疑。其实，原则 2 中强调的所有“**不要**”，都是在指向同一个目的，那就是**要确保 Hooks 在每次渲染时都保持同样的执行顺序**。

为什么顺序如此重要？这就要从 Hooks 的实现机制说起了。这里我就以 useState 为例，带你从现象入手，深度探索一番 React-Hooks 的工作原理。

### 从现象看问题：若不保证 Hooks 执行顺序，会带来什么麻烦？

先来看一个小 Demo：

复制代码

```
import React, { useState } from "react";
function PersonalInfoComponent() {
  // 集中定义变量
  let name, age, career, setName, setCareer;
  // 获取姓名状态
  [name, setName] = useState("修言");
  // 获取年龄状态
  [age] = useState("99");   
  // 获取职业状态
  [career, setCareer] = useState("我是一个前端，爱吃小熊饼干");
  // 输出职业信息
  console.log("career", career);
  // 编写 UI 逻辑
  return (
    <div className="personalInfo">
      <p>姓名：{name}</p>
      <p>年龄：{age}</p>
      <p>职业：{career}</p>
      <button
        onClick={() => {
          setName("秀妍");
        }}
      >
        修改姓名 
      </button>
    </div>
  );
}
export default PersonalInfoComponent;
```

这个 PersonalInfoComponent 组件渲染出来的界面长这样：

![Drawing 1.png](https://s0.lgstatic.com/i/image/M00/67/64/CgqCHl-hJBKAW3QtAACG9rNvRDs780.png)

PersonalInfoComponent 用于对个人信息进行展示，这里展示的内容包括姓名、年龄、职业。出于测试效果需要，PersonalInfoComponent 还允许你单击“修改年龄”按钮修改年龄数字。单击一次后，“99”会被修改为“100”，如下图所示。

![Drawing 3.png](https://s0.lgstatic.com/i/image/M00/67/64/CgqCHl-hJBqAWgHNAAB251SV-xo591.png)

到目前为止，组件的行为都是符合我们的预期的，一切看上去都是那么的和谐。但倘若我对代码做一丝小小的改变，把一部分的 useState 操作放进 if 语句里，事情就会变得大不一样了。改动后的代码如下：

复制代码

```
import React, { useState } from "react";
// isMounted 用于记录是否已挂载（是否是首次渲染）
let isMounted = false;
function PersonalInfoComponent() {
  // 定义变量的逻辑不变
  let name, age, career, setName, setCareer;
  // 这里追加对 isMounted 的输出，这是一个 debug 性质的操作
  console.log("isMounted is", isMounted);
  // 这里追加 if 逻辑：只有在首次渲染（组件还未挂载）时，才获取 name、age 两个状态
  if (!isMounted) {
    // eslint-disable-next-line
    [name, setName] = useState("修言");
    // eslint-disable-next-line
    [age] = useState("99");
    // if 内部的逻辑执行一次后，就将 isMounted 置为 true（说明已挂载，后续都不再是首次渲染了）
    isMounted = true;
  }
  // 对职业信息的获取逻辑不变
  [career, setCareer] = useState("我是一个前端，爱吃小熊饼干");
  // 这里追加对 career 的输出，这也是一个 debug 性质的操作
  console.log("career", career);
  // UI 逻辑的改动在于，name和age成了可选的展示项，若值为空，则不展示
  return (
    <div className="personalInfo">
      {name ? <p>姓名：{name}</p> : null}
      {age ? <p>年龄：{age}</p> : null}
      <p>职业：{career}</p>
      <button
        onClick={() => {
          setName("秀妍");
        }}
      >
        修改姓名
      </button>
    </div>
  );
}
export default PersonalInfoComponent;
```

修改后的组件在初始渲染的时候，界面与上个版本无异：

![Drawing 5.png](https://s0.lgstatic.com/i/image/M00/67/64/CgqCHl-hJDaAC6-qAACIdJOIg3E041.png)

注意，你在自己电脑上模仿这段代码的时候，千万不要漏掉 if 语句里面`// eslint-disable-next-line`这个注释——因为目前大部分的 React 项目都在内部预置了对 React-Hooks-Rule（React-Hooks 使用规则）的强校验，而示例代码中把 Hooks 放进 if 语句的操作作为一种不合规操作，会被直接识别为 Error 级别的错误，进而导致程序报错。这里我们只有将相关代码的 eslint 校验给禁用掉，才能够避免校验性质的报错，从而更直观地看到错误的效果到底是什么样的，进而理解错误的原因。

修改后的组件在初始挂载的时候，实际执行的逻辑内容和上个版本是没有区别的，都涉及对 name、age、career 三个状态的获取和渲染。理论上来说，**变化应该发生在我单击“修改姓名”之后触发的二次渲染里**：二次渲染时，isMounted 已经被置为 true，if 内部的逻辑会被直接跳过。此时按照代码注释中给出的设计意图，这里我希望在二次渲染时，只获取并展示 career 这一个状态。那么事情是否会如我所愿呢？我们一起来看看单击“修改姓名”按钮后会发生什么：

![Drawing 7.png](https://s0.lgstatic.com/i/image/M00/67/64/CgqCHl-hJEOAMfdIAAJ8aDhIGdA549.png)

组件不仅没有像预期中一样发生界面变化，甚至直接报错了。报错信息提醒我们，这是因为“**组件渲染的 Hooks 比期望中更少**”。

确实，按照现有的逻辑，初始渲染调用了三次 useState，而二次渲染时只会调用一次。但仅仅因为这个，就要报错吗？

按道理来说，二次渲染的时候，只要我获取到的 career 值没有问题，那么渲染就应该是没有问题的（因为二次渲染实际只会渲染 career 这一个状态），React 就没有理由阻止我的渲染动作。啊这……难道是 career 出问题了吗？还好我们预先留了一手 Debug 逻辑，每次渲染的时候都会尝试去输出一次 isMounted 和 career 这两个变量的值。现在我们就赶紧来看看，这两个变量到底是什么情况。

首先我将界面重置回初次挂载的状态，观察控制台的输出，如下图所示：

![Drawing 9.png](https://s0.lgstatic.com/i/image/M00/67/64/CgqCHl-hJHSAL8SuAAHP-0rTPKY784.png)

这里我把关键的 isMounted 和 career 两个变量用红色框框圈了出来：isMounted 值为 false，说明是初次渲染；career 值为“我是一个前端，爱吃小熊饼干”，这也是没有问题的。

接下来单击“修改姓名”按钮后，我们再来看一眼两个变量的内容，如下图所示：

![图片11.png](https://s0.lgstatic.com/i/image/M00/67/64/CgqCHl-hJRiAP2doAAKt-ZhwxQ0744.png)

二次渲染时，isMounted 为 true，这个没毛病。但是 career 竟然被修改为了“秀妍”，这也太诡异了？代码里面可不是这么写的。赶紧回头确认一下按钮单击事件的回调内容，代码如下所示：

复制代码

```
 <button
   onClick={() => {
    setName("秀妍");
  }}
   >
  修改姓名
</button>
```

确实，代码是没错的，我们调用的是 setName，那么它修改的状态也应该是 name，而不是 career。

那为什么最后发生变化的竟然是 career 呢？年轻人，不如我们一起来看一看 Hooks 的实现机制吧！

### 从源码调用流程看原理：Hooks 的正常运作，在底层依赖于顺序链表

这里强调“源码流程”而非“源码”，主要有两方面的考虑：

1. React-Hooks 在源码层面和 Fiber 关联十分密切，我们目前仍然处于基础夯实阶段，对 Fiber 机制相关的底层实现暂时没有讨论，盲目啃源码在这个阶段来说没有意义；
2. 原理 !== 源码，阅读源码只是掌握原理的一种手段，在某些场景下，阅读源码确实能够迅速帮我们定位到问题的本质（比如 React.createElement 的源码就可以快速帮我们理解 JSX 转换出来的到底是什么东西）；而 React-Hooks 的源码链路相对来说比较长，涉及的关键函数 renderWithHooks 中“脏逻辑”也比较多，整体来说，学习成本比较高，学习效果也难以保证。

综上所述，这里我不会精细地贴出每一行具体的源码，而是针对关键方法做重点分析。同时我也**不建议你在对 Fiber 底层实现没有认知的前提下去和 Hooks 源码死磕**。对于搞清楚“Hooks 的执行顺序为什么必须一样”这个问题来说，重要的并不是去细抠每一行代码到底都做了什么，而是要搞清楚整个**调用链路**是什么样的。如果我们能够理解 Hooks 在每个关键环节都做了哪些事情，同时也能理解这些关键环节是如何对最终的渲染结果产生影响的，那么理解 Hooks 的工作机制对于你来说就不在话下了。

#### 以 useState 为例，分析 React-Hooks 的调用链路

首先要说明的是，React-Hooks 的调用链路在首次渲染和更新阶段是不同的，这里我将两个阶段的链路各总结进了两张大图里，我们依次来看。首先是首次渲染的过程，请看下图：

![图片12.png](https://s0.lgstatic.com/i/image/M00/67/59/Ciqc1F-hJYCAWVjCAAEtNT9pGHA170.png)

在这个流程中，useState 触发的一系列操作最后会落到 mountState 里面去，所以我们重点需要关注的就是 mountState 做了什么事情。以下我为你提取了 mountState 的源码：

复制代码

```
// 进入 mounState 逻辑
function mountState(initialState) {
  // 将新的 hook 对象追加进链表尾部
  var hook = mountWorkInProgressHook();
  // initialState 可以是一个回调，若是回调，则取回调执行后的值
  if (typeof initialState === 'function') {
    // $FlowFixMe: Flow doesn't like mixed types
    initialState = initialState();
  }
  // 创建当前 hook 对象的更新队列，这一步主要是为了能够依序保留 dispatch
  const queue = hook.queue = {
    last: null,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: (initialState: any),
  };
  // 将 initialState 作为一个“记忆值”存下来
  hook.memoizedState = hook.baseState = initialState;
  // dispatch 是由上下文中一个叫 dispatchAction 的方法创建的，这里不必纠结这个方法具体做了什么
  var dispatch = queue.dispatch = dispatchAction.bind(null, currentlyRenderingFiber$1, queue);
  // 返回目标数组，dispatch 其实就是示例中常常见到的 setXXX 这个函数，想不到吧？哈哈
  return [hook.memoizedState, dispatch];
}
```

从这段源码中我们可以看出，**mounState 的主要工作是初始化 Hooks**。在整段源码中，最需要关注的是 mountWorkInProgressHook 方法，它为我们道出了 Hooks 背后的数据结构组织形式。以下是 mountWorkInProgressHook 方法的源码：

复制代码

```
function mountWorkInProgressHook() {
  // 注意，单个 hook 是以对象的形式存在的
  var hook = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null
  };
  if (workInProgressHook === null) {
    // 这行代码每个 React 版本不太一样，但做的都是同一件事：将 hook 作为链表的头节点处理
    firstWorkInProgressHook = workInProgressHook = hook;
  } else {
    // 若链表不为空，则将 hook 追加到链表尾部
    workInProgressHook = workInProgressHook.next = hook;
  }
  // 返回当前的 hook
  return workInProgressHook;
}
```

到这里可以看出，**hook 相关的所有信息收敛在一个 hook 对象里，而 hook 对象之间以单向链表的形式相互串联**。

接下来我们再看更新过程的大图：

![图片13.png](https://s0.lgstatic.com/i/image/M00/67/59/Ciqc1F-hJTGANs5yAAD4e6ACv8Q643.png)

根据图中高亮部分的提示不难看出，首次渲染和更新渲染的区别，在于调用的是 mountState，还是 updateState。mountState 做了什么，你已经非常清楚了；而 updateState 之后的操作链路，虽然涉及的代码有很多，但其实做的事情很容易理解：**按顺序去遍历之前构建好的链表，取出对应的数据信息进行渲染**。

我们把 mountState 和 updateState 做的事情放在一起来看：mountState（首次渲染）构建链表并渲染；updateState 依次遍历链表并渲染。

看到这里，你是不是已经大概知道怎么回事儿了？没错，**hooks 的渲染是通过“依次遍历”来定位每个 hooks 内容的。如果前后两次读到的链表在顺序上出现差异，那么渲染的结果自然是不可控的**。

这个现象有点像我们构建了一个长度确定的数组，数组中的每个坑位都对应着一块确切的信息，后续每次从数组里取值的时候，只能够通过索引（也就是位置）来定位数据。也正因为如此，在许多文章里，都会直截了当地下这样的定义：Hooks 的本质就是数组。但读完这一课时的内容你就会知道，**Hooks 的本质其实是链表**。

接下来我们把这个已知的结论还原到 PersonalInfoComponent 里去，看看实际项目中，变量到底是怎么发生变化的。

### 站在底层视角，重现 PersonalInfoComponent 组件的执行过程

我们先来复习一下修改过后的 PersonalInfoComponent 组件代码：

复制代码

```
import React, { useState } from "react";
// isMounted 用于记录是否已挂载（是否是首次渲染）
let isMounted = false;
function PersonalInfoComponent() {
  // 定义变量的逻辑不变
  let name, age, career, setName, setCareer;
  // 这里追加对 isMounted 的输出，这是一个 debug 性质的操作
  console.log("isMounted is", isMounted);
  // 这里追加 if 逻辑：只有在首次渲染（组件还未挂载）时，才获取 name、age 两个状态
  if (!isMounted) {
    // eslint-disable-next-line
    [name, setName] = useState("修言");
    // eslint-disable-next-line
    [age] = useState("99");
    // if 内部的逻辑执行一次后，就将 isMounted 置为 true（说明已挂载，后续都不再是首次渲染了）
    isMounted = true;
  }
  // 对职业信息的获取逻辑不变
  [career, setCareer] = useState("我是一个前端，爱吃小熊饼干");
  // 这里追加对 career 的输出，这也是一个 debug 性质的操作
  console.log("career", career);
  // UI 逻辑的改动在于，name 和 age 成了可选的展示项，若值为空，则不展示
  return (
    <div className="personalInfo">
      {name ? <p>姓名：{name}</p> : null}
      {age ? <p>年龄：{age}</p> : null}
      <p>职业：{career}</p>
      <button
        onClick={() => {
          setName("秀妍");
        }}
      >
        修改姓名
      </button>
    </div>
  );
}
export default PersonalInfoComponent;
```

从代码里面，我们可以提取出来的 useState 调用有三个：

复制代码

```
[name, setName] = useState("修言");
[age] = useState("99");
[career, setCareer] = useState("我是一个前端，爱吃小熊饼干");
```

这三个调用在首次渲染的时候都会发生，伴随而来的链表结构如图所示：

![图片14.png](https://s0.lgstatic.com/i/image/M00/67/59/Ciqc1F-hJUWAe27kAAC_6mxli_Q918.png)

当首次渲染结束，进行二次渲染的时候，实际发生的 useState 调用只有一个：

复制代码

```
useState("我是一个前端，爱吃小熊饼干")
```

而此时的链表情况如下图所示：

![图片15.png](https://s0.lgstatic.com/i/image/M00/67/65/CgqCHl-hJeCAY_aoAAF7Tt5bK8k880.png)

我们再复习一遍更新（二次渲染）的时候会发生什么事情：updateState 会依次遍历链表、读取数据并渲染。注意这个过程就像从数组中依次取值一样，是完全按照顺序（或者说索引）来的。因此 React 不会看你命名的变量名是 career 还是别的什么，它只认你这一次 useState 调用，于是它难免会认为：**喔，原来你想要的是第一个位置的 hook 啊**。

然后就会有下面这样的效果：

![图片16.png](https://s0.lgstatic.com/i/image/M00/67/65/CgqCHl-hJe2ATIhGAAHpze3gFHg893.png)

如此一来，career 就自然而然地取到了链表头节点 hook 对象中的“秀妍”这个值。

### 总结

三个课时学完了，到这里，我们对 React-Hooks 的学习，才终于算是告一段落。

在过去的三个课时里，我们摸排了“动机”，认知了“工作模式”，最后更是结合源码、深挖了一把 React-Hooks 的底层原理。我们所做的这所有的努力，都是为了能够真正吃透 React-Hooks，不仅要确保实践中不出错，还要做到面试时有底气。

接下来，我们就将进入整个专栏真正的“深水区”，逐步切入“虚拟 DOM → Diff 算法 → Fiber 架构”这个知识链路里来。在后续的学习中，我们将延续并且强化这种“刨根问底”的风格，紧贴源码、原理和面试题来向 React 最为核心的部分发起挑战。真正的战斗，才刚刚开始，大家加油~