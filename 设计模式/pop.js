//? 弹窗
(function(){
    //* 创建三个消息弹窗，3个确认，3个取消，分别有不同的v颜色
    function pop(type, content, color) {
        if (this instanceof pop) {
            var s = new this[type](content, color)
        } else {
            return new pop(type, content, color)
        }
    }
    pop.prototype.infoPop = function() {}
    pop.prototype.confirmPop = function() {}
    pop.prototype.cancelPop = function() {}
    window.pop = pop;
})()
var arr = [
    {
        type: 'infoPop',
        word: 'hello',
        color: 'red'
    },
    {
        type: 'confirmPop',
        word: 'hello1',
        color: 'pink'
    },
    {
        type: 'cancelPop',
        word: 'hello2',
        color: 'green'
    }
]

pop('infoPop', 'hello', 'red');