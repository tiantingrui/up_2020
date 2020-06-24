# TypeScript入门

**整体布局分为：**

+ 概览
+ 接口
+ 枚举
+ 类
+ 函数
+ 类型断言与类型守卫
+ 





# 01.概览

+ 基本注解
+ 原始类型
+ 数组
+ 接口
+ 特殊类型(any、null、undefined、void)
+ 泛型
+ 联合类型
+ 交叉类型
+ 元组类型
+ 类型别名



### 基本注解

类型注解使用 `:TypeAnnotation` 语法。在类型声明空间中可用的任何内容都可以用作类型注解。

在下面这个例子中，使用了变量、函数参数以及函数返回值的类型注解：

```ts
const num: number = 123
function identity(num: number): number {
    return num
}
```



### 原始类型

JavaScript 原始类型也同样适应于 TypeScript 的类型系统，因此 `string`、`number`、`boolean` 也可以被用作类型注解：

```ts
let num: number
let str: string
let bool: boolean

num = 123
num = 123.456
num = '123' // Error

str = '123'
str = 123 // Error

bool = true;
bool = false;
bool = 'false'; // Error
```



### 数组

TypeScript 为数组提供了专用的类型语法，因此你可以很轻易的注解数组。它使用后缀 `[]`， 接着你可以根据需要补充任何有效的类型注解（如：`:boolean[]`）。它能让你安全的使用任何有关数组的操作，而且它也能防止一些类似于赋值错误类型给成员的行为。如下所示：

```ts
let boolArray: boolean[];

boolArray = [true, false];
console.log(boolArray[0]); // true
console.log(boolArray.length); // 2

boolArray[1] = true;
boolArray = [false, false];

boolArray[0] = 'false'; // Error
boolArray = 'false'; // Error
boolArray = [true, 'false']; // Error
```



### 接口

接口是TypeScript的一个核心知识，它能合并众多类型声明至一个类型声明：

```ts
interface Name {
    first: string
    second: string
}

let name: Name
name = {
    first: 'sweet',
    second: 'terry'
}
name = {
    // Error: 'Second is missing'
    first: 'sweet'
}
name = {
    // Error: 'Second is the wrong type'
    first: 'sweet',
    second: 123
}
```

在这里，我们把类型注解：`first: string` + `second: string` 合并到了一个新的类型注解里 `Name`，这样能强制对每个成员进行类型检查。接口在 TypeScript 拥有强大的力量



### 特殊类型

除了被提到的一些原始类型，在typeScript中，还存在一些特殊的类型，它们是`any`、`null`、`undefined`以及`void`

#### any

`any` 类型在 TypeScript 类型系统中占有特殊的地位。它提供给你一个类型系统的「后门」,TypeScript 将会把类型检查关闭。在类型系统里 `any` 能够兼容所有的类型（包括它自己）。因此，所有类型都能被赋值给它，它也能被赋值给其他任何类型。以下有一个证明例子：

```ts
let power: any
// 赋值任意类型
power = '123'
power = 123
// 它也兼容任何类型
let num: number
power = num 
num = power
```

当你把 JavaScript 迁移至 TypeScript 时，你将会经常性使用 `any`。但你必须减少对它的依赖，因为你需要确保类型安全。当使用 `any` 时，你基本上是在告诉 TypeScript 编译器不要进行任何的类型检查。



#### null 和 undefined

在类型系统中，JavaScript 中的 null 和 undefined 字面量和其他被标注了 `any` 类型的变量一样，都能被赋值给任意类型的变量，如下例子所示：

```ts
// strictNullChecks: false

let num: number;
let str: string;

// 这些类型能被赋予
num = null;
str = undefined;
```



#### void

使用`:void`来表示一个函数没有返回值

```ts
function log(message: string): void {
    console.log(message)
}
```



### 泛型

