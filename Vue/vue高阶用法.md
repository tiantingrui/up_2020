# vue高阶用法

#### 主要内容：

+ 自定义指令 directive
+ 双向绑定 v-model
+ 组件设计 slot
+ 组件通信
+ 插件 Mixin
+ 组件复用



## 自定义指令

由于之前整理了一篇关于指令的文章。在这里就不阐开描述了。

自定义指令文章链接：https://mp.weixin.qq.com/s/c0oVAHtPCNYK6xsfnQazbQ



## 双向绑定 v-model

### v-model

> vue中v-model用到的设计模式：策略模式

用于在表单元素 `input`、`textarea`、`select` 等上创建双向数据绑定的语法糖

+ `select` 元素 使用了 value 属性 和 change 事件 （子到父）
+ `textarea` 和 `input` 元素使用 value 属性 和 input 事件
+ 单选框 和 多选框 使用 checked 属性 和 change事件

```html
<input type='checkbox'>
<input type='radio'>
<-- vue 提供 .lazy 修饰符 将input事件转变为 change 事件 -->
<input v-model.lazy='msg'>
```

举个栗子

```vue
<template>
    <div>
        <h3>Text</h3>
        {{ text }}
        <!-- .lazy 将input事件转变为 change事件 -->
        <input type="text" v-model.lazy="text">
        <input type="text" v-model="text">
        <input type="text" :value="text" @input="text = $event.target.value">
        <!-- .trim 去除空格 -->
        <textarea v-model.trim="text"></textarea>
        <!-- .number将str 转换成 number -->
        <input type="number" v-model.number='num'>
        {{ typeof num }}
    </div>
</template>
<script>
export default {
    data() {
        return {
            tetx: '',
            num: 0
        }
    }
}
</script>
```



### 自定义组件的 v-model

在子组件上定义一个model 选项，有两个键值对，标记了从父到子（prop）和从子到父（event）这两个通道

```vue
<script>
export default {
    model: {
        prop: 'selected',
        event: 'change'
    },
    props: ['list', 'selected'],
    data() {
        return {
            tetx: '',
            num: 0,
            showButton: false 
        }
    },
    methods: {
        select(i) {
            this.showBottom = false;
            this.$emit('change', i)
        }
    }
}
</script>
```



举个栗子：（自定义一个select组件）

```vue
// 父组件 SCustom.vue
<template>
    <div>
        <h3>Custom</h3>
        <s-custom-select :selected='selected' :list='list'></s-custom-select>
        你选择了： {{ selected.name }}
    </div>
</template>

<script>
import SCustomSelect from './SCustomSelect'

export default {
    components: {
        SCustomSelect
    },
    data() {
        let list = [
            {
                name: '霍乱',
                value: 'A'
            },
            {
                name: '鼠疫',
                value: 'B'
            },
            {
                name: '甲流',
                value: 'C'
            }
        ]
        return {
            selected: list[0],
            list: list
        }
    },
}
</script>
```

```vue
// 子组件 SCustomSelect.vue
<template>
    <div>
        <div class='top' @click="showButtom = !showButton"> {{ selected.name }} </div>
        <div class="buttom" v-if='showButtom'>
            <div v-for="i in list" :key="i.value" @click="select(i)">{{ i.name }}</div>
        </div>
    </div>
</template>

<script>
export default {
    model: {
        prop: 'selected',
        event: 'change'
    },
    props: ['list', 'selected'],
    data() {
        return {
            showButtom: false
        }
    },
    methods: {
        select(i) {
            this.$emit('change', i)
            this.showButtom = false
        }
    }
}
</script>

<style scoped>
.top {
    border: 1px solid #999;
    padding: 2px;
}
.bottom {
    position: relative;
    border: 1px solid #999;
    top: -1px;
}
</style>
```



## 组件设计（slot）

### 插槽内容

> Vue实现了一套内容分发的API，将`<slot>`元素作为承载分发内容的出口

