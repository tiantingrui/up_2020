/*
 * @Author: terry 
 * @Date: yyyy-09-Mo 01:24:23 
 * @Last Modified by:   terry 
 * @Last Modified time: yyyy-09-Mo 01:24:23 
 */
// example 01
// const promise = new Promise((resolve, reject) => {
//     resolve(100)
// }).then(data => {
//     console.log(data)
// })


// example 02
// const promise = new Promise((resolve) => {
//     resolve(100)
// }).then(data => {
//     console.log(data)
//     return 'abc'
// }).then(data => {
//     console.log(data)
// })

// example 03
// function wait(ms=1000, data) {
//     return new Promise((resolve) => {
//         return setTimeout(() => {
//             resolve(data)
//         }, ms)
//     })
// }
// const promise = new Promise((resolve) => {
//     resolve(100)
// }).then(data => {
//     console.log(data)
//     return wait(1000, 'abc')
// }).then(data => {
//     console.log(data)
// })

// example 04
// const promise = new Promise((resolve, reject) => {
//     reject('some error')
// }).then(data => {
//     console.log(data)
// }).catch(error => {
//     console.log(error)
//     return 'abc'
// }).then(data => {
//     console.log('hiahia ----', data)
// })

// example 05
// function wait(ms = 1000, data) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(data)
//         }, ms)
//     })
// }
// async function foo() {
    // console.log('--begin--')
    // const one = await wait(3000, 1)
    // console.log('--tick1--')
    // const two = await wait(5000, 2)
    // console.log('--tick2--')

//     const x = await Promise.resolve(100)
//     console.log(x)
//     try {
//         const y = await Promise.reject('error')
//         console.log('y', y)
//     } catch (e) {
//         console.log(e)
//     }
//     // return x
// }

// foo().then(data => {
//     console.log('finished', data)
// })

//example 06
// function wait(ms=1000, data) {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(data)
//         }, ms);
//     })
// }

// Promise.all([wait(200, 1), wait(100, 2)])
// .then(data => {
//     console.log('all', data)
// })

// Promise.race([wait(200, 1), wait(100, 2)])
// .then(data => {
//     console.log('race', data)
// })


// class Promise

// const statusMap = {
//     PENDING: 'pending',
//     FULFILLED: 'fulfilled',
//     REJECTED: 'rejected'
// }

// class Promise {
//     constructor() {
//         this.status = statusMap.PENDING
        
//     }

//     then(onFulfilled, onRejected) {

//     }
// }


// var length = 1
// function fn() {
//     console.log('this', this)
//     console.log(this.length)
// }

// const person = {
//     length: 2,
//     say(fn) {
//         fn()
//         arguments[0]()
//     }
// }

// person.say(fn, 1, 2)


// const fetch = require('node-fetch')

// fetch('https://www.baidu.com', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     credentials: 'include', // Cookie
// })

// example 07
async function foo() {
    const rst = await fetch('https://www.baidu.com')
    console.log(rest)
}

foo()