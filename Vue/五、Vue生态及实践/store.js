import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.store({
    state: {
        count: 0
    },
    getters: {
        doubleCount: state => state.count * 2
    },
    mutations: {
        addCount(state, payload = 1) {
            state.count += 1
        }
    },
    actions: {
        asyncAddCount({commit}) {
            setTimeout(() => {
                commit('addCount')
            }, 1500)
        }
    }
})