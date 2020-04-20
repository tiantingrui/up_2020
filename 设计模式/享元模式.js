//* 有一百种不同文字的弹窗，有种弹窗行为相同，但是文字和样式不同，我们没必要新建一百个弹窗对象
function Pop() {}
//* 保留同样的行为
Pop.prototype.action = function() {}
Pop.prototype.show = function() {
    //* 显示弹窗
}
//* 提取出每个弹窗会不同的部分作为一个外部数组
var popArr = [
    {text: 'this is window1', style: [400, 400]},
    {text: 'this is window2', style: [400, 200]}
]
var poper = new Pop()
for (var i=0; i<100; i++) {
    poper.show(popAr[i]);
}


//! 文件上传
var data = [
    {
        type: 'img',
        file: fileobj1
    },
    {
        type: 'txt',
        file: fileobj2
    },
    {
        type: 'html',
        file: fileobj3
    },
    {
        type: 'word',
        file: fileobj4
    },
]
function uploader(){}
uploader.prototype.init = function(){
    //* 初始化文件上传的html
}
uploader.prototype.delete = function(){
    //* 删掉该html
}
uploader.prototype.uploading = function(fileType, file) {
    //* 上传
}
var uploader = new uploader();
for (var i=0; i<DataCue.length; i++) {
    uploader.uploading(data[i].type, data[i].file);
}


//! $.extend()
$.extend({a:1})
$.extend({a:1}, {b:1}) // {a:1,b:1}
//* 一般操作
function extend() {
    if (arguments.length === 1) {
        for (var item in arguments[0]) {
            this[item] = arguments[0][item]
        }
    } else {
        for (var item in arguments[1]) {
            arguments[0][item] = arguments[1][item]
        }
    }
}
//? 享元模式做法
function extend() {
    var target = arguments[0];
    var source;
    if (arguments === 1) {
        target = this;
        source = arguments[0];
    } else {
        target = arguments[0];
        source = arguments[1];
    }
    for (var item in source) {
        target[item] = source[item];
    }
}
