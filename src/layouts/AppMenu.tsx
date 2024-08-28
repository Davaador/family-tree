import { DashboardOutlined, MailOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";

const AppMenu = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const menuItems = [
    {
      key: "/",
      icon: <DashboardOutlined />,
      label: <NavLink to="/">{t("dashboard.dashboard")}</NavLink>,
    },
    {
      key: "/request",
      icon: <MailOutlined />,
      label: <NavLink to="/dash">{t("dashboard.requests")}</NavLink>,
    },
  ];
  return (
    <div className="p-2">
      <Menu
        selectedKeys={[location.pathname]}
        theme="light"
        mode="inline"
        items={menuItems}
      />
    </div>
  );
};

export default AppMenu;
