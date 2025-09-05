import {
  CheckCircleOutlined,
  UserOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Row, Col, Card, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

interface SystemStatusSectionProps {
  dashboardData: {
    total: number;
    activeCount: number;
    pendingCount: number;
  };
  childrenCount: number;
  className?: string;
}

const SystemStatusSection: React.FC<SystemStatusSectionProps> = ({
  dashboardData,
  childrenCount,
  className,
}) => {
  const { t } = useTranslation();

  const statusItems = [
    {
      key: 'systemOnline',
      icon: <CheckCircleOutlined className='status-icon success' />,
      title: t('dashboard.systemOnline'),
      subtitle: t('dashboard.allSystemsOperational'),
    },
    {
      key: 'totalUsers',
      icon: <UserOutlined className='status-icon info' />,
      title: dashboardData.total.toString(),
      subtitle: t('dashboard.totalUsers'),
    },
    {
      key: 'familyMembers',
      icon: <TeamOutlined className='status-icon warning' />,
      title: childrenCount.toString(),
      subtitle: t('dashboard.familyMembers'),
    },
  ];

  return (
    <Row gutter={[24, 24]} className={`status-section ${className || ''}`}>
      <Col xs={24}>
        <Card
          title={t('dashboard.systemStatus')}
          className='system-status-card'
        >
          <Row gutter={[16, 16]}>
            {statusItems.map(item => (
              <Col xs={24} sm={8} key={item.key}>
                <div className='status-item'>
                  {item.icon}
                  <div className='status-content'>
                    <Text strong>{item.title}</Text>
                    <Text type='secondary'>{item.subtitle}</Text>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default SystemStatusSection;
