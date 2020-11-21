import React from 'react';
import store from '../index'

class ReduxPage extends Component {

    componentDidMount() {
        store.subscribe(() => {
            this.forceUpdate()
        })
    }

    add = () => {
        store.dispatch({type: 'ADD'})
    }
    minus = () => {
        store.dispatch({type: 'MINUS'})
    }
    asyncAdd = () => {
        // 派发操作
        store.dispatch(dispatch => {
            setTimeout(() => {
                dispatch({type: 'ADD'})
            }, 1000)
        })
    }

    render() { 
        console.log('store', store)
        return ( 
            <div>
                <h3>ReduxPage</h3>
                {/* getState 获取数据 */}
                <p>{store.getState()}</p>
                <button onClick={this.add}>add</button>
                <button onClick={this.minus}>minus</button>
                <button onClick={this.asyncAdd}>asyncAdd</button>

            </div>
         );
    }
}
 
export default ReduxPage;