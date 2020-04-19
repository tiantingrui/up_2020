let _Vue;
function install(Vue) {
    if (install.installed && _Vue === Vue) return 
    install.installed = true

    _Vue = Vue
}

Vue.use