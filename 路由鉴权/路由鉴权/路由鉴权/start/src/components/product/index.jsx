import React, { Component } from "react";

import { Card } from "antd";
const { Meta } = Card;

class Product extends Component {
  render() {
    return (
      <div>
        <Card
          hoverable
          style={{ width: 240, float: 'left', marginRight:20 }}
          cover={
            <img
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            />
          }
        >
          <Meta title="微专业 React" description="study.163.com" />
        </Card>
        <Card
          hoverable
          style={{ width: 240, float: 'left', marginRight:20 }}
          cover={
            <img
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            />
          }
        >
          <Meta title="微专业 Vue" description="study.163.com" />
        </Card>
        <Card
          hoverable
          style={{ width: 240, float: 'left', marginRight:20 }}
          cover={
            <img
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            />
          }
        >
          <Meta title="微专业 直播" description="study.163.com" />
        </Card>
      </div>
    );
  }
}

export default Product;
