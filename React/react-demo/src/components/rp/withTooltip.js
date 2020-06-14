import React from 'react'

class WithTooltip extends React.Component {
    state = {
        showTooltip: false,
        content: ''
    }

    handleOver = (ev) => this.setState({showTooltip: true, content: ev.target.innerText})
    handleOut = () => this.setState({showTooltip: false, content: ''})

    render() {
        return (
            <div onMouseOver={this.handleOver} onMouseOut={this.handleOut}>
                {this.props.render(this.state)}
            </div>
        )
    }
    render() {
        return (
            <div onMouseOver={this.handleOver} onMouseOut={this.handleOut}>
                {this.props.children(this.state)} // 函数 props.children 作为子组件
            </div>
        )
    }
}

export default WithTooltip;