泛型是 TypeScript 中非常重要的一个概念，因为在之后实际开发中任何时候都离不开泛型的帮助，原因就在于泛型给予开发者创造灵活、可重用代码的能力。

我们先来看一个小栗子吧：

假设有一个函数，接受一个number参数并返回一个number参数

```ts
function returnItem(para: number): number {
    return para
}
```

现在我们想接收一个string并返回同样一个string该怎么办呢？

```ts
function returnItem(para: string): string {
    return para
}
```

这样么？很明显两个代码逻辑是一样的，只是类型发生了变化，却写了两遍！！！

或许有人这么说了，那么 `any`不也是的一个选择吗？

```ts
function returnItem(para: any): any {
    return para
}
```

可以是可以，但是不到万不得已的时候别这么做，这和写js 没什么区别。

那么，我们**看看泛型是怎么做**的？

**分析：**在静态编写的时候并不确定传入的参数是什么类型，只有挡在运行时传入参数后我们才可以确定。

那么我们需要变量，代表传入的类型，然后再返回这个变量，**它是一种特殊的变量，只用于便是类型而不是值**

这个类型变量在TS中就叫做 **[泛型]**

```ts
function returnItem<T>(para: T): T {
    return para
}
```

我们在函数名称后面声明泛型变量 `<T>`，它用于捕获开发者传入的参数类型（比如说string），然后我们就可以使用T(也就是string)做参数类型和返回值类型了。

再来看一个栗子：

```ts
// js数组已拥有 reverse 方法 TypeScript 使用了泛型定义其结构
interface Array<T> {
    reverse(): T[]
}
```

这意味着，当你在数组上`.reverse`方法时，将会获得类型安全：

```ts
let numArr = [1, 2]
let reversedNums = numArr.reverse()

reversedNums = ['1', '2'] // Error
```



### 联合类型

在 JavaScript 中，你可能希望属性为多种类型之一，如字符串或者数组。这正是 TypeScript 中联合类型能派上用场的地方（它使用 `|` 作为标记，如 `string | number`）。关于联合类型，一个常见的用例是一个可以接受字符串数组或单个字符串的函数：

```ts
function formatCommandline(param: string[] | string) {
    let line = ''
    if (typeof param === 'string') {
        line = param.trim()
    } else {
        line = param.join(' ').trim()
    }
}
```



### 交叉类型

在 JavaScript 中， `extend` 是一种非常常见的模式，在这种模式中，你可以从两个对象中创建一个新对象，新对象拥有着两个对象所有的功能。交叉类型可以让你安全的使用此种模式：

```ts
function extend<T extends object, U extends object>(first: T, second: U): T & U {
  const result = <T & U>{};
  for (let id in first) {
    (<T>result)[id] = first[id];
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (<U>result)[id] = second[id];
    }
  }

  return result;
}

const x = extend({ a: 'hello' }, { b: 42 });

// 现在 x 拥有了 a 属性与 b 属性
const a = x.a;
const b = x.b;
```



### 元祖类型

JavaScript 并不支持元组，开发者们通常只能使用数组来表示元组。而 TypeScript 支持它，开发者可以使用 `:[typeofmember1, typeofmember2]` 的形式，为元组添加类型注解，元组可以包含任意数量的成员，示例：

```ts
let nameNumber: [string, number];

// Ok
nameNumber = ['Jenny', 221345];

// Error
nameNumber = ['Jenny', '221345'];
```

将其与TypeScript中的解构一起使用：

```ts
let nameNumber: [string, number]
nameNumber = ['terry', 24]

const [name, num] = nameNumber
```



### 类型别名

TypeScript 提供了为类型注解设置别名的便捷语法，你可以使用 `type SomeName = someValidTypeAnnotation` 来创建别名：

```ts
type StrOrNum = sting | number
// 使用
let example: StrOrNum
example = 24
example = 'terry'
// 会检查类型
sample = true // Error
```

