

class EventEmitter {
    constructor() {
        // eventMap 用来存储对象
        this.eventMap = {}
    }

    // 订阅 - 写操作
    on(type, handler) {
        // 注意：handler必须是一个函数
        if (!handler instanceof Function) {
            throw new Error('handler 必须是一个函数')
        }
        if (!this.eventMap[type]) {
            this.eventMap[type] = []
        }
        this.eventMap[type].push(handler)
    }

    // 发布 - 读操作
    emit(type, params) {
        if (this.eventMap[type]) {
            this.eventMap[type].forEach(handler => handler(params))
        }
    }

    // 取消订阅
    off(type, handler) {
        if (this.eventMap[type]) {
            this.eventMap[type].splice(this.eventMap[type].indexOf(handler) >>> 0, 1)
        }
    }
}