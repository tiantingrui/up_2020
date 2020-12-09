# 为什么React16要更改组件的生命周期？



我将抱着帮你做到“知其所以然”的目的，以 React 的基本原理为引子**我将抱着帮你做到“知其所以然”的目的，以 React 的基本原理为引子，对 React 15、React 16 两个版本的生命周期进行探讨、比对和总结，通过搞清楚一个又一个的“Why”，来帮你建立系统而完善的生命周期知识体系。**



#### 生命周期背后的设计思想：把握React中的“大方向”

在介绍具体的生命周期之前，我想先带着你初步了解 React 框架中的一些关键的设计思想，以便为你后续的学习提供不可或缺的“加速度”。

如果你经常翻阅 React 官网的文章，你会发现**“组件”和“虚拟DOM”** 这两个词的出镜率是非常高德，它们是 React 基本原理中极为关键的两个概念，也是我们这次深入学习生命周期的切入点。



#### 虚拟DOM: 核心算法的基石

在jsx部分，我们已经知道了虚拟DOM的基本形态（不太了解的可以先翻阅前一篇文章）。我们需要简单了解下虚拟 DOM 在整个 React 工作流中的作用。

组件在初始化时，会调用生命周期中的 render 方法，**生成虚拟DOM** ，然后再通过 **ReactDOM.render** 方法，实现虚拟DOM到真实DOM的转换

当组件更新时，会再次通过 render 方法生成 **新的虚拟DOM**，然后借助 **diff**(这是一个非常关键的算法，后面我会专门讲解)**定位出两次虚拟DOM的差异**，从而针对发生变化的真实DOM做定向更新

以上就是React 框架算法的大致流程，对于这套关键的工作流来说，**“虚拟DOM”** 是所有操作的大前提，是核心算法的基石。



#### 组件化：工程化思想在框架中的落地

组件化是一种优秀的软件设计思想，也是 React 团队在研发效能方面所做的一个重要的努力。

在一个 React 项目中，几乎所有的可见/不可见的内容都可以被抽离为各种各样的组件，每个组件既是“封闭”的，也是“开放”的。

所谓“封闭”，主要是针对“渲染工作流”（指从组件数据改变到组件实际更新发生的过程）来说的。在组件自身的渲染工作流中，每个组件都只处理它内部的渲染逻辑。在没有数据流交互的情况下，组件与组件之间可以做到“各自为政”。

而所谓“开放”，则是针对组件间通信来说的。React 允许开发者基于“单向数据流”的原则完成组件间的通信。而组件之间的通信又将改变通信双方/某一方内部的数据，进而对渲染结果构成影响。所以说在数据这个“红娘”的牵线搭桥之下，组件之间又是彼此开放的，是可以相互影响的。

这一“开放”与“封闭”兼具的特性，使得 React 组件既专注又灵活，具备高度的可重用性和可维护性。



#### 生命周期方法的本质：组件的“灵魂”与“躯干”

+ **render方法为React组件的灵魂**
+ **其他生命周期方法为躯干**

注意：这里提到的render 方法，和之前说的 **ReactDOM.render** 不是一个东西，它指的是 React 组件内部的这个生命周期方法：

```jsx
class LifeCycle extends React.Component {
    render() {
        console.log("render方法执行");
        return (
          <div className="container">
            this is content
          </div>
    }
}
```

前面咱们介绍了虚拟 DOM、组件化，倘若把这两块知识整合一下，你就会发现这两个概念似乎都在围着 render 这个生命周期打转：虚拟 DOM 自然不必多说，它的生成都要仰仗 render；而组件化概念中所提及的“渲染工作流”，这里指的是从组件数据改变到组件实际更新发生的过程，这个过程的实现同样离不开 render。

由此看来，render 方法在整个组件生命周期中确实举足轻重，它担得起“灵魂”这个有分量的比喻。那么如果将 render 方法比作组件的“灵魂”，render 之外的生命周期方法就完全可以理解为是组件的“躯干”。

“躯干”未必总是会做具体的事情（比如说我们可以选择性地省略对 render 之外的任何生命周期方法内容的编写），而“灵魂”却总是充实的（render 函数却坚决不能省略）；倘若“躯干”做了点什么，往往都会直接或间接地影响到“灵魂”（因为即便是 render 之外的生命周期逻辑，也大部分是在为 render 层面的效果服务）；“躯干”和“灵魂”一起，共同构成了 React 组件完整而不可分割的“生命时间轴”。



