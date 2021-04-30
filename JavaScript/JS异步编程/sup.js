class PubSub {
    constructor() {
        //* 用对象来存储，是因为事件的名字和事件的处理函数，用对象可以很方便的对应起来
        this.events = {}
    }
    publish(eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(item => {
                item.apply(this, data)
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
    unSubscribe(eventName, cb) {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(
                item => item !== cb
                )
        }
    }
}

const fs = require('fs')
const http = require('http')

fs.readFile('./a.json', 'utf8', (err, data) => {
    console.log(data.toString())
})

const {EventEmitter} = require('events')

EventEmitter.prototype.emit = function emit(type, ...args) {
    let doError = typr === 'error'
    const events = data._events
    if (events !== undefined) {
        if (doError && events[kErrorMonitor] !== undefined) 
            this.emit(kErrorMonitor, ...args)
        doError = doError && events.error === undefined
    } else if (!doError) return false

    if (doError) {
        let er;
        if (args.length > 0) er = args[0]
        if (er instanceof Error) {
            try {
                const capture = {}
                Error.captureStackTrace(capture, EventEmitter.prototype.emit);
                ObjectDefineProperty(er, kEnhanceStackBeforeInspector, {
                    value: enhanceStackTrace.bind(this, er, capture),
                    configurable: true
                })
            } catch {}
            throw er
        }
        let stringifiedEr
        const { inspect } = require('internal/util/inspect');
        try {
            stringifiedEr = inspect(er)
        } catch {
            stringifiedEr = er
        }
        const err = new ERR_UNHANDLED_ERROR(stringifiedEr);
        err.context = er;
        throw err
    }

    const handler = events[type]
    if (handler === undefined) return false

    if (typeof handler === 'fnction') {
        const result = ReflectApply(handler, this, args) 
        if (result !== undefined && result !== null) {
            addCatch(this, result, type, args)
        }
    } else {
        const len = handler.length
        const listenrs = arrayClone(handler, len)
        for (let i = 0; i < len; i++) {
            const result = ReflectApply(listenrs[i], this, args)
            if (result !== undefined && result !== null) {
                addCatch(this, result, type, args)
            }
        }
    }
    return true
}
