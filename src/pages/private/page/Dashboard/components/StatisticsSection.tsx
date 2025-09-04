import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Card, Col, Progress, Statistic } from 'antd';
import { useTranslation } from 'react-i18next';

interface StatisticsSectionProps {
  dashboardData: {
    total: number;
    activeCount: number;
    pendingCount: number;
  };
  childrenCount: number;
  className?: string;
}

const StatisticsSection: React.FC<StatisticsSectionProps> = ({
  dashboardData,
  childrenCount,
  className,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Col xs={24} sm={12} lg={6} style={{ flex: '1 1 0%' }}>
        <Card className="stat-card total-users">
          <Statistic
            title={t('dashboard.totalRegistered')}
            value={dashboardData.total}
            prefix={<UserOutlined />}
            valueStyle={{ color: '#1890ff' }}
          />
          <div className="stat-trend">
            <ArrowUpOutlined className="trend-up" />
            <span>+12%</span>
          </div>
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6} style={{ flex: '1 1 0%' }}>
        <Card className="stat-card active-users">
          <Statistic
            title={t('dashboard.activeCount')}
            value={dashboardData.activeCount}
            prefix={<CheckCircleOutlined />}
            valueStyle={{ color: '#52c41a' }}
          />
          <Progress
            percent={
              Math.round(
                (dashboardData.activeCount / dashboardData.total) * 100
              ) || 0
            }
            size="small"
            strokeColor="#52c41a"
            showInfo={false}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6} style={{ flex: '1 1 0%' }}>
        <Card className="stat-card pending-requests">
          <Statistic
            title={t('dashboard.requestsSent')}
            value={dashboardData.pendingCount}
            prefix={<ClockCircleOutlined />}
            valueStyle={{ color: '#faad14' }}
          />
          <div className="stat-trend">
            <ArrowDownOutlined className="trend-down" />
            <span>-5%</span>
          </div>
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6} style={{ flex: '1 1 0%' }}>
        <Card className="stat-card children-count">
          <Statistic
            title={t('dashboard.childrenCount')}
            value={childrenCount}
            prefix={<UsergroupAddOutlined />}
            valueStyle={{ color: '#722ed1' }}
          />
          <div className="stat-trend">
            <span>{t('dashboard.childrenRegistered')}</span>
          </div>
        </Card>
      </Col>
    </>
  );
};

export default StatisticsSection;
