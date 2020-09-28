// 泛型在函数中使用

function join<terry>(first: terry, second: terry) {
    return `${first}${second}`
}


// console.log(
//     join<string>('ice', '_sweet')
// )

// 泛型中数组的使用
function myFun<ANY>(params: ANY[]) {
    return params
}

// 另一种写法
function myFun1<ANY>(params: Array<ANY>) {
    return params
}

myFun<string>(['123', '456'])

// 泛型中经常用 <T>  T来代表泛型

// 多个泛型的定义
function add<T, P>(first: T, second: P) {
    return `${first}${second}` 
}
// add<string, number>('ice', 2)
add('1', 2)


// 2. 在类中使用泛型

interface Girls {
    name: string
}

class SelectGirl<T extends Girls>{
    constructor(private girls: T[]) {}
    getGirl(index: number): string {
        return this.girls[index].name
    }
}
const selectGirl = new SelectGirl([
    {name: 'zmn'},
    {name: 'ice'}
])
console.log('selectGirl', selectGirl.getGirl(1))