与接口不同，你可以为任意的类型注解提供类型别名（在联合类型和交叉类型中比较实用），下面是一些重用的类型别名语法示例：

```ts
type Text = string | {text: string}
type Coordinates = [number, number]
type Callback = (data: string) => void
```

**小建议**

+ 如果你需要使用类型注解的层次结构，请使用接口。它能使用`implements`和`extends`
+ 为一个简单的对象类型（如上面的Coordinates ）使用类型别名，只需要给他一个语义化的名字即可，另外，当你想给联合类型和交叉类型提供一个语义化的名称时，一个类型别名将会是一个好的选择。

#### 现在你已经能够为你的大部分 JavaScript 代码添加类型注解，接着，让我们深入了解 TypeScript 的类型系统吧。



## 02. 接口(interface)

> 在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。



+ 接口的使用
+ 可选属性
+ 只读属性
+ 函数类型
+ 属性检查
+ 可索引类型
+ 继承接口



### 接口的使用

比如我们有一个函数，这个函数接受一个 `User` 对象，然后返回这个 `User` 对象的 `name` 属性:

```js
const getUserName = (user) => user.name   // user: any
```

在我们自定义的 TypeScript 开发环境下这个是会报错的：

我们必须用一种类型描述这个 `user` 参数，但是这个类型又不属于上一节介绍到的各种基本类型。

这个时候我们需要 interface 来描述这个类型:

```ts
interface User {
    name: string
    age: number
    isMale: boolean
}
const getUserName = (user: User) => user.name
```

这个接口 `User` 描述了参数 `user` 的结构，当然接口不会去检查属性的顺序，只要相应的属性存在并且类型兼容即可。



### 可选属性

如何描述上述user 的age 可选填呢？

```ts
interface User {
    name: string
    age?: number
    isMale: boolean
}
```



### 只读属性

利用`readonly`我们可以把一个属性变成只读属性，此后我们就无法对他进行修改

```ts
interface User {
    name: string
    age?: number
    readonly isMale: boolean
}
```



### 函数类型

那么接下来，如果这个user 含有一个函数怎么办？

举个栗子：

```ts
user.say = function(words: string) {
    return 'hello world'
}
```

我们应该如何描述这种情况？

+ 方法一：**直接在interface 内部描述函数**

```ts
interface User {
    name: string
    age?: number
    readonly isMale: boolean
    say: (words: string) => string
}
```

+ 方法二：**可以先用接口直接描述函数类型,然后在User内使用**

```ts
interface Say {
    (words: string) => string
}

// 定义好Say之后在User内使用
interface User {
    name: string
    age: number
    readonly isMale: boolean
    say: Say
}
```



### 属性检查

假设我们有一个 Config 接口如下

```ts
interface Config {
    width?: number
}
function CalculateAreas(config: Config): {area: number} {
    let squre = 100
    if (config.width) {
        square = config.width * config.width
    }
    return {area: square}
}

let mySquare = CalculateAreas({widdth: 5})
```

**注意：我们传入的参数是 `widdth`不是 width**

对象字面量当被赋值给变量或作为参数传递的时候，会被特殊对待而且经过“额外属性检查”。如果一个对象字面量存在任何“目标类型”不包含的属性时，你会得到一个错误。

```ts
// error: 'widdth' not expected in type 'Config'
let mySquare = CalculateAreas({widdth: 5})
```

有三种主流的解决办法：

+ 方法一：**使用类型断言**

```ts
let mySquare = CalculateAreas({widdth: 5} as Config)
```

+ 方法二：**添加字符串索引签名**

```ts
interface Config {
    width?: number
    [propName: string]: any
}
```

这样Config可以有任意数量的属性，并且只要不是width，那么就无所谓它们的类型是什么了。

+ 方法三：**将字面量赋值给另一个变量：**

```ts
let options: any = {widdth: 5}
let mySquare = CalculateAreas(options)
```

本质上是转化为any类型，除非万不得已的情况，不建议采用上述方法。