## 拆解React生命周期：从React15说起

![image-20201209092019584](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20201209092019584.png)

#### Mounting 阶段：组件的初始化渲染（挂载）

挂载过程在组件的一生中仅会发生一次，在这个过程中，组件被初始化，然后会被渲染到真实 DOM 里，完成所谓的“首次渲染”。

在挂载阶段，一个 React 组件会按照顺序经历如下图所示的生命周期：

![image-20201209092127275](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20201209092127275.png)

首先我们来看 constructor 方法，该方法仅仅在挂载的时候被调用一次，我们可以在该方法中对 this.state 进行初始化：

```jsx
constructor(props) {
  console.log("进入constructor");
  super(props);
  // state 可以在 constructor 里初始化
  this.state = { text: "子组件的文本" };
}
```

componentWillMount、componentDidMount 方法同样只会在挂载阶段被调用一次。其中 componentWillMount 会在执行 render 方法前被触发，一些同学习惯在这个方法里做一些初始化的操作，但这些操作往往会伴随一些风险或者说不必要性（这一点大家先建立认知）。

接下来 render 方法被触发。注意 render 在执行过程中并不会去操作真实 DOM（也就是说不会渲染），它的职能是**把需要渲染的内容返回出来**。真实 DOM 的渲染工作，在挂载阶段是由 ReactDOM.render 来承接的。

componentDidMount 方法在渲染结束后被触发，此时因为真实 DOM 已经挂载到了页面上，我们可以在这个生命周期里执行真实 DOM 相关的操作。此外，类似于异步请求、数据初始化这样的操作也大可以放在这个生命周期来做（侧面印证了 componentWillMount 真的很鸡肋）。

这一整个流程对应的其实就是我们 Demo 页面刚刚打开时，组件完成初始化渲染的过程。下图是 Demo 中的 LifeCycle 组件在挂载过程中控制台的输出，你可以用它来验证挂载过程中生命周期顺序的正确性：

![image-20201209092411805](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20201209092411805.png)

#### Updating 阶段：组件的更新

组件的更新分为两种：一种是由父组件更新触发的更新；另一种是组件自身调用自己的 setState 触发的更新。这两种更新对应的生命周期流程如下图所示：

![image-20201209092445956](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20201209092445956.png)

**componentWillReceiProps 到底是由什么触发的？**

从图中你可以明显看出，父组件触发的更新和组件自身的更新相比，多出了这样一个生命周期方法：

```jsx
componentWillReceiveProps(nextProps)
```

在这个生命周期方法里，nextProps 表示的是接收到新 props 内容，而现有的 props （相对于 nextProps 的“旧 props”）我们可以通过 this.props 拿到，由此便能够感知到 props 的变化。

写到这里，就不得不在“变化”这个动作上深挖一下了。我在一些社区文章里，包括一些候选人面试时的回答里，都不约而同地见过/听过这样一种说法：**componentWillReceiveProps 是在组件的 props 内容发生了变化时被触发的。**

**这种说法不够严谨**。

> 如果父组件导致组件重新渲染，即使props没有更改，也会调用此方法（componentReceiveProps）。
>
> 如果只想处理更改，请确保进行当前值与变更值的比较。
>
> ---- React 官方

**componentReceiveProps 并不是由 props 的变化触发的，而是由父组件的更新触发的**，这个结论，请你谨记。

**组件自身 setState 触发的更新**

先来说说 componentWillUpdate 和 componentDidUpdate 这一对好基友。

componentWillUpdate 会在 render 前被触发，它和 componentWillMount 类似，允许你在里面做一些不涉及真实 DOM 操作的准备工作；而 componentDidUpdate 则在组件更新完毕后被触发，和 componentDidMount 类似，这个生命周期也经常被用来处理 DOM 操作。此外，我们也常常将 componentDidUpdate 的执行作为子组件更新完毕的标志通知到父组件。

**render 与性能：初识 shouldComponentUpdate**

这里需要重点提一下 shouldComponentUpdate 这个生命周期方法，它的调用形式如下所示：

