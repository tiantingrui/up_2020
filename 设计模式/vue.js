function Vue(options) {
    if ((!this instanceof Vue)) {
        console.warn();
    } 
    this._init(options)
}

initMinxin(Vue);
storeMixin(Vue);
eventsMixin(Vue);
lifeCycle(Vue);
renderMixin(Vue)