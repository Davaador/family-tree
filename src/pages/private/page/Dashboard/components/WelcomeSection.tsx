import { Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { authStore } from 'context/auth/store';

const { Title, Text } = Typography;

interface WelcomeSectionProps {
  className?: string;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ className }) => {
  const { t } = useTranslation();
  const { authUser } = authStore();

  return (
    <div className={`welcome-section ${className || ''}`}>
      <div className="welcome-content">
        <Avatar size={64} icon={<UserOutlined />} className="welcome-avatar" />
        <div className="welcome-text">
          <Title level={2} className="welcome-title">
            {t('dashboard.welcome')} {authUser?.firstName}!
          </Title>
          <Text className="welcome-subtitle">
            {t('dashboard.welcomeSubtitle')}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