### 可索引类型

> 可索引类型具有一个索引签名，它描述了对象索引的类型，还有相应的索引返回值类型

我们接着了模拟一个这个场景，如果上面的`User`还包含一个属性，这个属性是User拥有的邮箱集合，但是有多少个邮箱不确定，应该怎么做呢？

假设张三只有一个QQ邮箱，对应信息如下：

```js
{
    name: '张三'，
    age： 18，
    isMale: false，
    say：function，
    email: {
        qq: '982133685@qq.com'
    }
}
```

李四有网易和QQ邮箱，信息如下：

```js
{
    name: '李四'，
    age： 24，
    isMale: true，
    say：function，
    email: {
        qq: '976433685@qq.com'，
        netEasy: '15528903674@163.com'
    }
}
```

这两个信息的`email`属性有共同之处，首先他们的key都是string类型的，其次value也是string类型，虽然数量不等。

**我们来试一试可索引类型来表示**

```ts
interface Email {
    [name: string]: string
}

interface User {
    name: string
    age?: number
    readonly isMale: boolean
    say: () => string
    phone: Phone
}
```



### 继承接口

假设现在我们有一个VIP user , 这个用户比User 属性多了一些额外的属性，这个时候要重写一个接口么？

我们直接继承就好了

```ts
interface VipUser extends User {
    broadcast: () => void
}
```

**可以继承多个接口：**

```ts
interface SupperVip extends User, VipUser {
    vipAuthority: () => void
}
```



## 03. 枚举(enum)

> 枚举类型用于声明一组命名的常数，当一个变量有几种可能的取值时，可以将它定义为枚举类型



### 数字枚举

当我们声明一个枚举类型，虽然没给他们赋值，但是它们的值其实是默认的数字类型，而且默认从0开始依次累加：

```ts
enum Direction {
    Up,
    Down,
    Left,
    Right
}
console.log(Direction.Up === 0); // true
console.log(Direction.Down === 1); // true
console.log(Direction.Left === 2); // true
console.log(Direction.Right === 3); // true
```

**当我们把第一个值赋值后，后面也会根据第一个值进行累加：**

```ts
enum Direction {
    Up = 10,
    Down,
    Left,
    Right
}
console.log(Direction.Up, Direction.Down, Direction.Left, Direction.Right)
// 10, 11, 12, 13
```



### 字符串枚举

枚举类型的值其实也可以是字符串类型：

```ts
enum Direction {
    Up = 'up',
    Down = 'down',
    Left = 'left',
    Right = 'right'
}
console.log(Direction['Right'], Direction.Up) // right, up
```



### 异构枚举

字符串枚举和数字枚举，这两个枚举是不是可以混合使用呢？

```ts
enum strNumMixin {
    No = 0,
    Yes = 'yes'
}
```

这样写是没问题的。通常情况下很少这样使用枚举。



### 反向映射

```ts
enum Direction {
    Up,
    Down,
    Left,
    Right
}
console.log(Direction.Up === 0); // true
console.log(Direction.Down === 1); // true
console.log(Direction.Left === 2); // true
console.log(Direction.Right === 3); // true
```

我们可以通过枚举名字获取枚举值，这ok，那么能不能**通过枚举值获取枚举名字**呢？

**答案是 yes**

```ts
enum Direction {
    Up, 
    Down,
    Left,
    Right
}

console.log(Direction[0]) // Up
```

小朋友，看到这里是不是有很多问号啊？JS中的对象都是正向映射，即`name => value`那么在枚举中可以正反向同时映射？即`name <=> value `.

我们接着往下看，看下枚举的本质，来理解下这种正反向同时映射的特性



### 枚举的本质

以上面的`direction`枚举类型为例，我们不妨看一下枚举类型被编译为JS后是是什么样子

