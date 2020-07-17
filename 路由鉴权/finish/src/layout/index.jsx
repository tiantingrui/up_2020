import React, { Component } from "react";
import { NavLink } from "react-router-dom"
import { Layout, Menu } from "antd";  
import { navi, componentsRoutes } from "../router/routes"
import renderRoutes from '../router/renderRoutes'

const { Header, Sider, Content } = Layout;
const MenuItem = Menu.Item;

const auth = window.user.data

class MyLayout extends Component {

  renderMenu = () =>{
    return navi.map(item => {
      return item.permission.indexOf(auth) >=0 ? 
       <MenuItem key={item.key}><NavLink to={item.path}>{item.title}</NavLink></MenuItem> :  null;
		})
  }

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
              {this.renderMenu()}
            </Menu>
          </Sider>
          <Content style={{ padding: 20 }}>
              {renderRoutes(componentsRoutes)}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default MyLayout;
