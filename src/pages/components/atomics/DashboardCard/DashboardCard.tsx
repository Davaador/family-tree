import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Card, Col, Typography, theme } from 'antd';
import { BaseType } from 'antd/es/typography/Base';
import { useTranslation } from 'react-i18next';

interface DashboardCardProps {
  value: number | string;
  title?: string;
  type?: BaseType;
  icon?: React.ReactNode;
  color?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  value,
  title,
  type,
  icon,
  color = '#1890ff',
  trend,
}) => {
  const { token } = theme.useToken();
  const { t } = useTranslation();

  // Default icon based on title
  const getDefaultIcon = () => {
    if (title?.includes('active') || title?.includes('Идэвхитэй')) {
      return <CheckCircleOutlined />;
    }
    if (title?.includes('pending') || title?.includes('Хүсэлт')) {
      return <ClockCircleOutlined />;
    }
    if (title?.includes('children') || title?.includes('Хүүхдийн')) {
      return <UsergroupAddOutlined />;
    }
    return <UserOutlined />;
  };

  const displayIcon = icon || getDefaultIcon();

  return (
    <Col className='gutter-row' xs={24} sm={12} md={12} lg={6} xl={6}>
      <Card
        className='enhanced-dashboard-card'
        style={{
          boxShadow: token.boxShadow,
          borderLeft: `4px solid ${color}`,
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className='card-content'>
          <div className='card-header'>
            <div className='icon-container' style={{ color }}>
              {displayIcon}
            </div>
            {trend && (
              <div
                className={`trend-indicator ${
                  trend.isPositive ? 'positive' : 'negative'
                }`}
              >
                {trend.isPositive ? '+' : ''}
                {trend.value}%
              </div>
            )}
          </div>

          <div className='card-body'>
            <Typography.Text
              className='dashboard-label-text'
              type={type ?? 'secondary'}
            >
              {title ?? t('dashboard.totalRegistered')}
            </Typography.Text>

            <Typography.Text className='dashboard-count-text' style={{ color }}>
              {value}
            </Typography.Text>
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default DashboardCard;
