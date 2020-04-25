//* 模块一
function Module1() {}

//* 模块二
function Module2() {}

//! 功能由Module1获取Module2的结果来完成
function use() {
    Module2(Module1())
}