```jsx
shouldComponentUpdate(nextProps, nextState)
```

render 方法由于伴随着对虚拟 DOM 的构建和对比，过程可以说相当耗时。而在 React 当中，很多时候我们会不经意间就频繁地调用了 render。为了避免不必要的 render 操作带来的性能开销，React 为我们提供了 shouldComponentUpdate 这个口子。

React 组件会根据 shouldComponentUpdate 的返回值，来决定是否执行该方法之后的生命周期，进而决定是否对组件进行**re-render**（重渲染）。shouldComponentUpdate 的默认值为 true，也就是说“无条件 re-render”。在实际的开发中，我们往往通过手动往 shouldComponentUpdate 中填充判定逻辑，或者直接在项目中引入 PureComponent 等最佳实践，来实现“有条件的 re-render”。

关于 shouldComponentUpdate 及 PureComponent 对 React 的优化，我们会在后续的性能小节中详细展开。这里你只需要认识到 shouldComponentUpdate 的基本使用及其**与 React 性能之间的关联关系**即可。



#### Unmounting 阶段：组件的卸载

组件的销毁阶段本身是比较简单的，只涉及一个生命周期，如下图所示：

![image-20201209092957639](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20201209092957639.png)

这个生命周期本身不难理解，我们重点说说怎么触发它。组件销毁的常见原因有以下两个。

- 组件在父组件中被移除了：这种情况相对比较直观，对应的就是我们上图描述的这个过程。
- 组件中设置了 key 属性，父组件在 render 的过程中，发现 key 值和上一次不一致，那么这个组件就会被干掉。

在这里，你只需要理解到1就可以了，对于2这种情况，你只需要记住有这样的一种现象就可以了，这就够了，至于组件里面为什么要设置 key，为什么 key 改变后组件就必须被干掉？要回答这个问题，需要你先理解 React 的“调和过程”，而“调和过程”也会是我们第二模块中重点讲解的一个内容。这里我先把这个知识点点出来，方便你定位我们整个知识体系里的**重难点**。

#### 先来总结一下上面的内容

在开篇，我们对React 设计思想中的“虚拟 DOM”和“组件化”这两个关键概念形成了初步的理解，同时也对 React 15 中的生命周期进行了系统的学习和总结。到这里，你已经了解到了 React 生命周期在很长一段“过去”里的形态。

而在 React 16 中，组件的生命周期其实已经发生了一系列的变化。这些变化到底是什么样的，它们背后又蕴含着 React 团队怎样的思量呢？

古人说“以史为镜，可以知兴衰”。那么我们就一起来看看React16新的生命周期是什么样子。

------



## 进化的生命周期方法：React 16 生命周期工作流详解

![image-20201209093905624](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20201209093905624.png)

**上图是React16.3的生命周期图**

这里之所以特意将版本号精确到了小数点后面一位，是因为在**React 16.4**之后，React 生命周期在之前版本的基础上又经历了一次微调。不过你先不用着急，在理解 16.3 生命周期的基础上，掌握这个“微调”对你来说将易如反掌。

接下来，我会先把上面这张 React 16.3 生命周期大图中所涉及的内容讲清楚，然后再对 16.4 的改动进行介绍。还是老规矩，这里我先提供一个 Demo，它将辅助你理解新的生命周期。Demo 代码如下：

