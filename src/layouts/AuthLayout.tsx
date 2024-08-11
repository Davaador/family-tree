import React, {useState} from 'react';
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {Button, Flex, Menu, MenuProps, theme, Layout, ConfigProvider} from "antd";
import {
    CalendarOutlined,
    DashboardOutlined,
    LogoutOutlined,
    MailOutlined,
    MenuFoldOutlined, MenuUnfoldOutlined,
    UserOutlined
} from "@ant-design/icons";
import {Link, NavLink, useLocation, Outlet} from "react-router-dom";
import Dropdown from "antd/lib/dropdown/dropdown";

const AuthLayout = () => {
    const location = useLocation();
    const [isCollapsed, toggleCollapse] = useState(false);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const menuItems = [
        {
            key: "/",
            icon: <DashboardOutlined />,
            label: <NavLink to="/">{"dashboard.dashboard"}</NavLink>,
        },
        {
            key: "/dash",
            icon: <MailOutlined />,
            label: <NavLink to="/dash">{"dashboard.requests"}</NavLink>,
        },
        {
            key: "/category",
            icon: <CalendarOutlined />,
            label: <NavLink to="/category">{"dashboard.category"}</NavLink>,
        },
    ];
    const items: MenuProps["items"] = [
        {
            key: "1",

            icon: <UserOutlined />,
            label: <Link to={"/profile"}>{"dashboard.profile"}</Link>,
        },
        {
            key: "2",
            icon: <LogoutOutlined />,
            label: <Link to={"/logout"}>{"dashboard.logout"}</Link>,
        },
    ];
    return (
        <Layout style={{minHeight: "100vh"}}>
            <ConfigProvider theme={{
                token: {
                    colorPrimary: '#c084fc',
                    borderRadius: 5,
                    colorBgContainer: '#f6ffed',
                },
            }} >
                <Sider trigger={null} collapsible collapsed={isCollapsed}>
                    <div className='p-2'>
                        <Menu
                            selectedKeys={[location.pathname]}
                            theme="dark"
                            mode="inline"
                            items={menuItems}
                        />
                    </div>
                </Sider>
                <Layout>
                    <Header style={{padding:0, background:colorBgContainer }}>
                        <Flex vertical={false} style={{width: '100%'}} >

                            <Flex style={{flex:1}}>
                                <Button type="text"
                                        icon={isCollapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                                        style={{fontStyle: '16px', width: 64, height: 64}} onClick={() => toggleCollapse(!isCollapsed)}/>
                            </Flex>
                            <Flex justify='flex-end' style={{flex: 1}}>
                                <Dropdown menu={{items}} placement="bottomRight">
                                    <Button type="text" icon={<UserOutlined/>} style={{fontSize: '16px', width: 64, height: 64}}/>
                                </Dropdown>
                            </Flex>
                        </Flex>
                    </Header>
                    <Content style={{margin: '24px 16px', padding: 24, minHeight: 280, background: colorBgContainer, borderRadius: borderRadiusLG}} >
                        <Outlet/>
                    </Content>
                    <Footer style={{ textAlign: "center" }}>
                        © Copyright By {new Date().getFullYear()} SEED
                    </Footer>
                </Layout>
            </ConfigProvider>
        </Layout>
    );
};

export default AuthLayout;