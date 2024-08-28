import {
  BellOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Drawer,
  Flex,
  FloatButton,
  Layout,
  MenuProps,
  theme,
  Typography,
} from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Dropdown from "antd/lib/dropdown/dropdown";
import { authStore, languageStore } from "context/auth/store";
import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";
import Flag from "react-world-flags";
import AppMenu from "./AppMenu";
const { Text } = Typography;

const AuthLayout = () => {
  const [isCollapsed, toggleCollapse] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { authUser } = authStore();
  const { language, changeLanguage } = languageStore();
  const { t } = useTranslation();
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
    <Layout style={{ minHeight: "100vh" }}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#65eaae",
            borderRadius: 5,
            colorBgContainer: "#f6ffed",
          },
        }}
      >
        <Drawer
          open={openMenu}
          onClose={() => setOpenMenu(false)}
          placement="left"
          closable={false}
        >
          <AppMenu />
        </Drawer>

        <Layout>
          <Header style={{ padding: 0, background: "transparent" }}>
            <Flex vertical={false} style={{ width: "100%" }}>
              <Flex style={{ margin: "16px 16px" }} className="menuIcon">
                <MenuOutlined onClick={() => setOpenMenu(!openMenu)} />
              </Flex>
              <Flex
                style={{
                  margin: "16px 16px",
                  flex: 1,
                  flexDirection: "column",
                }}
              >
                <Text strong>
                  {t("general.welcome")}, {authUser?.firstName}
                </Text>
                <Text style={{ color: "#ADA7A7" }}>
                  {dayjs().format("YYYY-MM-DD  HH:mm:ss")}
                </Text>
              </Flex>
              <Flex justify="flex-end" style={{ flex: 1 }}>
                <Button
                  type="text"
                  icon={<BellOutlined />}
                  style={{ fontSize: "16px", width: 64, height: 64 }}
                />
                <Dropdown menu={{ items }} placement="bottomRight">
                  <Button
                    type="text"
                    icon={<UserOutlined />}
                    style={{ fontSize: "16px", width: 64, height: 64 }}
                  />
                </Dropdown>
              </Flex>
            </Flex>
          </Header>
          <Layout>
            <Flex className="siderMenu">
              <Sider
                collapsible
                collapsed={isCollapsed}
                onCollapse={(value) => {
                  toggleCollapse(value);
                }}
                theme="light"
              >
                <AppMenu />
              </Sider>
            </Flex>

            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: "auto",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
              <FloatButton.Group shape="circle" style={{ insetInlineEnd: 24 }}>
                <FloatButton
                  onClick={() => changeLanguage(language)}
                  icon={
                    <Flag
                      code={language === "mn" ? "US" : "MN"}
                      style={{ width: 20, height: 20 }}
                    />
                  }
                />
                {/* <FloatButton.BackTop visibilityHeight={0} /> */}
              </FloatButton.Group>
            </Content>
          </Layout>

          {/* <Footer style={{ textAlign: "center" }}>
            © Copyright By {new Date().getFullYear()}
          </Footer> */}
        </Layout>
      </ConfigProvider>
    </Layout>
  );
};

export default AuthLayout;
