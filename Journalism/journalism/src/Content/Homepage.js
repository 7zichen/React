import '../css/Homepage.css'
import React from 'react'
import {Outlet,Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined,} from '@ant-design/icons';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
export default function Homepage() {

    return (
        <div>
            <Layout>
                <Header className="header" style={{background:'#26385C'}}>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{background:'#26385C'}}>
                        <Menu.Item key="1">LOGO</Menu.Item>
                        <Menu.Item key="2">新闻管理系统</Menu.Item>
                        <Menu.Item key="3"><span id='administrators'>管理员 您好！</span></Menu.Item>
                        <Menu.Item key="4"><span id='stration'>管理</span></Menu.Item>
                        <Menu.Item key="5"><span id='Safeexit'><Link to={"/"} id='tui'>安全退出</Link></span></Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px'}}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%'}}
                            >
                                <SubMenu key="sub1" icon={<UserOutlined />} title="栏目管理">
                                    <Menu.Item key="1"><Link to="/Homepage/AddTo">栏目编号</Link></Menu.Item>
                                    <Menu.Item key="2"><Link to="/Homepage/Manage">栏目管理</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<LaptopOutlined />} title="新闻管理">
                                    <Menu.Item key="5"><Link to="/Homepage/UserAdd">新闻添加</Link></Menu.Item>
                                    <Menu.Item key="6"><Link to="/Homepage/Admin">新闻管理</Link></Menu.Item>
                                    <Menu.Item key="7"><Link to="/Homepage/Query">新闻查询</Link></Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}><Outlet/></Content>
                    </Layout>
                </Content>
            </Layout>
        </div>
    )
}

