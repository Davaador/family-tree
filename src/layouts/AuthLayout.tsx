import {
  BellOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Badge,
  Button,
  ConfigProvider,
  Drawer,
  Flex,
  FloatButton,
  Layout,
  Menu,
  MenuProps,
  Typography,
} from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { authStore, languageStore } from 'context/auth/store';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Flag from 'react-world-flags';

import { useResponsive } from '../hooks';

import AppMenu from './AppMenu';

const { Text, Title } = Typography;

const AuthLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(dayjs());
  const { authUser } = authStore();
  const { language, changeLanguage } = languageStore();
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  const navigate = useNavigate();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.profile-dropdown')) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const profileMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: t('general.profile'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: t('general.settings'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t('general.logout'),
      danger: true,
    },
  ];

  const handleProfileMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'profile':
        navigate('/profile');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'logout':
        navigate('/logout');
        break;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#65eaae',
            borderRadius: 8,
            colorBgBase: '#ffffff',
            colorBgContainer: '#ffffff',
            colorBgLayout: '#f5f5f5',
            colorBgElevated: '#ffffff',
            colorBorder: '#f0f0f0',
            colorText: '#262626',
            colorTextSecondary: '#8c8c8c',
            colorTextTertiary: '#bfbfbf',
            colorFill: '#f5f5f5',
            colorFillSecondary: '#fafafa',
            colorFillTertiary: '#f5f5f5',
            colorFillQuaternary: '#fafafa',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            boxShadowSecondary: '0 2px 4px rgba(0, 0, 0, 0.12)',
          },
        }}
      >
        {/* Mobile Menu Drawer */}
        <Drawer
          open={openMenu}
          onClose={() => setOpenMenu(false)}
          placement='left'
          closable={true}
          width={280}
          styles={{
            header: {
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              color: 'white',
            },
            body: {
              padding: 0,
            },
          }}
          title={
            <Flex align='center' gap={12}>
              <Avatar
                size={40}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                {authUser?.firstName?.charAt(0)?.toUpperCase()}
              </Avatar>
              <div>
                <Text strong style={{ color: 'white', fontSize: '16px' }}>
                  {authUser?.firstName} {authUser?.lastName}
                </Text>
                <br />
                <Text
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '12px',
                  }}
                >
                  {authUser?.email}
                </Text>
              </div>
            </Flex>
          }
        >
          <AppMenu onPress={() => setOpenMenu(false)} />
        </Drawer>

        <Layout>
          {/* Enhanced Header */}
          <Header
            style={{
              padding: 0,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              position: 'sticky',
              top: 0,
              zIndex: 1000,
              height: isMobile ? '60px' : '70px',
            }}
          >
            <Flex
              align='center'
              justify='space-between'
              style={{
                height: '100%',
                padding: isMobile ? '0 16px' : '0 24px',
                color: 'white',
              }}
            >
              {/* Left Section - Menu Button & Logo */}
              <Flex align='center' gap={16}>
                {isMobile && (
                  <Button
                    type='text'
                    icon={<MenuOutlined />}
                    onClick={() => setOpenMenu(true)}
                    style={{
                      color: 'white',
                      fontSize: '18px',
                      width: 40,
                      height: 40,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                )}
                <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
                  <Flex align='center' gap={8}>
                    <HomeOutlined style={{ fontSize: '24px' }} />
                    <Title
                      level={4}
                      style={{
                        color: 'white',
                        margin: 0,
                        fontSize: isMobile ? '16px' : '20px',
                      }}
                    >
                      Family Tree
                    </Title>
                  </Flex>
                </Link>
              </Flex>

              {/* Center Section - Welcome Message (Desktop only) */}
              {!isMobile && (
                <Flex
                  vertical
                  align='center'
                  style={{ flex: 1, textAlign: 'center' }}
                >
                  <Text strong style={{ color: 'white', fontSize: '16px' }}>
                    {t('general.welcome')}, {authUser?.firstName}!
                  </Text>
                  <Text
                    style={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: '12px',
                    }}
                  >
                    {currentTime.format('YYYY-MM-DD HH:mm:ss')}
                  </Text>
                </Flex>
              )}

              {/* Right Section - Notifications & Profile */}
              <Flex align='center' gap={8}>
                {/* Language Switcher */}
                <Button
                  type='text'
                  onClick={() => changeLanguage(language)}
                  style={{
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '20px',
                    padding: '4px 8px',
                    height: 'auto',
                  }}
                >
                  <Flag
                    code={language === 'mn' ? 'US' : 'MN'}
                    style={{ width: 16, height: 16 }}
                  />
                </Button>

                {/* Notifications */}
                <Badge count={3} size='small'>
                  <Button
                    type='text'
                    icon={<BellOutlined />}
                    style={{
                      color: 'white',
                      fontSize: '18px',
                      width: 40,
                      height: 40,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                </Badge>

                {/* Profile Dropdown */}
                <div
                  style={{ position: 'relative' }}
                  className='profile-dropdown'
                >
                  <Button
                    type='text'
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    style={{
                      color: 'white',
                      padding: '4px',
                      height: 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      cursor: 'pointer',
                      pointerEvents: 'auto',
                    }}
                  >
                    <Avatar
                      size={32}
                      style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                      }}
                    >
                      {authUser?.firstName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    {!isMobile && (
                      <Text style={{ color: 'white', fontSize: '14px' }}>
                        {authUser?.firstName}
                      </Text>
                    )}
                  </Button>

                  {profileDropdownOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        marginTop: '8px',
                        backgroundColor: 'white',
                        border: '1px solid #d9d9d9',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        zIndex: 1001,
                        minWidth: '150px',
                      }}
                    >
                      <Menu
                        items={profileMenuItems}
                        onClick={handleProfileMenuClick}
                        style={{
                          border: 'none',
                          background: 'transparent',
                        }}
                        mode='vertical'
                      />
                    </div>
                  )}
                </div>
              </Flex>
            </Flex>
          </Header>

          <Layout>
            {/* Desktop Sidebar */}
            {!isMobile && (
              <Sider
                collapsible
                collapsed={isCollapsed}
                onCollapse={setIsCollapsed}
                theme='light'
                style={{
                  background: '#ffffff',
                  borderRight: '1px solid #f0f0f0',
                  boxShadow: '2px 0 8px rgba(0, 0, 0, 0.06)',
                  height: 'calc(100vh - 70px)', // Subtract header height
                  overflow: 'hidden', // Prevent sider from scrolling
                }}
                width={280}
                collapsedWidth={80}
              >
                <div
                  style={{
                    padding: '16px',
                    borderBottom: '1px solid #f0f0f0',
                    background:
                      'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                  }}
                >
                  <Flex align='center' gap={12}>
                    <Avatar
                      size={40}
                      style={{
                        background:
                          'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                      }}
                    >
                      {authUser?.firstName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    {!isCollapsed && (
                      <div>
                        <Text
                          strong
                          style={{ fontSize: '14px', display: 'block' }}
                        >
                          {authUser?.firstName} {authUser?.lastName}
                        </Text>
                        <Text style={{ color: '#8c8c8c', fontSize: '12px' }}>
                          {authUser?.email}
                        </Text>
                      </div>
                    )}
                  </Flex>
                </div>
                <AppMenu />
              </Sider>
            )}

            {/* Main Content */}
            <Content
              style={{
                margin: isMobile ? '8px' : '16px',
                padding: isMobile ? '16px' : '24px',
                borderRadius: 12,
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                minHeight: 'calc(100vh - 140px)',
                overflow: 'auto',
              }}
            >
              <Outlet />
            </Content>
          </Layout>

          {/* Enhanced Footer */}
          <Footer
            style={{
              textAlign: 'center',
              background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
              color: 'white',
              padding: isMobile ? '16px' : '24px',
              borderTop: '1px solid #f0f0f0',
            }}
          >
            <Flex
              vertical={isMobile}
              align='center'
              justify='space-between'
              gap={isMobile ? 8 : 0}
            >
              <div>
                <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  © {new Date().getFullYear()} Family Tree System. All rights
                  reserved.
                </Text>
              </div>
              <Flex gap={16} style={{ fontSize: '12px' }}>
                <Link
                  to='/privacy'
                  style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                >
                  Privacy Policy
                </Link>
                <Link to='/terms' style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  Terms of Service
                </Link>
                <Link
                  to='/contact'
                  style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                >
                  Contact Us
                </Link>
              </Flex>
            </Flex>
          </Footer>
        </Layout>

        {/* Floating Action Button */}
        <FloatButton.Group
          shape='circle'
          style={{
            right: 24,
            bottom: 24,
          }}
        >
          <FloatButton
            onClick={() => changeLanguage(language)}
            icon={
              <Flag
                code={language === 'mn' ? 'US' : 'MN'}
                style={{ width: 20, height: 20 }}
              />
            }
            tooltip='Change Language'
          />
        </FloatButton.Group>
      </ConfigProvider>
    </Layout>
  );
};

export default AuthLayout;
