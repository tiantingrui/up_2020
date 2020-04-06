# 深入理解async/await



### 目标

+ async函数
+ await函数
+ 应用



### async函数

+ **一个语法糖** 使异步操作更简单（语法糖就是帮我们写代码更加简单，更有幸福感）
+ **返回值** 是一个promise对象
  + return的值是promise resolved时候的value
  + Throw的值是promise.rejected时候的reason

```js
//! async函数
async function test() {
    return 1;
}
const p = test();
console.log(p);  // Promise { 1 }
p.then(function (data) {
    console.log(data) // 1
})

async function test() {
    throw new Error('error')
}
const p = test();
console.log(p); 
p.catch(function (data) {
    console.log(data) 
})
```



#### await

+ 只能出现在async函数内或者最外层
+ 等待一个promise对象的值
+ await的promise状态为rejected，后续执行中断

```txt
await
1. promise
	1> resolved 返回promise的值
	2> rejected 抛出promise的拒因
	
2. 非promise
	1> 返回对应的值  await 1
```



#### async函数实现原理

**Generator + 自动执行器**

```js
//! async函数实现原理
async function example(params) {
    // ...
}

function example(params) {
    return spawn(function*() {
        // ...
    })
}

function spawn(genF) {
    return new Promise(function(resolve, reject) {
        const gen = genF(); // 生成器对象
        function step(nextF) {
            let next;
            try {
                next = nextF(); //执行gen.next()
            } catch (e) {
                return reject(e)
            }
            if (next.done) {
                return resolve(next.value)
            }
            //* next.done 为 false时，继续step;
            Promise.resolve(next.value).then(
                function(v) {
                    step(function() {
                        return gen.next(v)
                    })
                },
                function(e) {
                    stop(function() {
                        return gen.throw(e)
                    })
                }
            )
        }
        step(function() {
            return gen.next(undefined)
        })
    })
}
```

#### 应用：

```js
async function readFileByAsync() {
    const fs = require('fs')
    const files = [
        './g1.json',
        './g2.json',
        './g3.json'
    ]
    const readFile = function(src) {
        return new Promise((resolve, reject) => {
            fs.readFile(src, (err, data) => {
                if (err) reject(err);
                resolve(data)
            })
        })
    }

    const str0 = await readFile(files[0]);
    console.log(str0.toString());
    const str1 = await readFile(files[1]);
    console.log(str1.toString());
    const str2 = await readFile(files[2]);
    console.log(str2.toString());
}

```

