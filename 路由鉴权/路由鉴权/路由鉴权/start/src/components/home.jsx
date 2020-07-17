import React, { Component } from 'react';
import { Button } from "antd"

class Home extends Component {

  render() { 
    return ( 
      <div className="home">
        <Button className="enter-btn" type="primary" size="large" >点击进入</Button>
      </div>
     );
  }
}
 
export default Home;