```ts
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 10] = "Up";
    Direction[Direction["Down"] = 11] = "Down";
    Direction[Direction["Left"] = 12] = "Left";
    Direction[Direction["Right"] = 13] = "Right";
})(Direction || (Direction = {}));
```

这个编译后的代码可能看起来比较复杂,不过我们可以把`Direction`看成一个对象,比如我们在 TypeScript 中做几个小实验:

```
enum Direction {
    Up = 10,
    Down,
    Left,
    Right
}

console.log(Direction[10], Direction['Right']); // Up 13
```

原因就在编译后的 JavaScript 中体现出来了,因为 `Direction[Direction["Up"] = 10] = "Up"` 也就是 `Direction[10] = "Up"` ,所以我们可以把枚举类型看成一个JavaScript对象，而由于其特殊的构造，导致其拥有正反向同时映射的特性



### 常量枚举

枚举其实可以被const 声明为常量的，这样有什么好处？

```ts
const enum Direction {
    Up = 'Up',
    Down = 'Down',
    Left = 'Left',
    Right = 'Right'
}

const a = Direction.Up;
```

猜一下被编译为JS后是怎样的？

```
var a = "Up";
```

我们在上面看到枚举类型会被编译为 JavaScript 对象,怎么这里没有了?

这就是常量枚举的作用,因为下面的变量 `a` 已经使用过了枚举类型,之后就没有用了,也没有必要存在与 JavaScript 中了, TypeScript 在这一步就把 `Direction` 去掉了,我们直接使用 `Direction` 的值即可,这是性能提升的一个方案。



### 联合枚举与枚举成员的类型

我们假设枚举的所有成员都是字面量类型的值，那么枚举的每个成员和枚举值本身都可以作为类型来使用，

- 任何字符串字面量,如：

```
const enum Direction {
    Up = 'Up',
    Down = 'Down',
    Left = 'Left',
    Right = 'Right'
}
```

- 任何数字字面量,如：

```
enum Direction {
    Up,
    Down,
    Left,
    Right
}
```

- 应用了一元`-`符号的数字字面量,如:

```
enum Direction {
    Up = -1,
    Down = -2,
    Left = -3,
    Right = -4,
}
```

### 枚举成员类型

当所有枚举成员都拥有字面量枚举值时，它就带有了一种特殊的语义，即枚举成员成为了类型。

比如我们声明一个数字类型：

```
enum Direction {
    Up,
    Down,
    Left,
    Right
}

const a = 0

console.log(a === Direction.Up) // true
```

我们把成员当做值使用，看来是没问题的，因为成员值本身就是0，那么我们再加几行代码：

```
type c = 0

declare let b: c

b = 1 // 不能将类型“1”分配给类型“0”
b = Direction.Up // ok
```

我们看到，上面的结果显示这个枚举的成员居然也可以被当做类型使用，这就是枚举成员当做类型使用的情况。



### 联合枚举类型

由于联合枚举，类型系统可以知道枚举里的值的集合

```ts
enum Direction {
    Up,
    Down,
    Left,
    Right
}

declare let a: Direction

enum Animal {
    Dog,
    Cat
}

a = Direction.Up // ok
a = Animal.Dog // 不能将类型“Animal.Dog”分配给类型“Direction”
```

我们把 `a` 声明为 `Direction` 类型，可以看成我们声明了一个联合类型 `Direction.Up | Direction.Down | Direction.Left | Direction.Right`，只有这四个类型其中的成员才符合要求。



### 枚举合并

我们可以分开声明枚举,他们会自动合并

```
enum Direction {
    Up = 'Up',
    Down = 'Down',
    Left = 'Left',
    Right = 'Right'
}

enum Direction {
    Center = 1
}
```

编译为 JavaScript 后的代码如下:

```
var Direction;
(function (Direction) {
    Direction["Up"] = "Up";
    Direction["Down"] = "Down";
    Direction["Left"] = "Left";
    Direction["Right"] = "Right";
})(Direction || (Direction = {}));
(function (Direction) {
    Direction[Direction["Center"] = 1] = "Center";
})(Direction || (Direction = {}));
```

