/**
 * @name: Create an array with all falsey values removed . The values 
 * `false| null | undefined | 0 | "" | NaN ` are falsey
 * @category: Array
 * @msg: 
 * @param {type} 
 * @return {type} 
 * @example: _.compact([0, 1, false, 2, '', 3, null, 4, undefined, 5])
 *  // => [1, 2, 3, 4, 5]
 */

function compact(array) {   
    const len = array && array.length || 0
    const resultArr = []
    if (len) {
        array.map(item => {
            if (item) {
                resultArr.push(item)
            }
        })
    }
    return resultArr
}   

console.log(compact([0, 1, false, 2, '', 3, null, 4, undefined, 5]))

module.exports = compact