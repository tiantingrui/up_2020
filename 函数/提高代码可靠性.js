let arr = [1, 2, 3, 4]
let newArr = (arr, fn) => arr.map(item => fn(item))
let add = item => item + 5
let sum = newArr(arr, add)
// console.log(sum)

const multi = item => item * 5
let rst = newArr(arr, multi)
// console.log(rst)

const statusMap = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
}
class Promise {
    constructor(fn) {
        this.status = statusMap.PENDING
        this.value = undefined
        this.reason = undefined
        fn((value) => {
            resolvePromise(this, value)
        }, reason => {
            rejectedPromise(this, reason)
        })
    }
    then(onFulfilled, onRejected) {

    }
}


function light(color, second) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(color)
            resolve()
        }, second * 1000)
    })
}

function orderLights(list) {
    let promise = Promise.resolve()
    list.forEach(item => {
        promise = promise.then(() => {
            return light(item.color, item.second)
        })
    })
    promise.then(() => {
        return orderLights(list)
    })
}

const list = [
    {
        color: 'red',
        second:3
    },
    {
        color: 'green',
        second:2
    },
    {
        color: 'yellow',
        second:1
    }
]

orderLights(list)
