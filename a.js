let arr = [
    {
        a: 1,
        show: false
    },
    {
        a: 2,
        show: false
    },
    {
        a: 3,
        show: false
    },
]

let list = []
arr.map((item, index) => {
    if (!item.show) {
        list.push(arr[index])
        // arr.splice(index, 1)
    }
})

function getArrDifference(arr1, arr2) {
    return arr1.concat(arr2).filter(function(v, i, arr) {
        return arr.indexOf(v) === arr.lastIndexOf(v);
    });
}
arr = getArrDifference(arr, list)
// console.log(getArrDifference(arr, list)); 



let id1 = Symbol('id')
let id2 = Symbol('id')

console.log(id1 === id2)

let obj = {
    key: id1
}


console.log(obj.key)



