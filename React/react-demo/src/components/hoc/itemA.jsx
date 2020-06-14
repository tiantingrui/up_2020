import React, { Component } from 'react'; // imrc
import withTooltip from './withTooltip'

// sfc
const ItemA = (props) => {
    return ( 
        <div className='container'>
            <button className='btn btn-primary' type='btn'> TooltipA </button>
            {props.action.showTooltip && (
                <span className='badge badge-pill badge-primary ml-2'>
                    {props.action.content}
                </span>
            )}
        </div>
     );
}
 
export default withTooltip(ItemA);