因此上面的代码并不冲突。



### 为枚举添加静态方法

借助`namespace`命名空间，我们甚至可以给枚举添加静态方法

举个栗子，有十二个月份

```ts
enum Month {
    January,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December
}
```

编写一个方法，这个方法可以帮助我们把夏天的月份找出来

```ts
function isSummer(month: Month) {
    switch (month) {
        case Mounth.June:
        case Mounth.July:
        case Mounth.August:
            return true;
        default: 
            return false
            
    }
}
```

想要把两者结合就需要借助命名空间的力量了:

```ts
namespace Month {
    export function isSummer(month: Month) {
        switch (month) {
            case Month.June:
            case Month.July:
            case Month.August:
                return true;
            default:
                return false
        }
    }
}

console.log(Month.isSummer(Month.January)) // false
```

**深入理解了枚举类型，通过编译后的JavaScript了解到其实本质上是javaScript对象**



## 04. 类（class）

在ES6之后，js拥有了class关键字，虽然本质上是构造函数的语法糖。

但是不像传统的面向对象语言类的相关特性没有完全加入，**比如说修饰符和抽象类等**

对于一些继承、静态属性这些在js本来就存在的特性，就不过多展开了

### 抽象类

抽象类作为其他派生类的基类使用，它们一般不会直接被实例化，不同于接口，抽象类可以包含成员的实现细节。

abstract关键字是用于定义抽象类内部定义抽象方法

比如创建一个Animal抽象类：

```ts
abstract class Animal {
    abstract makeSound(): void;
    move(): void {
        console.log('running the park')
    }
}

const animal = new Animal() // 会报错， 无法创建抽象类的实例。
```

我们不可以直接实例化抽象类，通常需要我们创建子类继承基类，然后可以实例化子类。

```ts
class Cat extends Animal {
    makeSound() {
        console.log('miao miao~')
    }
}
const cat = new Cat()

cat.makeSound() // miao miao~
cat.move() // running the park
```



### 访问限定符

TypeScript 中有三类访问限定符，分别是： public、private、protected

#### public

在ts的类中，成员都默认为public，被此限定符修饰的成员是可以被外部访问

```ts
class Car{
    public run() {
        console.log('start...')
    }
}
const car = new Car()

car.run() // start...
```



#### private

当成员被设置为private之后，被此限定符修饰的成员是只可以被类的内部访问

```ts
class Car{
    private run() {
        console.log('start...')
    }
}
const car = new Car()

car.run() // 报错： 属性’run‘为私有属性，只能在类’Car‘ 中访问
```



#### protected

当成员被设置为 protected 之后, 被此限定符修饰的成员是只可以被类的内部以及类的子类访问。

```ts
class Car {
    protected run() {
        console.log('启动...')
    }
}

class GTR extends Car {
    init() {
        this.run()
    }
}

const car = new Car()
const gtr = new GTR()

car.run() // [ts] 属性“run”受保护，只能在类“Car”及其子类中访问。
gtr.init() // 启动...
gtr.run() // [ts] 属性“run”受保护，只能在类“Car”及其子类中访问。
```



### class可以作为接口

实际上类(class) 也可以作为接口

而把class作为interface使用，在React工程中是很常用的

我们先声明一个类，这个类包含组件 `props` 所需的类型和初始值：

```ts
// props的类型
export default class Props {
  public children: Array<React.ReactElement<any>> | React.ReactElement<any> | never[] = []
  public speed: number = 500
  public height: number = 160
  public animation: string = 'easeInOutQuad'
  public isAuto: boolean = true
  public autoPlayInterval: number = 4500
  public afterChange: () => {}
  public beforeChange: () => {}
  public selesctedColor: string
  public showDots: boolean = true
}
```





## 05.函数

