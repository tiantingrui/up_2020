import {createStore, applyMiddleware} from './myRedux'
import thunk  from ' redux-thunk'
import logger from 'redux-logger'

// 定义修改规则
function countReducer(state = 0, action) {
    switch (action.type) {
        case "ADD":
            return state + 1
        case "MINUS":
            return state - 1
        default: 
            return state
    }
}

const store = createStore(countReducer, applyMiddleware(logger, thunk))

export default store

function logger({getState, dispatch}) {
    return dispatch => action => {
        console.log(action.type + '执行了')
        return dispatch(action)
    }
}

function thunk({getState, dispatch}) {
    return dispatch => action => {
        // action 可以是对象，也可以是函数，不同的形式，操作也不同
        if (typeof action === 'function') {
            return action(dispatch, getState)
        } else {
            return dispatch(action)
        }
    }
}