class PubSub {
    constructor() {
        // 用对象来存储，是因为事件的名字和事件的处理函数用对象可以很方便的对应起来
        this.events = {}
    }
    publish(eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(cb => {
                cb.apply(this, data)
            })
        }
    }
    subscribe(eventName, cb) {
        if (this.events[eventName]) {
            this.events[eventName].push(cb)
        } else {
            this.events[eventName] = [cb]
        }
    }
    // 取消订阅
    unSubscribe(eventName, cb) {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(item => item !== cb)
        } 
    }
} 