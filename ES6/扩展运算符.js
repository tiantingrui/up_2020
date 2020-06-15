// console.log(...[1, 2, 3])

function push(arr, ...items) {
    arr.push(...items)
}
function add(x, y, z) {
    return x + y + z
}
const numbers = [4, 38, 10]
// console.log(add(...numbers))

let arr1 = [1, 2]
let arr2 = [3, 4]
arr1.push(...arr2)

let date1 = new Date(...[2015, 1, 1]);
console.log([...'hello'])