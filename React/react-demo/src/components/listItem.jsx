import React, { Component } from 'react';

class ListItem extends Component {
    constructor ( props ) {
        super(props)
    }

    manageCount () {
        return count + '个'
    }

    render() { 
        return ( 
            <div className='row mb-3'>
                <div className='col-6 themed-grid-col'>{this.props.data.name}</div>
                <div className='col-1 themed-grid-col'>{this.props.data.price}</div>
                <div className='col-2 themed-grid-col'>{count}</div>
            </div>
         );
    }
}
export default ListItem;