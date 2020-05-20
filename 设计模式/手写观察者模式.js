/*
 * @Author: terry 
 * @Date: 2020-05-20 14:38:51 
 * @Last Modified by: terry
 * @Last Modified time: 2020-05-20 15:05:31
 */
//! Watcher  观察者模式

//* 定义一个发布者类
class Publisher {
    constructor() {
        this.observers = []
    }
    // 增加订阅者
    add(observe) {
        this.observers.push(observe)
    }
    // 移除订阅者
    remove(observe) {
        this.observers.forEach((item, index) => {
            if (item === observe) {
                this.observers.splice(index, 1)
            }
        })
    }
    // 通知所有订阅者
    notify() {
        this.observers.forEach(observer => {
            observer.update(this)
        })
    }
}

//* 定义一个订阅者类
class Observer {
    constructor() {
        console.log('Observe created');
    }
    update() {
        console.log('Observe.update invoked');
    }
}

//* 定义一个具体的需求文档（prd）发布类
class PrdPublisher extends Publisher {
    constructor() {
        super()
        // 初始化需求文档
        this.prdState= null
        // 产品经理还没拉群，开发群目前为空
        this.observers = []
        console.log('PrdPublisher created');
    }
    // 获取当前的proState
    getState() {
        return this.prdState
    }
    // 改变当前的prdState
    setState(state) {
        this.prdState = state
        this.notify()
    }
}

//* 具体的订阅类 （开发者，（前端，后端，测试））
class DeveloperObserver extends Observer {
    constructor() {
        super()
        // 需求文档一开始还不存在，prd 初始为空对象
        this.prdState = {}
        console.log('DeveloperObserve created');
    }
    // 重写一个具体的update 方法
    update(publisher) {
        // 更新需求文档
        this.prdState = publisher.getState()
        // 调用工作函数
        this.work()
    }
    // work 用于搬砖的一个方法
    work() {
        // 获取需求文档
        const prd = this.prdState
        // todo
        console.log('996 begins ...');
    }
}

// 创建一个订阅者 d1
const d1 = new DeveloperObserver()
// 订阅者 d2
const d2 = new DeveloperObserver()
// 订阅者 d3
const d3 = new DeveloperObserver()

//? 创建产品经理（发布者）
const p1 = new PrdPublisher()
// 需求文档出现了
const prd = {
    // todo 具体的需求内容
}

// 产品经理开始拉群
p1.add(d1)
p1.add(d2)
p1.add(d3)
// 产品经理发送需求文档，并@了所有人
p1.setState(prd)