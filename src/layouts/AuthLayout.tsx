import {
  BellOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Button,
  ConfigProvider,
  Drawer,
  Flex,
  FloatButton,
  Layout,
  Menu,
  MenuProps,
  theme,
  Typography,
} from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { authStore, languageStore } from 'context/auth/store';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router-dom';
import Flag from 'react-world-flags';
import AppMenu from './AppMenu';
const { Text } = Typography;

const AuthLayout = () => {
  const [isCollapsed, toggleCollapse] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { token } = theme.useToken();
  const { authUser } = authStore();
  const { language, changeLanguage } = languageStore();
  const { t } = useTranslation();
  const { innerWidth } = window;
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const items: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: <Link to={'/profile'}>{t('general.profile')}</Link>,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: <Link to={'/logout'}>{t('general.logout')}</Link>,
    },
  ];
  console.log(token, 'sssss');

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#65eaae',
            borderRadius: 5,
            colorBgBase: '#f0f2f5',
            colorBgContainer: '#f6ffed',
          },
        }}
      >
        <Drawer
          open={openMenu}
          onClose={() => setOpenMenu(false)}
          placement="left"
          closable={false}
          width={innerWidth / 1.5}
        >
          <AppMenu onPress={() => setOpenMenu(false)} />
        </Drawer>

        <Layout>
          <Header style={{ padding: 0, background: 'transparent' }}>
            <Flex vertical={false} style={{ width: '100%' }}>
              <Flex style={{ margin: '16px 16px' }} className="menuIcon">
                <MenuOutlined onClick={() => setOpenMenu(!openMenu)} />
              </Flex>
              <Flex
                style={{
                  margin: '16px 16px',
                  flex: 1,
                  flexDirection: 'column',
                }}
              >
                <Text strong>
                  {t('general.welcome')}, {authUser?.firstName}
                </Text>
                <Text style={{ color: '#ADA7A7' }}>
                  {dayjs().format('YYYY-MM-DD  HH:mm:ss')}
                </Text>
              </Flex>
              <Flex justify="flex-end" style={{ flex: 1 }}>
                <Button
                  type="text"
                  icon={<BellOutlined />}
                  style={{ fontSize: '16px', width: 64, height: 64 }}
                />
                <div className="relative" ref={profileDropdownRef}>
                  <Button
                    type="text"
                    icon={<UserOutlined />}
                    style={{ fontSize: '16px', width: 64, height: 64 }}
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  />
                  {profileDropdownOpen && (
                    <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[120px]">
                      <Menu
                        items={items}
                        style={{ border: 'none', boxShadow: 'none' }}
                        onClick={() => setProfileDropdownOpen(false)}
                      />
                    </div>
                  )}
                </div>
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
                margin: '0px 12px',
                padding: 12,
                // minHeight: 'auto',
                borderRadius: token.borderRadiusLG,
                backgroundColor: token.colorBgBlur,
              }}
            >
              <Outlet />
              <FloatButton.Group shape="circle" style={{ insetInlineEnd: 24 }}>
                <FloatButton
                  onClick={() => changeLanguage(language)}
                  icon={
                    <Flag
                      code={language === 'mn' ? 'US' : 'MN'}
                      style={{ width: 20, height: 20 }}
                    />
                  }
                />
              </FloatButton.Group>
            </Content>
          </Layout>

          <Footer style={{ textAlign: 'center' }}>
            © Copyright By {new Date().getFullYear()}
          </Footer>
        </Layout>
      </ConfigProvider>
    </Layout>
  );
};

export default AuthLayout;
