import { Row, Col, Card, Button } from 'antd';
import {
  PlusOutlined,
  UsergroupAddOutlined,
  ClusterOutlined,
  BookOutlined,
  UserOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface QuickActionsSectionProps {
  className?: string;
}

const QuickActionsSection: React.FC<QuickActionsSectionProps> = ({
  className,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const actions = [
    {
      key: 'addFamilyMember',
      icon: <PlusOutlined />,
      title: t('dashboard.addFamilyMember'),
      onClick: () => navigate('/add/family'),
      type: 'primary' as const,
    },
    {
      key: 'addChild',
      icon: <UsergroupAddOutlined />,
      title: t('dashboard.addChild'),
      onClick: () => navigate('/add/child'),
      type: 'default' as const,
    },
    {
      key: 'viewFamilyTree',
      icon: <ClusterOutlined />,
      title: t('dashboard.viewFamilyTree'),
      onClick: () => navigate('/tree'),
      type: 'default' as const,
    },
    {
      key: 'writeBiography',
      icon: <BookOutlined />,
      title: t('dashboard.writeBiography'),
      onClick: () => navigate('/biography'),
      type: 'default' as const,
    },
    {
      key: 'viewCustomers',
      icon: <UserOutlined />,
      title: t('dashboard.viewCustomers'),
      onClick: () => navigate('/customers'),
      type: 'default' as const,
    },
    {
      key: 'viewChildren',
      icon: <HeartOutlined />,
      title: t('dashboard.viewChildren'),
      onClick: () => navigate('/childs'),
      type: 'default' as const,
    },
  ];

  return (
    <Card title={t('dashboard.quickActions')} className="quick-actions-card">
      <Row gutter={[16, 16]}>
        {actions.map((action) => (
          <Col xs={24} sm={12} md={12} lg={8} key={action.key}>
            <Button
              type={action.type}
              icon={action.icon}
              size="large"
              block
              onClick={action.onClick}
              className="action-button"
            >
              {action.title}
            </Button>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default QuickActionsSection;
