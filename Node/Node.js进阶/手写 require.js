const path = require('path')
const fs = require('fs')
const vm = require('vm')

function Module(id) {
    this.id = id // 当前模块的id名
    this.exports = {} // 默认是空对象，导出的结果
}
Module.extensions = {}


let wrapper = [
    '(function (exports, require, module, __dirname, __filename) {\r\n',
    '\r\n})'
];

// js文件处理
Module.extensions['.js'] = (module) => {
    let script = fs.readFileSync(module.id, 'utf8')

    let content = wrapper[0] + script + wrapper[1]

    let fn = vm.runInThisContext(content)
    let __dirname = path.dirname(module.id)

    fn.call(module.exports, module.exports, req, module, __dirname, module.id)
}

// json 文件处理
Module.extensions['json'] = (module) => {
    let script = fs.readFileSync(module.id, 'utf8')
    module.exports = JSON.parse(script)
}

// 将一个相对路径，转化成绝对路径
Module._resolveFilename = function (id) {
    // 将相对路径转化成绝对路径
    let absPath = path.resolve(id)
    //  先判断文件是否存在如果存在
    if (fs.existsSync(absPath)) {
        return absPath
    }
    // 去尝试添加文件后缀 .js .json 
    let extenisons = Object.keys(Module.extensions)
    for (let i = 0; i < extenisons.length; i++) {
        let ext = extenisons[i]
        // 判断路径是否存在
        let currentPath = absPath + ext // 获取拼接后的路径
        let exits = fs.existsSync(currentPath) // 判断是否存在
        if (exits) {
            return currentPath
        }
    }
    throw new Error('文件不存在')
}

// 尝试加载模块
function tryModuleLoad(module) {
    let ext = path.extname(module.id)
    Module.extensions[ext](module)
}

Module._cache = {}

function req(id) { // 没有异步的api方法
    // 通过相对路径获取绝对路径
    let filename = Module._resolveFilename(id)
    let cache = Module._cache[filename]
    if (cache) { // 如果有缓存直接将模块的结果返回
        return cache.exports
    }
    let module = new Module(filename); // 创建了一个模块
    Module._cache[filename] = module;
    // 加载相关模块 （就是给这个模块的exports赋值）
    tryModuleLoad(module) // module.exports = {}
    return module.exports
}

let str = req('./a')
console.log(str)