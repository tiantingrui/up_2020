//! async函数
// async function test() {
//     return 1;
// }
// const p = test();
// console.log(p);  // Promise { 1 }
// p.then(function (data) {
//     console.log(data) // 1
// })

import { spawn } from "child_process";

// async function test() {
//     throw new Error('error')
// }
// const p = test();
// console.log(p); 
// p.catch(function (data) {
//     console.log(data) // 1
// })

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

//! 应用

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

































