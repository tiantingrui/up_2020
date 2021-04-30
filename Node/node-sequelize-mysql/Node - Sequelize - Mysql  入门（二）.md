# Node - Sequelize - Mysql  入门（二）





## 模型实例

模型是 [ES6 类](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes). 类的实例表示该模型中的一个对象(该对象映射到数据库中表的一行). 



### 创建实例

**非常有用的捷径：`create`方法**

Sequelize 提供了 `create` 方法，该方法替代冗余的 build + save 方法（这里就演示这个用法了，就学最简单易用的）

```js
ice.sync({force: true})
	.then(async () => {
  	const terry = await ice.create({
      username: 'terry'
    })
		console.log(terry instanceof ice) // true
    console.log('username', terry.username) // terry
  	console.log(terry.toJSON()) 
  	//{
    //    iceId: '3b539ae3-db2b-4c3a-99bb-377bdbd2c092',
    //    id: 1,
    //    username: 'terry',
    //    updatedAt: 2020-12-22T07:17:04.596Z,
    //    createdAt: 2020-12-22T07:17:04.596Z
		//} 
	})
```

**注意：实例记录**

尝试将模型实例直接记录到 `console.log` 会产生很多问题,因为 Sequelize 实例具有很多附加条件. 相反,你可以使用 `.toJSON()` 方法

#### 默认值

内置实例将自动获得默认值

```js
const terry = ice.build({username: 'terry'})
console.log(terry.hobby) // coding
```



### 更新实例

如果你想更改实例的某个字段的值，则再次调用 `save`将相应的对其进行更新。

```js
const terry = await ice.create({username: 'terry'})
console.log(terry.username) // terry
terry.name = 'zmn'
// 数据库中的名称依然是 terry
await terry.save()
// 现在数据库中变为了 zmn
```



### 删除实例

通过`destroy`来删除实例

```js
const terry = await ice.create({username: 'terry'})
console.log(terry.username) // terry
await terry.destroy()
// 现在该条目已从数据库中删除
```



### 重载实例

通过`reload` 来重新加载实例

```js
const terry = await ice.create({username: 'terry'})
console.log(terry.username) // terry
terry.name = 'zmn'
// 数据库中的名称依然是 terry
await terry.reload()
console.log(terry.username) // terry
```

reload调用生成一个 `SELECT ` 查询，以从数据库中获取最新数据。



### 仅保留部分字段

通过传递一个列名数组,可以定义在调用 `save` 时应该保存哪些属性.

```js
const terry = await ice.create({username: 'terry'})
console.log(terry.username) // terry
console.log(terry.hobby) // coding
terry.username = 'zmn'
terry.hobby = 'playing'
await terry.save({fields: ['name']})
console.log(terry.username) // zmn
console.log(terry.hobby) // playing
// 本地对象设置为了 playing , 但数据库中存储的还是 coding
await terry.reload()
console.log(terry.username) // zmn
console.log(terry.hobby) // coding
```



## 模型查询（基础）

### 简单 SELECT 查询

`findAll` === `SELECT * FROM ...`

```js
ice.sync({force: true})
    .then(async () => {
        const terry = await ice.create({
            username: 'terry'
        })
        const users = await ice.findAll()
        console.log('All User', JSON.stringify(users, null, 2))
    })

```

#### SELECT 查询特定属性

选择某些特定属性,可以使用 `attributes` 参数：

```js
Model.findAll({
  attributes: ['foo', 'bar']
});
```

```sql
SELECT foo, bar FROM ...
```

可以使用嵌套数组来重命名属性：

```js
Model.findAll({
  attributes: ['foo', ['bar', 'baz'], 'qux']
});
```

```sql
SELECT foo, bar AS baz, qux FROM ...
```



### 应用 WHERE 子句

