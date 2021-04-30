# Node - Sequelize -Mysql 入门(一)



本文记录笔者在node开发中，用sequlize 映射到 mysql 操作数据库表的操作。



## 安装依赖

这次的基本技术栈为 `express、sequelize、mysql`

```shell
$ yarn add express sequelize mysql2
```



## 连接到数据数据库

首先确保本地存在 数据库，由于笔者熟悉 `mysql`。此次选择mysql作为开发。

本地打开数据库，以便后续连接。

```js
// model/index.js
const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('databaseName', 'username', 'password', {
  host: 'localhost', // 端口
  dialect: 'mysql' // 数据库类型
})
```



## 测试数据库是否连接成功

可使用`.authenticate()`功能来测试连接是否正常

```js
try {
  await sequelize.authenticate()
  console.log('connecting mysql success!')
} catch(error) {
  console.log('unable to connect to the database')
}
```



## 断开连接

`sequelize.close()`





## 模型基础

------

模型是 Sequelize 的本质. 模型是代表数据库中表的抽象. 在 Sequelize 中,它是一个 [Model](https://sequelize.org/master/class/lib/model.js~Model.html) 的扩展类.

模型，在这里你可以粗略的理解为数据库中你要去创建的表。



### 模型定义

在Sequelize中可以使用两种等效的方式定义模型

+ 调用`sequelize.define(modelName, attributes, options)`
+ 扩展 `Model`并调用 `init(attributes, options)`

定义模型后，可通过其模型名称在 `sequelize.models`中使用该模型

为了学习一个示例,我们将考虑创建一个代表用户的模型,该模型具有一个 `firstName` 和一个 `lastName`. 我们希望将模型称为 `User`,并将其表示的表在数据库中称为 `Users`.

定义该模型的两种方法如下所示. 定义后,我们可以使用 `sequelize.models.User` 访问模型.

#### 使用 `sequelize.define`

```js
const {Sequelize, DataTypes} = require('sequelize')

// 连接数据库
// ...

const User = sequelize.define('User', {
  // 在这里定义模型属性
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    // allowNull 默认为 true
  }
}, {
  // 这是其他模型参数
})

// `sequelize.define` 会返回模型
console.log(User === sequelize.models.User) // true
```



#### 扩展Model

```js
const {Sequelize, DataTypes, Model} = require('sequelize')

// 连接数据库
// ...

class User extends Model {}

User.init({
  // 在这里定义模型属性
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    // allowNull 默认为 true
  }
}, {
  // 这是其他模型参数
  sequelize, // 我们需要传递连接实例
  modelName: 'User' // 我们需要选择模型名称
})

// 定义的模型是类本身
console.log(User === sequelize.models.User) // true
```



在内部,`sequelize.define` 调用 `Model.init`,因此两种方法本质上是等效的.



### 表名推断

请注意,在以上两种方法中,都从未明确定义表名(`Users`). 但是,给出了模型名称(`User`).

默认情况下,当未提供表名时,Sequelize 会自动将模型名复数并将其用作表名. 

当然,此行为很容易配置.



### 强制表名称等于模型名称

你可以使用 `freezeTableName: true` 参数停止 Sequelize 执行自动复数化. 这样,Sequelize 将推断表名称等于模型名称,而无需进行任何修改：

```js
sequelize.define('User', {
  // ... (属性)
}, {
  freezeTableName: true
})
```

上面的示例将创建一个名为 `User` 的模型,该模型指向一个也名为 `User` 的表.

也可以为 sequelize 实例全局定义此行为：

```js
// model/index.js
const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('databaseName', 'username', 'password', {
  host: 'localhost', // 端口
  dialect: 'mysql', // 数据库类型
	define: {
    freezeTableName: true
  }
})
```

这样,所有表将使用与模型名称相同的名称.



### 直接提供表名

你也可以直接直接告诉 Sequelize 表名称：

```js
sequelize.define('User', {
  // ... (属性)
}, {
  tableName: 'Employees'
});
```



### 模型同步

`model.sync(options)`

可以通过调用一个异步函数(返回一个Promise)[`model.sync(options)`](https://sequelize.org/master/class/lib/model.js~Model.html#static-method-sync). 通过此调用,Sequelize 将自动对数据库执行 SQL 查询. 请注意,这仅更改数据库中的表,而不更改 JavaScript 端的模型.

- `User.sync()` - 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
- `User.sync({ force: true })` - 将创建表,如果表已经存在,则将其首先删除
- `User.sync({ alter: true })` - 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.

举个例子

```js
await User.sync({ force: true });
console.log("用户模型表刚刚(重新)创建！");
```



### 一次同步所有模型

你可以使用 `sequelize.sync()`自动同步所有模型

```js
await sequelize.sync({force: true})
console.log('所有模型均已成功同步')
```



### 删除表

删除与模型相关的表

```js
await User.drop()
console.log('用户表已删除')
```

**删除所有表**

```js
await sequelize.drop()
console.log('所有表已删除！')
```



### 默认值

```js
sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    defaultValue: "John Doe"
  }
})
```



### 数据类型

你在模型中定义的每一列都必须具有数据类型. Sequelize 提供[很多内置数据类型](https://github.com/sequelize/sequelize/blob/master/lib/data-types.js). 要访问内置数据类型,必须导入 `DataTypes`：

```js
const {DataTypes} = require('sequelize')
```

#### **字符串**

```js 
DataTypes.STRING             // VARCHAR(255)
DataTypes.STRING(1234)       // VARCHAR(1234)
DataTypes.STRING.BINARY      // VARCHAR BINARY
DataTypes.TEXT               // TEXT
DataTypes.TEXT('tiny')       // TINYTEXT
DataTypes.CITEXT             // CITEXT          仅 PostgreSQL 和 SQLite.
```

#### **布尔**

```js
DataTypes.BOOLEAN            // TINYINT(1)
```

#### 数字

```js
DataTypes.INTEGER            // INTEGER
DataTypes.BIGINT             // BIGINT
DataTypes.BIGINT(11)         // BIGINT(11)

DataTypes.FLOAT              // FLOAT
DataTypes.FLOAT(11)          // FLOAT(11)
DataTypes.FLOAT(11, 10)      // FLOAT(11,10)

DataTypes.REAL               // REAL            仅 PostgreSQL.
DataTypes.REAL(11)           // REAL(11)        仅 PostgreSQL.
DataTypes.REAL(11, 12)       // REAL(11,12)     仅 PostgreSQL.

DataTypes.DOUBLE             // DOUBLE
DataTypes.DOUBLE(11)         // DOUBLE(11)
DataTypes.DOUBLE(11, 10)     // DOUBLE(11,10)

DataTypes.DECIMAL            // DECIMAL
DataTypes.DECIMAL(10, 2)     // DECIMAL(10,2)
```

#### 日期

```js
DataTypes.DATE       // DATETIME 适用于 mysql / sqlite, 带时区的TIMESTAMP 适用于 postgres
DataTypes.DATE(6)    // DATETIME(6) 适用于 mysql 5.6.4+. 支持6位精度的小数秒
DataTypes.DATEONLY   // 不带时间的 DATE
```



#### UUID

对于 UUID,使用 `DataTypes.UUID`. 对于 PostgreSQL 和 SQLite,它会是 `UUID` 数据类型;对于 MySQL,它则变成`CHAR(36)`. Sequelize 可以自动为这些字段生成 UUID,只需使用 `Sequelize.UUIDV1` 或 `Sequelize.UUIDV4` 作为默认值即可：

```js
{
  type: DataTypes.UUID,
  defaultValue: Sequelize.UUIDV4 // 或 Sequelize.UUIDV1
}
```

