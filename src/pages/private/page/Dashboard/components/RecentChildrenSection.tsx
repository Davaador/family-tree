import { UsergroupAddOutlined } from '@ant-design/icons';
import { Avatar, Card, List, Space, Tag } from 'antd';
import { CustomerModel } from 'context/entities/customer.model';
import { useTranslation } from 'react-i18next';

interface RecentChildrenSectionProps {
  childrenData: CustomerModel.ParentDto[];
  className?: string;
}

const RecentChildrenSection: React.FC<RecentChildrenSectionProps> = ({
  childrenData,
  className: _className,
}) => {
  const { t } = useTranslation();

  return (
    <Card
      title={t('dashboard.recentChildren')}
      className='recent-children-card'
    >
      <List
        dataSource={childrenData.slice(0, 5)}
        renderItem={child => (
          <List.Item className='child-item'>
            <List.Item.Meta
              avatar={
                <Avatar
                  size={40}
                  icon={<UsergroupAddOutlined />}
                  style={{
                    backgroundColor:
                      child.gender === '0' ? '#1890ff' : '#eb2f96',
                  }}
                />
              }
              title={`${child.firstName} ${child.lastName}`}
              description={
                <Space>
                  <Tag color={child.gender === '0' ? 'blue' : 'pink'}>
                    {child.gender === '0' ? 'Эрэгтэй' : 'Эмэгтэй'}
                  </Tag>
                  <span>
                    {child.birthDate
                      ? new Date().getFullYear() -
                        new Date(child.birthDate).getFullYear()
                      : '-'}{' '}
                    {t('dashboard.yearsOld')}
                  </span>
                </Space>
              }
            />
          </List.Item>
        )}
        locale={{
          emptyText: t('dashboard.noChildren'),
        }}
      />
    </Card>
  );
};

export default RecentChildrenSection;