> 函数类型在TypeScript类型系统中扮演着十分重要的角色，它们是可组合系统的核心构建块

### 定义函数类型

比如我们实现一个加法函数

```ts
const add = (a: number, b: number) => a + b
```



### 参数注解

```ts
// 变量注解
let aa: {bar: number}
// 函数参数注解
function bb(cc: {bar: number}) {}
```

这里我们使用了内联类型注解，除此之外，还可以使用接口等其他方式



### 返回类型注解

可以在函数参数列表之后使用月变量相同的样式来注解返回类型，如下面的栗子`: Foo`

```ts
interface Foo {
    foo: string
}
// Return type annoatted as `: Foo`
function foo(sample: Foo): Foo {
    return sample
}
```

我们在这里使用了一个`interface`，也可以使用其他的注解方式，例如内联注解



通常不需要注解函数的返回类型，因为他可以由编译器推断：

```ts
interface Foo {
    foo: string
}
function foo(sample: Foo) {
    return sample; // inferred return type `Foo`
}
```



**如果你不打算从函数返回任何内容，则可以将其标注为 `void`.通常可以删除`void`,TS能够推导出来**



### 可选参数

可以将参数标记为可选：

```ts
function foo(bar: number, has?: string) :void {
    // ..
}
foo(123)
foo(123, 'hello')
```

或者，当调用者没有提供该参数时，你可以提供一个默认值（在参数声明后使用 `= someValue`）

```ts
function foo(bar: number, has: string = 'hello') {
    console.log(bar, has)
}
foo(123) // 123, hello
foo(123, 'world') // 123, world
```



### 函数重载

> 重载是什么意思，就是可以多次声明一个变量，函数名等。就像js中var 声明的变量可以重复声明，而let , const 只可以声明一次，不具有重载性。

举个栗子：

```ts
// 重载
function padding(all: number);
function padding(topAndBottom: number, leftAndRight: number);
function padding(top: number, right: number, bottom: number, left: number);
// Actual implementation that is a true representation of all the cases the function body needs to handle
function padding(a: number, b?: number, c?: number, d?: number) {
  if (b === undefined && c === undefined && d === undefined) {
    b = c = d = a;
  } else if (c === undefined && d === undefined) {
    c = a;
    d = b;
  }
  return {
    top: a,
    right: b,
    bottom: c,
    left: d
  };
}
```

这里前三个函数头可有效调用 `padding`:

```ts
padding(1); // Okay: all
padding(1, 1); // Okay: topAndBottom, leftAndRight
padding(1, 1, 1, 1); // Okay: top, right, bottom, left

padding(1, 1, 1); // Error: Not a part of the available overloads
```

当然，最终声明（从函数内部看到的真正声明）与所有重载兼容是很重要的。这是因为这是函数体需要考虑的函数调用的真实性质。

> TIP
>
> TS中的函数重载没有任何运行时开销，只允许你记录希望调用函数的方式，并且编译器会检查其余代码



### 函数声明

 在没有提供函数实现的情况下，有两种声明函数类型的方式：

```ts
type Long = {
    (a: number): number
}
type Short = (a：number) => number
```

这两个栗子完全相同，但是当你使用函数重载的时候，只能用第一种方式：

```ts
type OverLoadFunc = {
    (a: number): number;
	(a: string): string;
}
```



## 06.类型断言与类型守卫

### 类型断言

> 有些情况下 TS 并不能正确或者准确得推断类型,这个时候可能产生不必要的警告或者报错。

一个初学者经常犯的错：

```ts
const obj = {}
obj.name = 'terry' // Error: 'name'属性不存在于 '{}'
```

这里代码发出了错误警告，因为 obj 的类型推断为 {}，即是具有零属性的对象，因此，你不能在他的属性上添加 name.**可以通过类型断言来避免此问题**

```ts
interface Obj = {
    name: 'string'
}
const obj = {} as Obj
obj.name = 'terry'
```



