//! 基本结构
function observe() {
    this.message = {}
}
observe.prototype.regist = function(type, fn) {
    this.message[type] = fn
}
observe.prototype.fire = function(type) {
    this.message[type]()
}
observe.prototype.remove = function(type) {
    this.message[type] = null
}