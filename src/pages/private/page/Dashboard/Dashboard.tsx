import { Layout, Row, Col } from 'antd';
import { authStore } from 'context/auth/store';
import { RolesConstants } from 'context/constants/auth.constants';
import { EditUserModal } from 'pages/components';
import { DashboardProps } from 'pages/private/private.model';
import { getChildList } from 'pages/private/private.service';
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { CustomerModel } from 'context/entities/customer.model';
import {
  WelcomeSection,
  StatisticsSection,
  QuickActionsSection,
  RecentChildrenSection,
  SystemStatusSection,
} from './components';
import './Dashboard.less';

const Dashboard = () => {
  const { authUser, roleUser } = authStore();
  const [isShowModal, setIshowModal] = useState<boolean>(false);
  const { dashboardData } = useLoaderData() as DashboardProps;

  // Additional state for enhanced dashboard
  const [childrenData, setChildrenData] = useState<CustomerModel.ParentDto[]>(
    []
  );

  const setModalInvisible = () => {
    setIshowModal(false);
  };

  // Load additional data
  useEffect(() => {
    const loadAdditionalData = async () => {
      try {
        const children = await getChildList();
        setChildrenData(children);
      } catch (error) {
        console.error('Failed to load children data:', error);
      }
    };

    loadAdditionalData();
  }, []);

  useEffect(() => {
    console.log(authUser, 'authUser');
    console.log(roleUser, 'roleUser');

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
    <div className="dashboard-container">
      <Layout className="dashboard-layout">
        <WelcomeSection
          isShowModal={isShowModal}
          setModalVisible={setIshowModal}
        />

        <Row gutter={[24, 24]} className="stats-section">
          <StatisticsSection
            dashboardData={dashboardData}
            childrenCount={childrenData.length}
          />
        </Row>

        <Row gutter={[24, 24]} className="actions-section">
          <Col xs={24} lg={16}>
            <QuickActionsSection />
          </Col>
          <Col xs={24} lg={8}>
            <RecentChildrenSection childrenData={childrenData} />
          </Col>
        </Row>

        <SystemStatusSection
          dashboardData={dashboardData}
          childrenCount={childrenData.length}
        />
      </Layout>
      <EditUserModal isShow={isShowModal} toggleModal={setModalInvisible} />
    </div>
  );
};

export default Dashboard;
