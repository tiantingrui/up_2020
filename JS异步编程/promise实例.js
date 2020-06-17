//* 3秒之后亮一次红灯，再过两秒亮一次绿灯，再过一秒亮一次黄灯，用promise 实现多次交替亮灯的效果
//* console.log 模拟亮灯

/* 
    思路拆解：
        1. 实现多少秒后亮某个颜色的灯
        2. 顺序亮一批灯
        3. 循环顺序亮一批灯
*/

function light(color, second) {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            console.log(color)
            resolve()
        }, second * 1000)
    })
}

function orderLights(list) {
    let promise = Promise.resolve();
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
    {color: 'red', second: 3},
    {color: 'green', second: 2},
    {color: 'yellow', second: 1}
]

orderLights(list)