先来看一个栗子：

```html
<navigation-link url="/profile">
  Your Profile
</navigation-link>
```

然后你在`<navigation-link>`的模板中可能会写为：

```html
<a
  v-bind:href="url"
  class="nav-link"
>
  <slot></slot>
</a>
```

当组件渲染的时候，`<slot></slot>` 将会被替换为“Your Profile”。

**插槽内可以包含任何模板代码**，

+ 包括 HTML：

```html
<navigation-link url="/profile">
  <!-- 添加一个 Font Awesome 图标 -->
  <span class="fa fa-user"></span>
  Your Profile
</navigation-link>
```

+ 甚至其他的组件：

```html
<navigation-link url="/profile">
  <!-- 添加一个图标的组件 -->
  <font-awesome-icon name="user"></font-awesome-icon>
  Your Profile
</navigation-link>
```

**如果 `<navigation-link>` 的 `template` 中**没有**包含一个 `<slot>` 元素，则该组件起始标签和结束标签之间的任何内容都会被抛弃。**



### 编译作用域

当你想在一个插槽中使用数据时，比如

```html
<navigation-link url="/profile">
  Logged in as {{ user.name }}
</navigation-link>
```

该插槽跟模板的其他地方一样可以访问相同的实例property(也就是相同的作用域)，而不能访问`<navigation-link>`的作用域。例如 `url`是访问不到的

```html
<navigation-link url="/profile">
  Clicking here will send you to: {{ url }}
  <!--
  这里的 `url` 会是 undefined，因为其 (指该插槽的) 内容是
  _传递给_ <navigation-link> 的而不是
  在 <navigation-link> 组件*内部*定义的。
  -->
</navigation-link>
```

作为一条规则，请记住：

> **父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的**



### Fallback Content(为插槽提供一个默认值)

顾明思议，就是为`slot`添加一个默认值

举个栗子（在一个`<dubmit-button>`组件中）

```html
<button type="submit">
  <slot>Submit</slot>
</button>
```

然后我们在父组件中使用这个子组件

```html
<submit-button></submit-button>
```

它实际上会被渲染为：

```html
<button type="submit">
  Submit
</button>
```

但是如果我们提供内容：

```html
<submit-button>
  Save
</submit-button>
```

实际上会渲染为：

```html
<button type="submit">
  Save
</button>
```



### 具名插槽（Named Slots）

> `<slot>`元素有一个特殊的attribute: `name`. 这个attribute 可以用来定义额外的插槽：

有时候我们需要多个插槽，例如对于一个带有如下模板`<base-layout>`组件：

```html
<div>
    <header>
    <!-- 我们希望把也头放这里 -->
    </header>
    <main>
    <!-- 我们希望把主要内容放这里 -->
    </main>
    <footer>
    <!-- 我们希望把页脚放这里 -->
    </footer>
</div>
```

对于这样的情况我们可以用到具名插槽，我们来看一看用法：

```html
<div>
    <header>
        <slot name='header'></slot>
    </header>
    <main>
    	<slot></slot>
    </main>
    <footer>
    	<slot name='header'></slot>
    </footer>
</div>
```

**一个不带有 `name`的 `<slot>`出口带有隐含的名字 ‘default’**



在向具名插槽提供内容的时候，我们可以在一个`<template>`元素上使用 `v-slot`指令，并以 `v-slot` 的参数的姓氏提供其名称：

```html
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

现在 `<template>` 元素中的所有内容都将会被传入相应的插槽。任何没有被包裹在带有 `v-slot` 的 `<template>` 中的内容都会被视为默认插槽的内容。

然而，如果你希望更明确一些，仍然可以在一个`<template>`中包裹默认插槽的内容：

```html
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <template v-slot:default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

任何一种写法都会渲染出：

