let arr = [1, 2, 3, 4]
let newArr = (arr, fn) => arr.map(item => fn(item))
let add = item => item + 5
let sum = newArr(arr, add)
console.log(sum)

const multi = item => item * 5
let rst = newArr(arr, multi)
console.log(rst)