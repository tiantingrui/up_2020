//* 有三种形状，每种形状都有3种颜色
function rect(color) {
    showcolor(color);
}
function circle(color) {
    showcolor(color)
}
function delta(color) {
    showcolor(color)
}
function showcolor(color) {}
// ...红色 ..绿色 .黄色
// 需要一个红色的圆形
new circle('red')

//! Express 源码片段
function express() {}
express.prototype.get = function(){}
express.prototype.post = function(){}
express.prototype.delete = function(){}

var methods = ['get', 'post', 'delete', 'put'];
methods.forEach(function(method) {
    app[method]=function() {
        route[method].apply(route, slice.call(arguments, 1))
    }
})