```jsx
import React from "react";
import ReactDOM from "react-dom";
// 定义子组件
class LifeCycle extends React.Component {
  constructor(props) {
    console.log("进入constructor");
    super(props);
    // state 可以在 constructor 里初始化
    this.state = { text: "子组件的文本" };
  }

  // 初始化/更新时调用
  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps方法执行");
    return {
      fatherText: props.text
    }
  }

  // 初始化渲染时调用
  componentDidMount() {
    console.log("componentDidMount方法执行");
  }

  // 组件更新时调用
  shouldComponentUpdate(prevProps, nextState) {
    console.log("shouldComponentUpdate方法执行");
    return true;
  }

  // 组件更新时调用
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate方法执行");
    return "haha";
  }

  // 组件更新后调用
  componentDidUpdate(nextProps, nextState, valueFromSnapshot) {
    console.log("componentDidUpdate方法执行");
    console.log("从 getSnapshotBeforeUpdate 获取到的值是", valueFromSnapshot);
  }

  // 组件卸载时调用
  componentWillUnmount() {
    console.log("子组件的componentWillUnmount方法执行");
  }

  // 点击按钮，修改子组件文本内容的方法
  changeText = () => {
    this.setState({
      text: "修改后的子组件文本"
    });
  };

  render() {
    console.log("render方法执行");
    return (
      <div className="container">
        <button onClick={this.changeText} className="changeText">
          修改子组件文本内容
        </button>
        <p className="textContent">{this.state.text}</p>
        <p className="fatherContent">{this.props.text}</p>
      </div>
    );
  }
}

// 定义 LifeCycle 组件的父组件

class LifeCycleContainer extends React.Component {
  // state 也可以像这样用属性声明的形式初始化
  state = {
    text: "父组件的文本",
    hideChild: false
  };
  // 点击按钮，修改父组件文本的方法
  changeText = () => {
    this.setState({
      text: "修改后的父组件文本"
    });
  };

  // 点击按钮，隐藏（卸载）LifeCycle 组件的方法
  hideChild = () => {
    this.setState({
      hideChild: true
    });
  };
  render() {
    return (
      <div className="fatherContainer">
        <button onClick={this.changeText} className="changeText">
          修改父组件文本内容
        </button>
        <button onClick={this.hideChild} className="hideChild">
          隐藏子组件
        </button>
        {this.state.hideChild ? null : <LifeCycle text={this.state.text} />}
      </div>
    );
  }
}

ReactDOM.render(<LifeCycleContainer />, document.getElementById("root"));

```

React 16 以来的生命周期也可以按照“挂载”“更新”和“卸载”三个阶段来看，所以接下来我们要做的事情仍然是分阶段拆解工作流程。在这个过程中，我将把 React 16 新增的生命周期方法，以及流程上相对于 React 15 产生的一些差异，作为我们学习的重点。对于和 React 15 保持一致的部分，这里不再重复讲解。

#### Mounting 阶段：组件的初始化渲染（挂载）

为了凸显 16 和 15 两个版本生命周期之间的差异，我将两个流程绘制到了同一张大图里，请看下面这张图：

![image-20201209094152648](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20201209094152648.png)

你现在可以打开开篇我给出的 Demo，将你的 React 版本更新到 16.3，然后运行这个项目，你就可以在控制台看到新的生命周期执行过程了。控制台的输出如图所示：

![image-20201209094217856](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20201209094217856.png)

##### 消失的 componentWillMount，新增的 getDerivedStateFromProps

从上图中不难看出，React 15 生命周期和 React 16.3 生命周期在挂载阶段的主要差异在于，**废弃了 componentWillMount，新增了 getDerivedStateFromProps**。