### 双重断言

虽然类型断言是有强制性的,但并不是万能的,因为一些情况下也会失效:

```ts
interface Person {
	name: string;
	age: number;
}

const person = 'xiaomuzhu' as Person; // Error
```

这个时候会报错,很显然不能把 `string` 强制断言为一个接口 `Person` ,但是并非没有办法,此时可以使用双重断言:

```ts
interface Person {
	name: string;
	age: number;
}

const person = 'xiaomuzhu' as any as Person; // ok
```

**双重断言不建议滥用，记得有这个骚操作就好**



### 类型守卫

> 也可以叫做类型保护，允许你使用更小范围下的对象类型

#### typeof

TS熟知JS中`instanceof`和`typeof`运算符的用法，如果你在一个条件快中使用这些，TS将会推导出在条件快中的变量类型

```ts
function aa(x: number | string) {
    if (typeof x === 'string') {
        // 在这个块中，TypeScript 知道 `x` 的类型必须是 `string`
    	console.log(x.subtr(1)); // Error: 'subtr' 方法并没有存在于 `string` 上
    	console.log(x.substr(1)); // ok
    }
    x.substr(1) // Error: 无法保证 `x` 是 `string` 类型
}
```



#### instanceof 

```ts
class Foo {
  foo = 123;
  common = '123';
}

class Bar {
  bar = 123;
  common = '123';
}

function doStuff(arg: Foo | Bar) {
  if (arg instanceof Foo) {
    console.log(arg.foo); // ok
    console.log(arg.bar); // Error
  }
  if (arg instanceof Bar) {
    console.log(arg.foo); // Error
    console.log(arg.bar); // ok
  }
}

doStuff(new Foo());
doStuff(new Bar());
```

TypeScript 甚至能够理解 `else`。当你使用 `if` 来缩小类型时，TypeScript 知道在其他块中的类型并不是 `if` 中的类型：

```ts
class Foo {
  foo = 123;
}

class Bar {
  bar = 123;
}

function doStuff(arg: Foo | Bar) {
  if (arg instanceof Foo) {
    console.log(arg.foo); // ok
    console.log(arg.bar); // Error
  } else {
    // 这个块中，一定是 'Bar'
    console.log(arg.foo); // Error
    console.log(arg.bar); // ok
  }
}

doStuff(new Foo());
doStuff(new Bar());
```



#### in

`in`操作符可以安全的检查一个对象上是否存在一个 属性，它通常也被做类型保护使用：

```ts
interface A {
    x: number
}
interface B {
    y: string
}
function doSome(q: A | B) {
    if ('x' in q) {
        // q: A
    } else {
        // q: B
    }
}
```



#### 字面量类型保护

当你在联合类型里使用字面量类型时，你可以检查它们是否有区别：

```ts
type Foo = {
  kind: 'foo'; // 字面量类型
  foo: number;
};

type Bar = {
  kind: 'bar'; // 字面量类型
  bar: number;
};

function doStuff(arg: Foo | Bar) {
  if (arg.kind === 'foo') {
    console.log(arg.foo); // ok
    console.log(arg.bar); // Error
  } else {
    // 一定是 Bar
    console.log(arg.foo); // Error
    console.log(arg.bar); // ok
  }
}
```



## 07. 类型兼容性

> 类型兼容性用于确定一个类型是否能赋值给其他类型

### 结构类型

TS里的类型兼容性是基于【结构类型】的，基本规则是，如果x要兼容y，那么y至少具有与x相同的属性

```ts
class Person {
    constructor(public weight: number, public name: string, public born: string) {

    }
}

interface Dog {
    name: string
    weight: number
}

let x: Dog

x = new Person(120, 'cxk', '1996-12-12') // OK
```

但如果反过来，`Person` 并没有兼容 `Dog`，因为 `Dog` 的属性比 `Person` 要少了一个。



### 函数的类型兼容性

