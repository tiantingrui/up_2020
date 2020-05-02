//* 单例模式的基本结构
let Singleton = function(name) {
    this.name = name
}
Singleton.getInstance = function(name) {
    if (this.instance) {
        return this.instance
    }
    return this.instance = new Singleton(name)
}