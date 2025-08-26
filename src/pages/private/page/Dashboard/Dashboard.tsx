import { Layout, Row } from 'antd';
import { authStore } from 'context/auth/store';
import { RolesConstants } from 'context/constants/auth.constants';
import { DashboardCard, EditUserModal } from 'pages/components';
import { DashboardProps } from 'pages/private/private.model';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';
import './Dashboard.less';

const Dashboard = () => {
  const { authUser, roleUser } = authStore();
  const [isShowModal, setIshowModal] = useState<boolean>(false);
  const { dashboardData } = useLoaderData() as DashboardProps;
  const { t } = useTranslation();

  const setModalInvisible = () => {
    setIshowModal(false);
  };
  useEffect(() => {
    if (
      !roleUser?.find((role) => role.name === RolesConstants.ROOT) &&
      authUser &&
      !authUser?.editCustomer &&
      !authUser.parent
    ) {
      setIshowModal(true);
    }
  }, [authUser, roleUser]);

  return (
    <div>
      <Layout>
        <div>
          <Row gutter={[16, 16]}>
            <DashboardCard value={dashboardData.total} />
            <DashboardCard
              value={dashboardData.activeCount}
              title={t('dashboard.activeCount')}
              type="success"
            />
            <DashboardCard
              value={dashboardData.pendingCount}
              title={t('dashboard.requestsSent')}
              type="warning"
            />
          </Row>
        </div>
      </Layout>
      <EditUserModal isShow={isShowModal} toggleModal={setModalInvisible} />
    </div>
  );
};

export default Dashboard;
