/*
 * @Descripttion: 
 * @version: 
 * @Author: terry
 * @Date: 2020-09-28 09:05:59
 * @LastEditors: terry
 * @LastEditTime: 2020-09-28 09:24:02
 */
const numberArr: number[] = [1, 2, 3]
const stringArr: string[] = ['1', '2', '3']
const undefinedArr: undefined[] = [undefined, null, undefined]
console.log(undefinedArr)

const arr: (string|number)[] = [1, 'aa', 2]
// type alias 类型别名
// const zmn: {name: string, age: number}[] = [
//     {name: 'ais', age: 18} 
// ]
type lady = {name: string, age: number}
const zmn: Madam[] = [
    {name: 'ais', age: 18}
]
class Madam {
    name: string;
    age: number
}