`where` 参数用于过滤查询.`where` 子句有很多运算符,可以从 [`Op`](https://www.sequelize.com.cn/variable/index.html#static-variable-Op) 中以 Symbols 的形式使用.

```js
Post.findAll({
  where: {
    authorId: 2
  }
});
// SELECT * FROM post WHERE authorId = 2
```

可以看到没有显式传递任何运算符(来自`Op`),因为默认情况下 Sequelize 假定进行相等比较. 上面的代码等效于：

```js
const { Op } = require("sequelize");
Post.findAll({
  where: {
    authorId: {
      [Op.eq]: 2
    }
  }
});
// SELECT * FROM post WHERE authorId = 2
```

可以使用多个校验

```js
Post.findAll({
  where: {
    authorId: 12
    status: 'active'
  }
});
// SELECT * FROM post WHERE authorId = 12 AND status = 'active';
```

等效于

```js
const { Op } = require("sequelize");
Post.findAll({
  where: {
    [Op.and]: [
      { authorId: 12 },
      { status: 'active' }
    ]
  }
});
// SELECT * FROM post WHERE authorId = 12 AND status = 'active';
```

`OR` 可以通过类似的方式轻松执行：

```js
const { Op } = require("sequelize");
Post.findAll({
  where: {
    [Op.or]: [
      { authorId: 12 },
      { authorId: 13 }
    ]
  }
});
// SELECT * FROM post WHERE authorId = 12 OR authorId = 13;
```

等效于

```js
const { Op } = require("sequelize");
Post.destroy({
  where: {
    authorId: {
      [Op.or]: [12, 13]
    }
  }
});
// DELETE FROM post WHERE authorId = 12 OR authorId = 13;
```

#### 操作符

```js
const { Op } = require("sequelize");
Post.findAll({
  where: {
    [Op.and]: [{ a: 5 }, { b: 6 }],            // (a = 5) AND (b = 6)
    [Op.or]: [{ a: 5 }, { b: 6 }],             // (a = 5) OR (b = 6)
    someAttribute: {
      // 基本
      [Op.eq]: 3,                              // = 3
      [Op.ne]: 20,                             // != 20
      [Op.is]: null,                           // IS NULL
      [Op.not]: true,                          // IS NOT TRUE
      [Op.or]: [5, 6],                         // (someAttribute = 5) OR (someAttribute = 6)

      // 使用方言特定的列标识符 (以下示例中使用 PG):
      [Op.col]: 'user.organization_id',        // = "user"."organization_id"

      // 数字比较
      [Op.gt]: 6,                              // > 6
      [Op.gte]: 6,                             // >= 6
      [Op.lt]: 10,                             // < 10
      [Op.lte]: 10,                            // <= 10
      [Op.between]: [6, 10],                   // BETWEEN 6 AND 10
      [Op.notBetween]: [11, 15],               // NOT BETWEEN 11 AND 15

      // 其它操作符

      [Op.all]: sequelize.literal('SELECT 1'), // > ALL (SELECT 1)

      [Op.in]: [1, 2],                         // IN [1, 2]
      [Op.notIn]: [1, 2],                      // NOT IN [1, 2]

      [Op.like]: '%hat',                       // LIKE '%hat'
      [Op.notLike]: '%hat',                    // NOT LIKE '%hat'
      [Op.startsWith]: 'hat',                  // LIKE 'hat%'
      [Op.endsWith]: 'hat',                    // LIKE '%hat'
      [Op.substring]: 'hat',                   // LIKE '%hat%'
      [Op.iLike]: '%hat',                      // ILIKE '%hat' (不区分大小写) (仅 PG)
      [Op.notILike]: '%hat',                   // NOT ILIKE '%hat'  (仅 PG)
      [Op.regexp]: '^[h|a|t]',                 // REGEXP/~ '^[h|a|t]' (仅 MySQL/PG)
      [Op.notRegexp]: '^[h|a|t]',              // NOT REGEXP/!~ '^[h|a|t]' (仅 MySQL/PG)
      [Op.iRegexp]: '^[h|a|t]',                // ~* '^[h|a|t]' (仅 PG)
      [Op.notIRegexp]: '^[h|a|t]',             // !~* '^[h|a|t]' (仅 PG)

      [Op.any]: [2, 3],                        // ANY ARRAY[2, 3]::INTEGER (仅 PG)

      // 在 Postgres 中, Op.like/Op.iLike/Op.notLike 可以结合 Op.any 使用:
      [Op.like]: { [Op.any]: ['cat', 'hat'] }  // LIKE ANY ARRAY['cat', 'hat']

      // 还有更多的仅限 postgres 的范围运算符,请参见下文
    }
  }
});
```



#### 排序和分组

Sequelize 提供了 `order` and `group` 参数,来与 `ORDER BY` 和 `GROUP BY` 一起使用.

#### 排序

`order` 参数采用一系列 *项* 来让 sequelize 方法对查询进行排序. 这些 *项* 本身是 `[column, direction]` 形式的数组. 该列将被正确转义,并且将在有效方向列表中进行验证(例如 `ASC`, `DESC`, `NULLS FIRST` 等).

```js
Subtask.findAll({
  order: [
    // 将转义 title 并针对有效方向列表进行降序排列
    ['title', 'DESC'],

    // 将按最大年龄进行升序排序
    sequelize.fn('max', sequelize.col('age')),

    // 将按最大年龄进行降序排序
    [sequelize.fn('max', sequelize.col('age')), 'DESC'],

    // 将按 otherfunction(`col1`, 12, 'lalala') 进行降序排序
    [sequelize.fn('otherfunction', sequelize.col('col1'), 12, 'lalala'), 'DESC'],

    // 将使用模型名称作为关联名称按关联模型的 createdAt 排序.
    [Task, 'createdAt', 'DESC'],

    // 将使用模型名称作为关联名称通过关联模型的 createdAt 排序.
    [Task, Project, 'createdAt', 'DESC'],

    // 将使用关联名称按关联模型的 createdAt 排序.
    ['Task', 'createdAt', 'DESC'],

    // 将使用关联的名称按嵌套的关联模型的 createdAt 排序.
    ['Task', 'Project', 'createdAt', 'DESC'],

    // 将使用关联对象按关联模型的 createdAt 排序. (首选方法)
    [Subtask.associations.Task, 'createdAt', 'DESC'],

    // 将使用关联对象按嵌套关联模型的 createdAt 排序. (首选方法)
    [Subtask.associations.Task, Task.associations.Project, 'createdAt', 'DESC'],

    // 将使用简单的关联对象按关联模型的 createdAt 排序.
    [{model: Task, as: 'Task'}, 'createdAt', 'DESC'],

    // 将由嵌套关联模型的 createdAt 简单关联对象排序.
    [{model: Task, as: 'Task'}, {model: Project, as: 'Project'}, 'createdAt', 'DESC']
  ],

  // 将按最大年龄降序排列
  order: sequelize.literal('max(age) DESC'),

  // 如果忽略方向,则默认升序,将按最大年龄升序排序
  order: sequelize.fn('max', sequelize.col('age')),

  // 如果省略方向,则默认升序, 将按年龄升序排列
  order: sequelize.col('age'),

  // 将根据方言随机排序(但不是 fn('RAND') 或 fn('RANDOM'))
  order: sequelize.random()
});

Foo.findOne({
  order: [
    // 将返回 `name`
    ['name'],
    // 将返回 `username` DESC
    ['username', 'DESC'],
    // 将返回 max(`age`)
    sequelize.fn('max', sequelize.col('age')),
    // 将返回 max(`age`) DESC
    [sequelize.fn('max', sequelize.col('age')), 'DESC'],
    // 将返回 otherfunction(`col1`, 12, 'lalala') DESC
    [sequelize.fn('otherfunction', sequelize.col('col1'), 12, 'lalala'), 'DESC'],
    // 将返回 otherfunction(awesomefunction(`col`)) DESC, 这种嵌套可能是无限的!
    [sequelize.fn('otherfunction', sequelize.fn('awesomefunction', sequelize.col('col'))), 'DESC']
  ]
});
```

回顾一下,order 数组的元素可以如下：

- 一个字符串 (它将被自动引用)
- 一个数组, 其第一个元素将被引用,第二个将被逐字追加
- 一个具有`raw`字段的对象:
  - `raw` 内容将不加引用地逐字添加
  - 其他所有内容都将被忽略,如果未设置 `raw`,查询将失败
- 调用 `Sequelize.fn` (这将在 SQL 中生成一个函数调用)
- 调用 `Sequelize.col` (这将引用列名)



#### 分组

分组和排序的语法相同,只是分组不接受方向作为数组的最后一个参数(不存在 `ASC`, `DESC`, `NULLS FIRST` 等).

你还可以将字符串直接传递给 `group`,该字符串将直接(普通)包含在生成的 SQL 中. 请谨慎使用,请勿与用户生成的内容一起使用.

```js
Project.findAll({ group: 'name' });
// 生成 'GROUP BY name'
```



### 限制和分页

使用 `limit` 和 `offset` 参数可以进行 限制/分页：

```js
// 提取10个实例/行
Project.findAll({ limit: 10 });

// 跳过8个实例/行
Project.findAll({ offset: 8 });

// 跳过5个实例,然后获取5个实例
Project.findAll({ offset: 5, limit: 5 });
```

通常这些与 `order` 参数一起使用.

## 





### 实用方法

+ count  - 出现次数
+ max - 最大值
+ min - 最小值
+ sum - 求和

