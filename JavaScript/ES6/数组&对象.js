let arr1 = [1, 2, 3]
let arr2 = arr1
let arr3 = Array.from(arr1)
console.log('11', arr1 === arr2) // true
console.log('22', arr3 === arr2) // false  深拷贝

const toArray = (() => Array.from ? Array.from : obj => [].slice.call(obj))()

function ArrayOf() {
    return [].slice.call(arguments)
}

Object.defineProperty(Object, 'is', {
    value: function(x, y) {
      if (x === y) {
        // 针对+0 不等于 -0的情况
        return x !== 0 || 1 / x === 1 / y;
      }
      // 针对NaN的情况
      return x !== x && y !== y;
    },
    configurable: true,
    enumerable: false,
    writable: true
  });


  const obj1 = {
      a: 1,
      b: {
          a: 2
      }
  }
  const obj2 = Object.assign({}, obj1)
  obj2.a = 2
  obj2.b.a = 3
  console.log(
      'obj1', obj1,
      'obj2', obj2
  )