> 注：细心的你可能记得，React 16 对 render 方法也进行了一些改进。React 16 之前，render方法必须返回单个元素，而 React 16 允许我们返回元素数组和字符串。但本课时我们更加侧重讨论的是生命周期升级过程中的“主要矛盾”，也就是“工作流”层面的改变，故对现有方法的迭代细节，以及不在主要工作流里的[componentDidCatch](https://zh-hans.reactjs.org/docs/react-component.html#componentdidcatch) 等生命周期不再予以赘述。

一些同学在初次发现这个改变的时候，倾向于认为是 React 16.3 在试图用 getDerivedStateFromProps代替componentWillMount，这种想法是不严谨的。

##### getDerivedStateFromProps 不是 componentWillMount 的替代品

事实上，**componentWillMount 的存在不仅“鸡肋”而且危险，因此它并不值得被“代替”，它就应该被废弃。** 为了证明这点，我将在本文后续的“透过现象看本质”环节为大家细数 componentWillMount 的几宗“罪”。

> 注：细心的你可能记得，React 16 对 render 方法也进行了一些改进。React 16 之前，render方法必须返回单个元素，而 React 16 允许我们返回元素数组和字符串。但本课时我们更加侧重讨论的是生命周期升级过程中的“主要矛盾”，也就是“工作流”层面的改变，故对现有方法的迭代细节，以及不在主要工作流里的[componentDidCatch](https://zh-hans.reactjs.org/docs/react-component.html#componentdidcatch) 等生命周期不再予以赘述。

一些同学在初次发现这个改变的时候，倾向于认为是 React 16.3 在试图用 getDerivedStateFromProps代替componentWillMount，这种想法是不严谨的。

##### getDerivedStateFromProps 不是 componentWillMount 的替代品

事实上，**componentWillMount 的存在不仅“鸡肋”而且危险，因此它并不值得被“代替”，它就应该被废弃。** 为了证明这点，我将在本文后续的“透过现象看本质”环节为大家细数 componentWillMount 的几宗“罪”。

而 getDerivedStateFromProps 这个 API，其设计的初衷不是试图替换掉 **componentWillMount**，而是试图替换掉 **componentWillReceiveProps**，因此它有且仅有一个用途：**使用 props 来派生/更新 state**。

React 团队为了确保 getDerivedStateFromProps 这个生命周期的纯洁性，直接从命名层面约束了它的用途（getDerivedStateFromProps 直译过来就是“从 Props 里派生 State”）。所以，如果你不是出于这个目的来使用 getDerivedStateFromProps，原则上来说都是不符合规范的。

值得一提的是，getDerivedStateFromProps 在更新和挂载两个阶段都会“出镜”（这点不同于仅在更新阶段出现的 componentWillReceiveProps）。这是因为“派生 state”这种诉求不仅在 props 更新时存在，**在 props 初始化的时候也是存在的**。React 16 以提供特定生命周期的形式，对这类诉求提供了更直接的支持。

由此看来，挂载阶段的生命周期改变，并不是一个简单的“替换”逻辑，而是一个雄心勃勃的“进化”逻辑。

##### 认识 getDerivedStateFromProps

这个新生命周期方法的调用规则如下：

```jsx
static getDerivedStateFromProps(props, state)
```

在使用层面，你需要把握三个重点。

第一个重点是最特别的一点：**getDerivedStateFromProps 是一个静态方法**。静态方法不依赖组件实例而存在，因此你在这个方法内部是**访问不到 this** 的。若你偏要尝试这样做，必定报错，报错形式如下图所示：

![image-20201209094411447](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20201209094411447.png)

第二个重点，该方法可以接收两个参数：props 和 state，它们分别代表当前组件接收到的来自父组件的 props 和当前组件自身的 state。我们可以尝试在 Demo 中输出这两个参数看一看，输出效果如下图所示：

![image-20201209094429752](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20201209094429752.png)

可以看出，挂载阶段输出的 props 正是初始化阶段父组件传进来的 this.props 对象；而 state 是 LifeCycle 组件自身的 state 对象。

第三个重点，getDerivedStateFromProps 需要一个对象格式的返回值。如果你没有指定这个返回值，那么大概率会被 React 警告一番，警告内容如下图所示：

![image-20201209094459767](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20201209094459767.png)

**getDerivedStateFromProps 的返回值之所以不可或缺，是因为 React 需要用这个返回值来更新（派生）组件的 state**。因此当你确实不存在“使用 props 派生 state ”这个需求的时候，最好是直接省略掉这个生命周期方法的编写，否则一定记得给它 return 一个 null。

注意，**getDerivedStateFromProps 方法对 state 的更新动作并非“覆盖”式的更新**，**而是针对某个属性的定向更新**。比如这里我们在 getDerivedStateFromProps 里返回的是这样一个对象，对象里面有一个 fatherText 属性用于表示“父组件赋予的文本”：

```js
{
  fatherText: props.text
}
```

该对象并不会替换掉组件原始的这个 state：

```jsx
this.state = { text: "子组件的文本" };
```

而是仅仅针对 fatherText 这个属性作更新（这里原有的 state 里没有 fatherText，因此直接新增）。更新后，原有属性与新属性是共存的，如下图所示：

![image-20201209094554130](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20201209094554130.png)

#### Updating 阶段：组件的更新

![image-20201209094608712](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20201209094608712.png)

注意，咱们前面提到 React 16.4 对生命周期流程进行了“微调”，其实就调在了更新过程的getDerivedStateFromProps 这个生命周期上。先来看一张 React 16.4+ 的生命周期大图

![image-20201209094642654](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20201209094642654.png)

React 16.4 的挂载和卸载流程都是与 React 16.3 保持一致的，差异在于更新流程上：

- 在 React 16.4 中，**任何因素触发的组件更新流程**（包括由 this.setState 和 forceUpdate 触发的更新流程）都会触发 getDerivedStateFromProps；
- 而在 v 16.3 版本时，**只有父组件的更新**会触发该生命周期。

到这里，你已经对 getDerivedStateFromProps 相关的改变有了充分的了解。接下来，我们就基于这层了解，问出生命周期改变背后的第一个“Why”。

##### 改变背后的第一个“Why”：为什么要用 getDerivedStateFromProps 代替 componentWillReceiveProps？

对于 getDerivedStateFromProps 这个 API，React 官方曾经给出过这样的描述：

> 与 componentDidUpdate 一起，这个新的生命周期涵盖过时componentWillReceiveProps 的所有用例。

在这里，请你细细品味这句话，这句话里蕴含了下面两个关键信息：

- getDerivedStateFromProps 是作为一个**试图代替 componentWillReceiveProps** 的 API 而出现的；
- getDerivedStateFromProps**不能完全和 componentWillReceiveProps 画等号**，其特性决定了我们曾经在 componentWillReceiveProps 里面做的事情，不能够百分百迁移到getDerivedStateFromProps 里。

接下来我们就展开说说这两点。

- 关于 getDerivedStateFromProps 是如何代替componentWillReceiveProps 的，在“挂载”环节已经讨论过：getDerivedStateFromProps 可以代替 componentWillReceiveProps 实现**基于 props 派生 state**。
- 至于它为何不能完全和 componentWillReceiveProps 画等号，则是因为它过于“专注”了。这一点，单单从getDerivedStateFromProps 这个 API 名字上也能够略窥一二。原则上来说，它能做且只能做这一件事。

乍一看，原来的 API 能做的事情更多，现在的 API 却限制重重，难道是 React 16 的生命周期方法“退化”了？

当然不是。如果你对设计模式有所了解的话，就会知道，**一个 API 并非越庞大越复杂才越优秀**。或者说得更直接一点，庞大和复杂的 API 往往会带来维护层面的“灾难”。

说回 getDerivedStateFromProps 这个 API，它相对于早期的 componentWillReceiveProps 来说，正是做了“**合理的减法**”。而做这个减法的决心之强烈，从 getDerivedStateFromProps 直接被定义为 static 方法这件事上就可见一斑—— static 方法内部拿不到组件实例的 this，这就导致你无法在 getDerivedStateFromProps 里面做任何类似于 this.fetch()、不合理的 this.setState（会导致死循环的那种）这类可能会产生副作用的操作。

因此，getDerivedStateFromProps 生命周期替代 componentWillReceiveProps 的背后，**是 React 16 在强制推行“只用 getDerivedStateFromProps 来完成 props 到 state 的映射”这一最佳实践**。意在确保生命周期函数的行为更加可控可预测，从根源上帮开发者避免不合理的编程方式，避免生命周期的滥用；同时，也是在为新的 Fiber 架构铺路。

到这里，相信你已经对 getDerivedStateFromProps 吃得透透的了。至于什么是 Fiber 架构，这条路该怎么铺，你将在本课时后续的内容中找到答案。现在，我们得回到“更新”这条工作流里来，一起去看看getSnapshotBeforeUpdate 是怎么一回事儿。

##### 消失的 componentWillUpdate 与新增的 getSnapshotBeforeUpdate

咱们先来看看 getSnapshotBeforeUpdate 是什么：

```js
getSnapshotBeforeUpdate(prevProps, prevState) {
  // ...
}
```

这个方法和 getDerivedStateFromProps 颇有几分神似，它们都强调了“我需要一个返回值”这回事。区别在于 **getSnapshotBeforeUpdate 的返回值会作为第三个参数给到 componentDidUpdate**。**它的执行时机是在 render 方法之后，真实 DOM 更新之前**。在这个阶段里，我们可以**同时获取到更新前的真实 DOM 和更新前后的 state&props 信息**。

尽管在实际工作中，需要用到这么多信息的场景并不多，但在对于实现一些特殊的需求来说，没它还真的挺难办。这里我举一个非常有代表性的例子：实现一个内容会发生变化的滚动列表，要求根据滚动列表的内容是否发生变化，来决定是否要记录滚动条的当前位置。

这个需求的前半截要求我们对比更新前后的数据（感知变化），后半截则需要获取真实的 DOM 信息（获取位置），这时用 getSnapshotBeforeUpdate 来解决就再合适不过了。

对于这个生命周期，需要重点把握的是它与 componentDidUpdate 间的通信过程。

值得一提的是，这个生命周期的设计初衷，是为了“与 componentDidUpdate 一起，涵盖过时的 componentWillUpdate 的所有用例”（引用自 React 官网）。**getSnapshotBeforeUpdate 要想发挥作用，离不开 componentDidUpdate 的配合**。

那么换个角度想想，**为什么 componentWillUpdate 就非死不可呢**？说到底，还是因为它“挡了 Fiber 的路”。各位莫慌，咱们离真相越来越近了~

#### Unmounting 阶段：组件的卸载

我们先继续把完整的生命周期流程走完，以下是组件卸载阶段的示意图：

![image-20201209094929715](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20201209094929715.png)

卸载阶段的生命周期与 React 15 完全一致，只涉及 componentWillUnmount 这一个生命周期，此处不再重复讲解。

接下来，就让一切变化背后的”始作俑者“ Fiber 架构来和大家打个招呼吧！



### 透过现象看本质：React 16 缘何两次求变？

##### Fiber 架构简析

Fiber 是 React 16 对 React 核心算法的一次重写。关于 Fiber，我将在“模块二：核心原理”花大量的篇幅来介绍它的原理和细节。在本课时，你只需要 get 到这一个点：**Fiber 会使原本同步的渲染过程变成异步的**。

在 React 16 之前，每当我们触发一次组件的更新，React 都会构建一棵新的虚拟 DOM 树，通过与上一次的虚拟 DOM 树进行 diff，实现对 DOM 的定向更新。这个过程，是一个递归的过程。下面这张图形象地展示了这个过程的特征：

![image-20201209095005262](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20201209095005262.png)

如图所示，**同步渲染的递归调用栈是非常深的**，只有最底层的调用返回了，整个渲染过程才会开始逐层返回。**这个漫长且不可打断的更新过程，将会带来用户体验层面的巨大风险：\**同步渲染一旦开始，便会牢牢抓住主线程不放，直到递归彻底完成。在这个过程中，浏览器没有办法处理任何渲染之外的事情，会进入一种\**无法处理用户交互**的状态。因此若渲染时间稍微长一点，页面就会面临卡顿甚至卡死的风险。

而 React 16 引入的 Fiber 架构，恰好能够解决掉这个风险：**Fiber 会将一个大的更新任务拆解为许多个小任务**。每当执行完一个小任务时，**渲染线程都会把主线程交回去**，看看有没有优先级更高的工作要处理，确保不会出现其他任务被“饿死”的情况，进而避免同步渲染带来的卡顿。在这个过程中，**渲染线程不再“一去不回头”，而是可以被打断的**，这就是所谓的“异步渲染”，它的执行过程如下图所示：

![image-20201209095020055](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20201209095020055.png)

如果你初学 Fiber，对上面的两段描述感到陌生或者说“吃不透”，这都是正常的。在本课时，你大可不必如此苛求自己，只需对“同步渲染”和“异步渲染”这两个概念有一个大致的印象，同时把握住 Fiber 架构下“任务拆解”和“可打断”这两个特性即可。接下来，我们继续往下走，看看“同步”变“异步”这个过程，是如何对生命周期构成影响的。

##### 换个角度看生命周期工作流

Fiber 架构的重要特征就是**可以被打断的**异步渲染模式。但这个“打断”是有原则的，根据“**能否被打断**”这一标准，React 16 的生命周期被划分为了 render 和 commit 两个阶段，而 commit 阶段又被细分为了 pre-commit 和 commit。每个阶段所涵盖的生命周期如下图所示：

![image-20201209095040094](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20201209095040094.png)

我们先来看下三个阶段各自有哪些特征（以下特征翻译自上图）。

- render 阶段：纯净且没有副作用，可能会被 React 暂停、终止或重新启动。
- pre-commit 阶段：可以读取 DOM。
- commit 阶段：可以使用 DOM，运行副作用，安排更新。

**总的来说，render 阶段在执行过程中允许被打断，而 commit 阶段则总是同步执行的。**

为什么这样设计呢？简单来说，由于 render 阶段的操作对用户来说其实是“不可见”的，所以就算打断再重启，对用户来说也是零感知。而 commit 阶段的操作则涉及真实 DOM 的渲染，再狂的框架也不敢在用户眼皮子底下胡乱更改视图，所以这个过程必须用同步渲染来求稳。

##### 细说生命周期“废旧立新”背后的思考

在 Fiber 机制下，**render 阶段是允许暂停、终止和重启的**。当一个任务执行到一半被打断后，下一次渲染线程抢回主动权时，这个任务被重启的形式是“重复执行一遍整个任务”而非“接着上次执行到的那行代码往下走”。**这就导致 render 阶段的生命周期都是有可能被重复执行的**。

带着这个结论，我们再来看看 React 16 打算废弃的是哪些生命周期：

- componentWillMount；
- componentWillUpdate；
- componentWillReceiveProps。

这些生命周期的共性，**就是它们都处于 render 阶段，都可能重复被执行**，而且由于这些 API 常年被滥用，它们在重复执行的过程中都存在着不可小觑的风险。

别的不说，说说我自己在团队 code review 中见过的“骚操作”吧。在“componentWill”开头的生命周期里，你习惯于做的事情可能包括但不限于:

- setState()；
- fetch 发起异步请求；
- 操作真实 DOM。

这些操作的问题（或不必要性）包括但不限于以下 3 点：

**（1）完全可以转移到其他生命周期（尤其是 componentDidxxx）里去做**。

比如在 componentWillMount 里发起异步请求。很多同学因为太年轻，以为这样做就可以让异步请求回来得“早一点”，从而避免首次渲染白屏。

可惜你忘了，异步请求再怎么快也快不过（React 15 下）同步的生命周期。componentWillMount 结束后，render 会迅速地被触发，所以说**首次渲染依然会在数据返回之前执行**。这样做不仅没有达到你预想的目的，还会导致服务端渲染场景下的冗余请求等额外问题，得不偿失。

**（2）在 Fiber 带来的异步渲染机制下，可能会导致非常严重的 Bug**。

试想，假如你在 componentWillxxx 里发起了一个付款请求。由于 render 阶段里的生命周期都可以重复执行，在 componentWillxxx 被**打断 + 重启多次**后，就会发出多个付款请求。

比如说，这件商品单价只要 10 块钱，用户也只点击了一次付款。但实际却可能因为 componentWillxxx 被**打断 + 重启多次**而多次调用付款接口，最终付了 50 块钱；又或者你可能会习惯在 componentWillReceiveProps 里操作 DOM（比如说删除符合某个特征的元素），那么 componentWillReceiveProps 若是执行了两次，你可能就会一口气删掉两个符合该特征的元素。

结合上面的分析，我们再去思考 getDerivedStateFromProps 为何会在设计层面直接被约束为一个触碰不到 this 的静态方法，其背后的原因也就更加充分了——避免开发者触碰 this，就是在避免各种危险的骚操作。

**（3）即使你没有开启异步，React 15 下也有不少人能把自己“玩死”。**

比如在 componentWillReceiveProps  和 componentWillUpdate 里滥用 setState 导致重复渲染死循环的，大家都懂哈（邪魅一笑）。

总的来说，**React 16 改造生命周期的主要动机是为了配合 Fiber 架构带来的异步渲染机制**。在这个改造的过程中，React 团队精益求精，**针对生命周期中长期被滥用的部分推行了具有强制性的最佳实践**。这一系列的工作做下来，首先是**确保了 Fiber 机制下数据和视图的安全性**，同时也**确保了生命周期方法的行为更加纯粹、可控、可预测**。



#### 总结

大家已经对 React 15、16 两个版本的生命周期有了深入的掌握，同时对 React 生命周期的一系列的变化以及其背后的原因都有了深刻而健全的理解。

生命周期看似简单，但要想真正吃透，竟然需要挑战这么长的一个知识链路，实在不简单！

若你能够耐下心来彻底消化掉这篇文章，相信这世上定能多出一个靠谱的前端！