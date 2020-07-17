import React, { Component } from "react";
import { Card, Col, Row } from "antd";

class Backend extends Component {
  render() {
    return (
      <div>
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={8}>
              <Card title="微专业JS" bordered={false}>
                微专业JS
              </Card>
            </Col>
            <Col span={8}>
              <Card title="微专业Vue" bordered={false}>
                微专业Vue
              </Card>
            </Col>
            <Col span={8}>
              <Card title="微专业React" bordered={false}>
                微专业React
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Backend;
