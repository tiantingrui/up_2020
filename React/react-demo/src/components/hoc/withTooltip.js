import React from 'react'

const withTooltip = (Component) => {
    class HOC extends React.Component {
        state = {
            showTooltip: false,
            content: ''
        }
        handleOver = (ev) => this.setState({showTooltip: true, content: ev.target.innerText})
        handleOut = () => this.setState({showTooltip: false, content: ''})

        render() {
            return (
                <div onMouseOver={this.handleOver} onMouseOut={this.handleOut}>
                    <Component action={this.state} {...props} />  // props 传递, 将所有传入的props 解构展开
                </div>
            )
        }
    }
    return HOC
}
 
export default withTooltip;