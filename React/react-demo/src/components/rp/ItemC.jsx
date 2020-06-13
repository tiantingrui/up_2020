import React, { Component } from 'react'; // imrc
import WithTooltip from './withTooltip'

// sfc
const ItemC = (props) => {
    return ( 
        <div className='container'>
            <WithTooltip render={ ( { showTooltip, content } ) => {
                <div>
                <button className='btn btn-primary' type='btn'> TooltipC </button>
                {showTooltip && (
                <span className='badge badge-pill badge-primary ml-2'>
                    {content}
                </span>
                )}
                </div>
            } } />
        </div>
     );
}

const ItemC = (props) => {
    return ( 
        <div className='container'>
            <WithTooltip>
            { ( { showTooltip, content } ) => {
                <div>
                <button className='btn btn-primary' type='btn'> TooltipC </button>
                {showTooltip && (
                <span className='badge badge-pill badge-primary ml-2'>
                    {content}
                </span>
                )}
                </div>
            } }
            </WithTooltip>
        </div>
     );
}
 
export default ItemC;