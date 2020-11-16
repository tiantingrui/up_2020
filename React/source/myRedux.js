/* 
    手写 redux
*/

// reducer 修改规则，是一个函数
export function createStore(reducer, enhancer) {

    if (enhancer) {
        return enhancer(createStore)(reducer)
    }

    let currentState = undefined
    let currentListeners = []

    function getState() {
        // 获取当前数据
        return currentState
    }

    function dispatch(action) {
        currentState =  reducer(currentState, action)
        // 监听函数是一个数组，循环数组
        currentListeners.map(listener => listener())
    }

    // 订阅，可以多次订阅
    function subscribe(listener) {
        // 每次订阅，把回调放入回调数组
        currentListeners.push(listener)
    }

    // 取值的时候，注意一定要保证不和项目中的会重复, 手动触发初始值
    dispatch({type: '@INIT/MY-REDUX'})

    return {
        getState,
        dispatch,
        subscribe
    }
}

// applyMiddleware 中间件，增强dispatch
export function applyMiddleware(...middleWares) {   

    return createStore => (...args) => {
        const store = createStore(...args)
        let dispatch = store.dispatch
        const middleApi = {
            getState: store.getState,
            dispatch
        }
        // 给 middleWare 参数， 比如说dispatch
        const middleWaresChain = middleWares.map(middleware => {
            middleWare(middleApi)
        })

        dispatch =  compose(...middleWaresChain)(dispatch)

        return {
            ...store,
            // 覆盖上面 store 里面的dispatch
            dispatch
        }
    }

}

function compose(...funcs) {
    if (funcs.length === 0) {
        return arg => arg
        // return () => {}
    }
    if (funcs.length === 1) {
        return funcs[0]
    }
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}