 // this is ts file
// const person: string = null

// export const name ='terry'



// 联合类型和类型守护
// interface Waiter{
//     anjiao: boolean
//     say: () => {}
// }

// interface Teacher{
//     anjiao: boolean
//     skill: () => {}
// }

// function judgeWho(animal: Waiter | Teacher) {
//     // animal.say()  
//     // 直接断言
//     if (animal.anjiao) {
//         (animal as Teacher).skill()
//     } else {
//         (animal as Waiter).say()
//     }
// }

// function judgeWho2(animal: Waiter | Teacher) {
//     // in 实现类型守护
//     if ('skill' in animal) {
//         animal.skill()
//     } else {
//         animal.say()
//     }
// }

// function add (first: string | number, second: string | number) {
//     // typeof 做 类型保护
//     if (typeof first === 'string' || typeof second === 'string') {
//         return `${first}${second}`
//     }

//     return first + second
// }

// class NumberObj {
//     count: number
// }

// function addObj(first: object | NumberObj, second: object | NumberObj) {
//     // instanceof 做类型保护，只能用在类上面
//     if (first instanceof NumberObj && second instanceof NumberObj) {
//         return first.count + second.count
//     }
//     return 0
// }