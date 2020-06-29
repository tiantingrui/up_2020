class Store {
    constructor(options = {}) {
        let { state, mutations, plugins } = options
        this._vm = state
        this._mutations = mutations

        this._subscribe = []
        plugins.forEach(plugin => plugin(this))
    }
    get state() {
        return this._vm
    }
    commit(type, payload) {
        const entry = this._mutations[type]
        if (!entry) {
            return
        }
        entry(this._vm, payload)

        this._subscribe.forEach(sub => sub({type, payload}, this.state))
    }
    subscribe(fn) {
        if (!this._subscribe.includes(fn)) {
            this._subscribe.push(fn)
        }
    }
}
