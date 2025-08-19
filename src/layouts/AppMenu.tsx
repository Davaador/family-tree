import {
  ClusterOutlined,
  DashboardOutlined,
  HistoryOutlined,
  MailOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { authStore } from 'context/auth/store';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';

interface AppMenuProps {
  onPress?: () => void;
}

const AppMenu = ({ onPress }: AppMenuProps) => {
  const location = useLocation();
  const { t } = useTranslation();
  const { roleUser } = authStore();

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: <NavLink to="/">{t('dashboard.dashboard')}</NavLink>,
    },
    {
      key: '/requests',
      icon: <MailOutlined />,
      label: <NavLink to="/requests">{t('dashboard.requests')}</NavLink>,
    },
    {
      key: '/tree',
      icon: <ClusterOutlined />,
      label: <NavLink to="/tree">{t('dashboard.familyTree')}</NavLink>,
    },
    {
      key: '/biography',
      icon: <HistoryOutlined />,
      label: <NavLink to="/biography">{t('dashboard.biography')}</NavLink>,
    },
    {
      key: '/customers',
      icon: <UserOutlined />,
      label: <NavLink to="/customers">{t('dashboard.customers')}</NavLink>,
    },
    {
      key: '/childs',
      icon: <UsergroupAddOutlined />,
      label: <NavLink to="/childs">{t('dashboard.childs')}</NavLink>,
    },
  ];
  return (
    <div className="p-2">
      <Menu
        onClick={onPress && onPress}
        selectedKeys={[location.pathname]}
        theme="light"
        mode="inline"
        items={menuItems}
      />
    </div>
  );
};

export default AppMenu;
