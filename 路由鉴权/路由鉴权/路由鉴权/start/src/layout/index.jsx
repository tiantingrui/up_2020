import React, { Component } from "react";
import { NavLink } from "react-router-dom"
import { Layout, Menu } from "antd";  

const { Header, Sider, Content } = Layout;
const MenuItem = Menu.Item;


class MyLayout extends Component {


  render() {
    return (
      <Layout>
        <Header style={{height : '10vh'}}>
          <h2 className="admin-title">微专业课程管理</h2>
        </Header>
        <Layout style={{height : '90vh'}}>
          <Sider width={200}>
            <Menu
              theme="dark"
              mode="inline"
              style={{ height: "100%", borderRight: 0 }}
            >
              menus
            </Menu>
          </Sider>
          <Content style={{ padding: 20 }}>
              contents
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default MyLayout;
