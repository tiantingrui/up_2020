//* 编写导航组件，有的带消息提示，有的时竖着，有的是横着
function baseNav() {
    // 基础类，此处定下基本骨架
}
baseNav.prototype.action = function(fn) {
    // 特异性的处理，留出一个回调等待具体实现
}

//! 弹窗
function basePop(word, size) {
    this.word = word;
    this.size = size;
    this.dom = null;
}
basePop.prototype.init = function() {
    var div = document.createElement('div');
    div.innerHTML = this.word;
    div.style.width = this.size.width + 'px'
    div.style.height = this.size.height + 'px'
    this.dom = div;
}
basePop.prototype.hidden = function() {
    this.dom.style.display = 'none';
}
basePop.prototype.confirm = function() {
    this.dom.style.display = 'none';
}
// 创建一个特殊ajax弹窗，继承basePop
function ajaxPop(word, size) {
    basePop.call(this, word, size)
}
ajaxPop.prototype = new basePop()
var hidden = ajaxPop.prototype.hidden;
ajaxPop.prototype.hidden = function() {
    hidden.call(this);
    console.log(1)
}
var confirm = ajaxPop.prototype.confirm;
ajaxPop.prototype.confirm = function() {
    this.confirm.call(this);
    $.ajax(); // 发个ajax请求
}

//? 计算器
function counter() {
    this.beforeCounter = [];
    this.afterCounter = []
}
counter.prototype.addBefore = function(fn) {
    this.beforeCounter.push(fn)
}
counter.prototype.addAfter = function(fn) {
    this.afterCounter.push(fn)
}
counter.prototype.count = function(num) {
    var _resultnum = num
    var _arr= [baseCount]
    _arr = this.beforeCounter.concat(_arr)
    _arr = _arr.concat(this.afterCounter);
    function baseCount(num) {
        num += 4;
        num *= 4;
        return num;
    }
    while (_arr.length > 0) {
        _resultnum = _arr.shift()(_resultnum)
    }
    return _resultnum;
}
var countObjext = new counter();
countObjext.addBefore(function(num) {
    num --;
    return num
})
countObjext.addAfter(function(num) {
    num *= 2;
    return num;
})
countObjext.count(10);