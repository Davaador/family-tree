import {
  ClusterOutlined,
  DashboardOutlined,
  HistoryOutlined,
  MailOutlined,
  UserAddOutlined,
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
  console.log(roleUser, 'test');

  const canSee = (userRole: string, allowedRoles?: string | string[]) => {
    if (!allowedRoles) return true; // зөвшөөрөл заагаагүй бол бүгдэд харагдана
    const list = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    return list.includes(userRole);
  };

  const allMenuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: <NavLink to="/">{t('dashboard.dashboard')}</NavLink>,
      allowedRoles: undefined,
    },
    {
      key: '/tree',
      icon: <ClusterOutlined />,
      label: <NavLink to="/tree">{t('dashboard.familyTree')}</NavLink>,
      allowedRoles: undefined,
    },
    {
      key: '/biography',
      icon: <HistoryOutlined />,
      label: <NavLink to="/biography">{t('dashboard.biography')}</NavLink>,
      allowedRoles: undefined,
    },
    {
      key: '/customers',
      icon: <UserOutlined />,
      label: <NavLink to="/customers">{t('dashboard.customers')}</NavLink>,
      allowedRoles: undefined,
    },
    {
      key: '/childs',
      icon: <UsergroupAddOutlined />,
      label: <NavLink to="/childs">{t('dashboard.childs')}</NavLink>,
      allowedRoles: undefined,
    },
    {
      key: '/add/customer/list',
      icon: <UserAddOutlined />,
      label: (
        <NavLink to="/add/customer/list">{t('dashboard.addCustomer')}</NavLink>
      ),
      allowedRoles: ['ROOT', 'ADMIN'],
    },
    {
      key: '/requests',
      icon: <MailOutlined />,
      label: <NavLink to="/requests">{t('dashboard.requests')}</NavLink>,
      allowedRoles: ['ROOT', 'ADMIN'],
    },
  ];

  // Filter menu items based on user role
  const items = allMenuItems
    .filter((item) =>
      canSee(roleUser ? roleUser[0].name : 'USER', item.allowedRoles)
    )
    .map(({ allowedRoles, ...item }) => item); // Remove allowedRoles from final items
  return (
    <div className="p-2">
      <Menu
        onClick={onPress && onPress}
        selectedKeys={[location.pathname]}
        theme="light"
        mode="inline"
        items={items}
      />
    </div>
  );
};

export default AppMenu;
