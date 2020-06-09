function vuexInit() {
    const options = this.$options
    if (options.store) {
        this.$store = options.store
    } else {
        this.$store = options.parent.$store
    }
}


class Store {
    constructor (options) {
        const {state, mutations, actions} = options
        this._state = state
        this._mutations = mutations
        this._actions = actions
    }
    commit(type, payload, _options) {
        const entry = this._mutations[type]
        if (!entry) {
            entry()
        }
    }
    dispatch(type, payload) {
        const entry = this._actions[type]

        return entry.length > 1
        ? Promise.all(entry.map(handler => handler(payload)))
        : entry[0](payload)
    }
}
