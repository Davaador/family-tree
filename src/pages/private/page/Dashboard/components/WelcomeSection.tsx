import { Avatar, Typography, Button, Tooltip } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { authStore } from 'context/auth/store';
import { RolesConstants } from 'context/constants/auth.constants';

const { Title, Text } = Typography;

interface WelcomeSectionProps {
  className?: string;
  isShowModal?: boolean;
  setModalVisible?: (visible: boolean) => void;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  className,
  isShowModal,
  setModalVisible,
}) => {
  const { t } = useTranslation();
  const { authUser, roleUser } = authStore();

  // Check if user is admin (ROOT or ADMIN role)
  const isAdmin = roleUser?.some(
    (role) =>
      role.name === RolesConstants.ROOT || role.name === RolesConstants.ADMIN
  );

  return (
    <div className={`welcome-section ${className || ''}`}>
      <div className="welcome-content" style={{ position: 'relative' }}>
        <Avatar size={64} icon={<UserOutlined />} className="welcome-avatar" />
        <div className="welcome-text">
          <Title level={2} className="welcome-title">
            {t('dashboard.welcome')} {authUser?.firstName}!
          </Title>
          <Text className="welcome-subtitle">
            {t('dashboard.welcomeSubtitle')}
          </Text>
        </div>
        {isAdmin && (
          <Tooltip title="Хэрэглэгчийн мэдээлэл засах">
            <Button
              type="text"
              icon={<EditOutlined />}
              size="large"
              onClick={() => setModalVisible?.(true)}
              className="admin-edit-button"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                color: '#1890ff',
                fontSize: '18px',
              }}
            />
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default WelcomeSection;
