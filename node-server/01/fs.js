// const fs = require('fs')

// 同步读取
// const data = fs.readFileSync('./index.html')
// console.log('data', data.toString())

// fs.readFile('./index.html', (err, data) => {
//     if (err) throw err
//     console.log('异步data', data.toString())
// })

// fs 常搭配 path api 使用
// const path = require('path')
// fs.readFile(path.resolve(__dirname, './index.html'), (err, data) => {
//     if (err) throw err
//     console.log('data', data.toString())
// })

// promisify
// const {promisify} = require('util')
// const readFile = promisify(fs.readFile)
// readFile('./index.html')
//     .then(data => {
//         console.log(data.toString())
//     })
//     .catch(err => {
//         console.log(err)
//     })

// fs Promises API node v10
// const {promises} = require('fs')
// promises.readFile('./index.html').then(data => {
//     console.log(data.toString())
// }).catch(err => {
//     console.log(err)
// })

// async/await
const aa = async () => {
    const fs = require('fs')
    const {promisify} =require('util')
    const readFile = promisify(fs.readFile)
    const data = await readFile('./index.html')
    console.log('data', data.toString())
}
aa()