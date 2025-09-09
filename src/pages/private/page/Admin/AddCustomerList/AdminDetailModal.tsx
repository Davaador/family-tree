import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  CalendarOutlined,
  IdcardOutlined,
} from '@ant-design/icons';
import {
  Modal,
  Descriptions,
  Avatar,
  Tag,
  Row,
  Col,
  Card,
  Typography,
} from 'antd';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomerModel } from 'types/customer.types';
import { formatDate } from 'utils';

const { Title, Text } = Typography;

interface AdminDetailModalProps {
  visible: boolean;
  onClose: () => void;
  admin: CustomerModel.AdminCustomer | null;
}

const AdminDetailModal: React.FC<AdminDetailModalProps> = ({
  visible,
  onClose,
  admin,
}) => {
  const { t } = useTranslation();

  const handleCancel = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!admin) return null;

  return (
    <Modal
      title={
        <div className='flex items-center gap-3'>
          <Avatar size={40} icon={<UserOutlined />} className='bg-blue-500' />
          <div>
            <Title level={4} className='!mb-0'>
              {admin.firstName} {admin.lastName}
            </Title>
            <Text type='secondary' className='text-sm'>
              {t('admin.detail.title')}
            </Text>
          </div>
        </div>
      }
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={800}
      centered
      zIndex={10001}
      className='admin-detail-modal'
    >
      <div className='py-4'>
        {/* Profile Section */}
        <Card
          className='mb-6 rounded-xl shadow-sm border-0 bg-gradient-to-br from-blue-50 to-indigo-50'
          styles={{ body: { padding: '24px' } }}
        >
          <Row gutter={[24, 16]}>
            <Col xs={24} md={8}>
              <div className='text-center'>
                <Avatar
                  size={120}
                  icon={<UserOutlined />}
                  className='mb-4 text-4xl bg-blue-500 shadow-lg'
                />
                <Title level={4} className='!mb-2 !mt-2'>
                  {admin.firstName} {admin.lastName}
                </Title>
                <Tag
                  color='green'
                  className='text-sm px-3 py-1 rounded-full font-medium'
                >
                  {t('admin.detail.admin')}
                </Tag>
              </div>
            </Col>
            <Col xs={24} md={16}>
              <Descriptions
                column={1}
                size='small'
                className='admin-descriptions'
              >
                <Descriptions.Item
                  label={
                    <span className='flex items-center gap-2 font-medium text-gray-700'>
                      <IdcardOutlined className='text-blue-500' />
                      {t('admin.detail.registerNumber')}
                    </span>
                  }
                >
                  <Text copyable className='text-base font-medium'>
                    {admin.register}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <span className='flex items-center gap-2 font-medium text-gray-700'>
                      <CalendarOutlined className='text-blue-500' />
                      {t('admin.detail.birthDate')}
                    </span>
                  }
                >
                  <Text className='text-base'>
                    {formatDate(admin.birthDate)} ({admin.age}{' '}
                    {t('admin.detail.age')})
                  </Text>
                </Descriptions.Item>

                {admin.isDeceased && (
                  <Descriptions.Item
                    label={
                      <span className='flex items-center gap-2 font-medium text-gray-700'>
                        <CalendarOutlined className='text-red-500' />
                        {t('customer.deceasedDate')}
                      </span>
                    }
                  >
                    <Text className='text-base text-red-600 font-medium'>
                      {admin.deceasedDate ? formatDate(admin.deceasedDate) : ''}
                    </Text>
                  </Descriptions.Item>
                )}
                {admin.surName && (
                  <Descriptions.Item
                    label={
                      <span className='flex items-center gap-2 font-medium text-gray-700'>
                        <UserOutlined className='text-blue-500' />
                        {t('admin.detail.surName')}
                      </span>
                    }
                  >
                    <Text className='text-base'>{admin.surName}</Text>
                  </Descriptions.Item>
                )}
              </Descriptions>
            </Col>
          </Row>
        </Card>

        {/* Contact Information */}
        <Card
          title={
            <span className='flex items-center gap-2 text-blue-600 font-medium'>
              <PhoneOutlined />
              {t('admin.detail.contactInfo')}
            </span>
          }
          className='mb-6 rounded-xl shadow-sm border-0 bg-gradient-to-br from-green-50 to-emerald-50'
          styles={{ body: { padding: '24px' } }}
        >
          <Row gutter={[24, 16]}>
            <Col xs={24} md={12}>
              <div className='flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-green-100'>
                <PhoneOutlined className='text-green-500 text-lg' />
                <div className='flex-1'>
                  <Text
                    type='secondary'
                    className='text-xs uppercase tracking-wide'
                  >
                    {t('admin.detail.phoneNumber')}
                  </Text>
                  <div>
                    <Text
                      copyable
                      className='text-base font-semibold text-gray-800'
                    >
                      {admin.phoneNumber}
                    </Text>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className='flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-orange-100'>
                <MailOutlined className='text-orange-500 text-lg' />
                <div className='flex-1'>
                  <Text
                    type='secondary'
                    className='text-xs uppercase tracking-wide'
                  >
                    {t('admin.detail.email')}
                  </Text>
                  <div>
                    <Text
                      copyable
                      className='text-base font-semibold text-gray-800'
                    >
                      {admin.email}
                    </Text>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Card>

        {/* Additional Information */}
        <Card
          title={
            <span className='flex items-center gap-2 text-blue-600 font-medium'>
              <UserOutlined />
              {t('admin.detail.additionalInfo')}
            </span>
          }
          className='rounded-xl shadow-sm border-0 bg-gradient-to-br from-purple-50 to-pink-50'
          styles={{ body: { padding: '24px' } }}
        >
          <Row gutter={[24, 16]}>
            <Col xs={24} md={8}>
              <div className='text-center p-4'>
                <div className='w-15 h-15 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3 shadow-sm'>
                  <IdcardOutlined className='text-2xl text-blue-500' />
                </div>
                <Text
                  type='secondary'
                  className='text-xs uppercase tracking-wide'
                >
                  {t('admin.detail.id')}
                </Text>
                <div>
                  <Text className='text-lg font-bold text-gray-800'>
                    #{admin.id}
                  </Text>
                </div>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className='text-center p-4'>
                <div className='w-15 h-15 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3 shadow-sm'>
                  <CalendarOutlined className='text-2xl text-green-500' />
                </div>
                <Text
                  type='secondary'
                  className='text-xs uppercase tracking-wide'
                >
                  {t('admin.detail.age')}
                </Text>
                <div>
                  <Text className='text-lg font-bold text-gray-800'>
                    {admin.age} {t('admin.detail.age')}
                  </Text>
                </div>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className='text-center p-4'>
                <div className='w-15 h-15 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3 shadow-sm'>
                  <UserOutlined className='text-2xl text-orange-500' />
                </div>
                <Text
                  type='secondary'
                  className='text-xs uppercase tracking-wide'
                >
                  {t('admin.detail.type')}
                </Text>
                <div>
                  <Tag
                    color='green'
                    className='text-sm px-3 py-1 rounded-full font-medium'
                  >
                    {t('admin.detail.admin')}
                  </Tag>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </Modal>
  );
};

export default AdminDetailModal;
