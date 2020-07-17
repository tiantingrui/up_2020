import React, { Component } from "react";
import { Button } from "antd";

const auth =  2;
console.log(window.user);

class Home extends Component {
  handleEnter = () => {
    if (auth === 1) {
      window.location.href = "/login";
    } else {
      window.location.href = "/backend";
    }
  };

  render() {
    return (
      <div className="home">
        <Button
          onClick={this.handleEnter}
          className="enter-btn"
          type="primary"
          size="large"
        >
          点击进入
        </Button>
      </div>
    );
  }
}

export default Home;
