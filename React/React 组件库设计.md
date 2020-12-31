# React 组件库设计

> 从 0 - 1 实现内部组件库设计

## 前端组件系统设计思路及模式

设计先行原则：对于组件库实现是一方面，但具体样式的设计一定要与业务相结合

详细设计接口：以 form 为例，讲解一下作为一个合格的组件库，我们需要设计那些接口



form组件设计需要注意的内容：

+ 校验
+ API设计

校验一般来讲，会依赖于一些基本的库，比如 `async-validator`，他是一个非常优秀的校验配置的 schema，允许我们通过简单的配置，内部对我们输入的值进行校验

### Async-validator 用法详解

async-validator 支持接受一定配置的校验规则，通过规则配置能够输出最终结果的校验关系。

```jsx
// async-validator
import schema from 'async-validator'

// 校验规则
const description = {
    username: [
        {
            required: true,
            message: '请填入用户名'
        },
        {
            min: 2,
            max: 20,
            message: '用户名长度为 2-20'
        }
    ]
}

// 根据校验规则构造一个validator
const validator = new schema(descriptor)
const data = {
    username: 'terry'
}
// 校验之后返回一个promise 
validator.validate(data)
    ,then(() => {
        // 校验成功
    })
    .catch(({errors, fields}) => {        
    })
```

同时配置的 schema中 也支持使用自定义的validator，通过validator 配置，可以配置一个同步函数来执行校验。

```js
var descriptor = {
  username: {
    type: 'string',
    required: true,
    validator: (rule, value) => value === 'terry'
  }
}
// validator 中配置了一个校验器，校验传入的value是否是 terry
```

我们也可以通过asyncValidator配置，来接受一个promise 进行异步的配置。

```js
var descriptor = {
  username: {
    type: 'string',
    required: true,
    asyncValidator: (rule, value) => {
      return new Promise((resolve, reject) => {
        if (value === 'terry') {
          return resolve()
        }
        return reject('用户名填写错误')
      })
    }
  }
}
```

async-validator 支持非常多的配置类型，以下是一些简介，具体使用可以在文档中查询

+ `string` ：默认为字符串，校验的数据必须为字符串
+ `number`：数字类型
+ `boolean`：布尔类型
+ `method`：函数类型
+ `regexp`：必须是RegExp的实例，或者十个合法的正则字符串



对于复杂的对象校验，我们可以通过fields配置，来深入的配置每一个 key的内容

```js
var descriptor = {
  address: {
    type: 'object', required: true,
    fields: {
      street: {type: 'string', required: true},
      city: {type: 'string', required: true},
      zip: {type: 'string', required: true, len: 8, message: 'invalid zip'}
    }
  },
  name: {type: 'string', required: true}
}
```

**async-validator对于组件设计来说非常重要，对于要设计Form组件的同学来说，务必理解其中的内容**









## 组件库开发、管理及调试模式

组件库一般会搭配 lerna、babel-plugin 或者一些可视化工具来进行设计、开发和管理

lerna 是一个多 package的包管理工具 : https://lernajs.bootcss.com/

它的作用是处理多个包在有相互依赖，都需要发布的时候，通过lerna的一个命令，就能同时更新多个包的版本和代码，我们就能方便的组织我们的代码库结构

它主要解决了以下几个问题：

1. 自动解决packages之间的依赖关系
2. 通过 `git` 检测文件改动，自动发布
3. 根据 `git` 提交记录，自动生成 CHANGLOG

lerna的使用非常简单，主要是以下两个命令

+ lerna bootstrap
+ lerna publish



#### babel-plugin

运行时的优化



















































