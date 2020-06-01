/*
 * @Author: terry 
 * @Date: 2020-06-01 21:47:30 
 * @Last Modified by: terry
 * @Last Modified time: 2020-06-01 22:19:03
 */
/*
 * @Author: terry 
 * @Date: 2020-06-01 21:47:25 
 * @Last Modified by:   terry 
 * @Last Modified time: 2020-06-01 21:47:25 
 */
/* 假设现在需要做一个轮播图，该轮播图能够支持多种播放方式（如渐显渐隐，左右滑动切换，上下滑动切换）。
请说明你会如何设计模块，组织模块间的沟通；。并设想如要实现该轮播图的需求，我们可以用到什么设计模式。
提交说明：

（1）无需提交代码，请提交设计图及说明文档，说明其中哪个需求会用到什么设计模式，大体设计思路如何。

（2）提交时将图片及说明文档（word或pdf格式）打包为zip文件，
命名为“设计模式1-云课堂昵称”，如“设计模式1-周星星”。 */

function Carousel() {
    this.initer = new initer();
    this.imgControl = new imgControl();
    this.stateControl = new stateControl();
    this.play = new Play();
}
function initer() {}
initer.prototype.initStyle = function() {}
initer.prototype.renderDom = function() {}
function imgControl() {}
imgControl.prototype.setSize = function() {}
imgControl.prototype.initImgNum = function() {}
imgControl.prototype.changeImgNum = function() {}
function stateControl() {}
stateControl.prototype.nextImg = function() {}
stateControl.prototype.prevImg = function() {}
function Play() {
}
Play.prototype.playmode = function() {
    // 播放方式
}
Play.prototype.playSpeed = function() {
    // 播放速率
}
window.Carousel = Carousel
//
/* 请为项目设计一个商品信息缓存器，需求描述如下：
（1）可根据商品id判断商品是否加载过，如果加载过，直接从缓存里拿；如没有，则请求；
（2）如果是热门商品，缓存于全局的对象里；如果是非热门商品，则缓存于localStorage中；
全局对象和localStorage中的商品数量上限可以配置；
（3）可主动调用api来更新某个商品的信息。

提交说明：

（1）需要给出代码，可略过某些非核心代码；

（2）如代码量大，请打包为zip压缩文件提交，文件命名为“设计模式2-云课堂昵称”，如“设计模式2-周星星”；

（3）如代码量较小，可直接粘贴在下方答题文本框中。 */


// 热门商品缓存于全局对象里
let GOODS = []
// 先本地存一个空数组
localStorage.setItem('arr', '[]')
// 模拟一个商品的数据结构
let good = {
    id: 1,
    type: 'hot',
    xx: ''
}
// 商品信息缓存器
function goodInfoContainer(good) {
    let globalArr = GOODS
    let localArr = JSON.parse(localStorage.getItem('arr'))
    let totalArr = globalArr.concat(localArr)
    let cacheOne;
    let cacheOne = totalArr.filter(item => {
        return item.id === good.id
    })[0]
    if (!!cacheOne) {
        return cacheOne
    } else {
        getItem(good.id)
    }
}
// 要去缓存商品的方法
function cacheGood(data) {
    if (data.type === 'hot') {
        GOODS.push(data)
    } else {
        let arr = JSON.parse(localStorage.getItem('arr'))
        arr.push(data)
        localStorage.setItem('arr', JSON.stringify(arr))
    }
}
// 获取这个商品
function getItem(id) {
    // 发请求去拿数据，假设封装好了一个 api 拿数据的方法
    api('get', 'xx?' + qs.stringify(id))
    .then(res => {
        if (res.success) {
            // 拿到数据之后 判断 数据的类型是 否 hot
            cacheGood(res.data)
        } else {
            // 异常处理
        }
    }, err => {
        // 异常处理
    })
}
// 更新某个商品信息
function updateItem(id) {
    api('post', 'xx', id)
    .then(res => {
        if (res.success) {
            // 重新判断商品是否是热门商品
            cacheGood(res.data)
        } else {
            // 异常处理
        }
    }, err => {
        // 异常处理
    })
}