```html
<div class="container">
  <header>
    <h1>Here might be a page title</h1>
  </header>
  <main>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </main>
  <footer>
    <p>Here's some contact info</p>
  </footer>
</div>
```

注意 **`v-slot` 只能添加在 `<template>` 上**

还有一种例外情况：https://cn.vuejs.org/v2/guide/components-slots.html

#### 具名插槽的缩写

> 2.6.0 新增
>
> v-slot:   ===  #

跟`v-on`和`v-bind`一样， `v-slot`也有缩写，即把参数之前的所有内容（`v-slot:`）替换为字符 `#`

例如 `v-slot:header` 可以被重写为 `#header`：

```html
<base-layout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

然而，和其它指令一样，该缩写只在其有参数的时候才可用。这意味着以下语法是无效的：

```html
<!-- 这样会触发一个警告 -->
<current-user #="{ user }">
  {{ user.firstName }}
</current-user>
```

如果你希望使用缩写的话，你必须始终以明确插槽名取而代之：

```html
<current-user #default="{ user }">
  {{ user.firstName }}
</current-user>
```



### 作用域插槽

#### 插槽prop

**用途：** 让插槽内容能够访问子组件中才有的数据是很有用的。

假设这里有一个组件 `<current-user>` 

```html
<span>
    <slot v-bind:user='user'>
    	{{user.name}}
    </slot>
</span>
```

绑定在 `<slot>` 元素上的 attribute 被称为 **插槽prop** ，现在在父级作用域中，我们可以使用带值的 `v-slot` 来定义我们提供的插槽 prop 的名字

```html
<current-user>
    <template v-slot:default='slotProps'>
    	{{ slotProps.user.name }}
    </template>
</current-user>
```

在这个例子中。我们选择将包含所有插槽 prop 的对象命名为 `slotProps` , 这里的名字不是固定，选择一个你喜欢的名字即可。



#### 独占默认插槽的缩写语法

什么意识呢？就是说上述的栗子中 提供的内容只有默认插槽时，组件的标签可以被当做插槽的模板来使用，这样我们就可以把 `v-slot` 直接用在组件上：

像这样子：

```html
<current-user v-slot:default='slotProps'>
	{{ slotProps.user.name }}
</current-user>
```

还有更简单的一种写法，就像假定未指明的内容对应默认插槽一样，不带参数的 `v-slot` 被假定对应默认插槽：

```html
<current-user v-slot='slotProps'>
    {{ slotProps.user.name }}
</current-user>
```

注意默认插槽的缩写语法**不能**和具名插槽混用，因为它会导致作用域不明确：

```html
<!-- 无效，会导致警告 -->
<current-user v-slot="slotProps">
  {{ slotProps.user.firstName }}
  <template v-slot:other="otherSlotProps">
    slotProps is NOT available here
  </template>
</current-user>
```

只要出现多个插槽，请始终为*所有的*插槽使用完整的基于 `<template>` 的语法：

```html
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>

  <template v-slot:other="otherSlotProps">
    ...
  </template>
</current-user>
```



#### 解构插槽Prop (推荐)

也可以使用ES6的解构语法来传入具体的插槽prop

```html
<current-user v-slot='{user}'>
	{{ user.name }}
</current-user>
```

**起别名**

```html
<current-user v-slot='{user: terry}'>
	{{ terry.name }}
</current-user>
```

**默认值（fallback content）**

你甚至可以定义后备内容，用于插槽 prop 是 undefined 的情形：

```html
<current-user v-slot="{ user = { firstName: 'Guest' } }">
  {{ user.firstName }}
</current-user>
```



### 动态插槽名

[动态指令参数](https://cn.vuejs.org/v2/guide/syntax.html#动态参数)也可以用在 `v-slot` 上，来定义动态的插槽名：

```html
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>
</base-layout>

<!-- 对比常见的动态指令参数 -->
<a v-bind:[attributeName]="url"> ... </a>
<a v-on:[eventName]="doSomething"> ... </a>
```

