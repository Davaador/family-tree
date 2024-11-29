import { Layout, Row } from 'antd';
import { authStore } from 'context/auth/store';
import { RolesConstants } from 'context/constants/auth.constants';
import { DashboardCard, EditUserModal } from 'pages/components';
import { DashboardProps } from 'pages/private/private.model';
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import './Dashboard.less';

const Dashboard = () => {
  const { authUser, roleUser } = authStore();
  const [isShowModal, setIshowModal] = useState<boolean>(false);
  const { dashboardData } = useLoaderData() as DashboardProps;

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
              title="Идэвхитэй тоо"
              type="success"
            />
            <DashboardCard
              value={dashboardData.pendingCount}
              title="Хүсэлт илгээсэн тоо"
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
