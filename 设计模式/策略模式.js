/*
 * @Author: mikey.zhaopeng 
 * @Date: 2020-04-25 22:31:15 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-04-25 22:33:31
 */
/*
 * @Author: mikey.zhaopeng 
 * @Date: 2020-04-25 22:31:08 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2020-04-25 22:31:08 
 */
//! 基本结构
function Strategy(type, a, b) {
    var Strategy = {
        add: function (a, b) {
            return a + b
        },
        minus: function (a, b) {
            return a - b
        },
        division: function (a, b) {
            return a / b
        }
    }
    return Strategy[type](a, b)
}

//! **需求：**项目有一个动态的内容，根据用户权限的不同显示不同的内容。
function showPart1() {
    console.log(1);
}
function showPart2() {
    console.log(2);
}
function showPart3() {
    console.log(3);
}
axios.get('xxx').then(res => {
    if (res === 'boss') {
        showPart1()
        showPart2()
        showPart3()
    } else if (res === 'manner') {
        showPart1()
        showPart2()
    } else if (res === 'staff') {
        showPart3()
    }
})
function showControll() {
    this.status = '';
    this.power = {
        boss: function () {
            showPart1()
            showPart2()
            showPart3()
        },
        manner: function () {
            showPart1()
            showPart2()
        },
        staff: function () {
            showPart3()
        }
    }
}
showControll.prototype.show = function() {
    var self = this
    axios.get('xxx').then(res => {
        self.status = res;
        self.power[self.status]
    })
}