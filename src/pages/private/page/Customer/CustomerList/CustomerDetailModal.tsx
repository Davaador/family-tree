import {
  CalendarOutlined,
  EditOutlined,
  IdcardOutlined,
  MailOutlined,
  PhoneOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Descriptions,
  Modal,
  Row,
  Space,
  Tag,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import { CustomerDetail } from 'pages/public/auth/auth.model';

const { Title, Text } = Typography;

interface CustomerDetailModalProps {
  visible: boolean;
  onClose: () => void;
  customer: CustomerDetail | null;
  onEdit?: (customer: CustomerDetail) => void;
}

const CustomerDetailModal: React.FC<CustomerDetailModalProps> = ({
  visible,
  onClose,
  customer,
  onEdit,
}) => {
  if (!customer) return null;

  const getAge = (birthDate: string | Date) => {
    const birth = dayjs(birthDate);
    const today = dayjs();
    return today.diff(birth, 'year');
  };

  const getGenderColor = (gender: string) => {
    return gender === '0' ? '#3183B8' : '#D03FC6';
  };

  const getGenderText = (gender: string) => {
    return gender === '0' ? 'Эрэгтэй' : 'Эмэгтэй';
  };

  return (
    <Modal
      title={
        <div className='flex items-center gap-3'>
          <Avatar
            size={40}
            style={{ backgroundColor: '#65eaae' }}
            icon={<UserOutlined />}
          />
          <div>
            <Title level={4} style={{ margin: 0, color: 'white' }}>
              Харилцагчийн дэлгэрэнгүй мэдээлэл
            </Title>
            <Text
              style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)' }}
            >
              ID: {customer.id}
            </Text>
          </div>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key='close' onClick={onClose}>
          Хаах
        </Button>,
        onEdit && (
          <Button
            key='edit'
            type='primary'
            icon={<EditOutlined />}
            style={{ backgroundColor: '#65eaae', borderColor: '#65eaae' }}
            onClick={() => onEdit(customer)}
          >
            Засах
          </Button>
        ),
      ].filter(Boolean)}
      width={window.innerWidth < 768 ? '95%' : 800}
      centered
      className='customer-detail-modal mobile-modal'
      zIndex={10001}
    >
      <div className='p-4'>
        {/* Header Section */}
        <Card
          className='mb-6'
          style={{
            background: 'linear-gradient(135deg, #65eaae 0%, #4fd1c7 100%)',
            border: 'none',
          }}
        >
          <Row gutter={[16, 16]} align='middle'>
            <Col xs={24} sm={8}>
              <div className='text-center'>
                <Avatar
                  size={80}
                  style={{ backgroundColor: 'white', color: '#65eaae' }}
                  icon={<UserOutlined style={{ fontSize: '40px' }} />}
                />
              </div>
            </Col>
            <Col xs={24} sm={16}>
              <div className='text-white'>
                <Title level={3} style={{ color: 'white', margin: 0 }}>
                  {customer.firstName} {customer.lastName}
                </Title>
                <Space size='large' className='mt-2'>
                  <Tag
                    color={getGenderColor(customer.gender)}
                    style={{ color: 'white', border: 'none' }}
                  >
                    {getGenderText(customer.gender)}
                  </Tag>
                  {customer.birthDate && (
                    <Tag color='white' style={{ color: '#65eaae' }}>
                      {customer.isDeceased
                        ? '***'
                        : `${getAge(customer.birthDate)} настай`}
                    </Tag>
                  )}
                </Space>
              </div>
            </Col>
          </Row>
        </Card>

        {/* Contact Information */}
        <Card title='Холбоо барих мэдээлэл' className='mb-4'>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                <PhoneOutlined style={{ color: '#65eaae', fontSize: '18px' }} />
                <div>
                  <Text strong>Утасны дугаар</Text>
                  <br />
                  <Text>
                    {customer.isDeceased ? '***' : customer.phoneNumber}
                  </Text>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                <IdcardOutlined
                  style={{ color: '#65eaae', fontSize: '18px' }}
                />
                <div>
                  <Text strong>Регистрийн дугаар</Text>
                  <br />
                  <Text>{customer.isDeceased ? '***' : customer.register}</Text>
                </div>
              </div>
            </Col>
          </Row>
        </Card>

        {/* Personal Information */}
        <Card title='Хувийн мэдээлэл' className='mb-4'>
          <Descriptions
            column={{ xs: 1, sm: 2 }}
            bordered
            size='small'
            className='personal-info-descriptions'
          >
            <Descriptions.Item label='Овог' span={1}>
              {customer.lastName}
            </Descriptions.Item>
            <Descriptions.Item label='Нэр' span={1}>
              {customer.firstName}
            </Descriptions.Item>
            <Descriptions.Item label='Төрсөн огноо' span={1}>
              {customer.birthDate
                ? dayjs(customer.birthDate).format('YYYY-MM-DD')
                : 'Тодорхойгүй'}
            </Descriptions.Item>
            <Descriptions.Item label='Хүйс' span={1}>
              <Tag color={getGenderColor(customer.gender)}>
                {getGenderText(customer.gender)}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label='И-мэйл' span={1}>
              {customer.email || 'Тодорхойгүй'}
            </Descriptions.Item>
            {customer.isDeceased && customer.deceasedDate && (
              <Descriptions.Item label='Нас барсан огноо' span={1}>
                {dayjs(customer.deceasedDate).format('YYYY-MM-DD')}
              </Descriptions.Item>
            )}
          </Descriptions>
        </Card>

        {/* Family Information */}
        <Card title='Гэр бүлийн мэдээлэл' className='mb-4'>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <div className='text-center p-4 border border-dashed border-gray-300 rounded-lg'>
                <TeamOutlined style={{ fontSize: '32px', color: '#65eaae' }} />
                <div className='mt-2'>
                  <Text strong>Гэр бүлийн гишүүн</Text>
                  <br />
                  <Badge
                    count={customer.wife || customer.husband ? 1 : 0}
                    style={{ backgroundColor: '#65eaae' }}
                  />
                </div>
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div className='text-center p-4 border border-dashed border-gray-300 rounded-lg'>
                <CalendarOutlined
                  style={{ fontSize: '32px', color: '#65eaae' }}
                />
                <div className='mt-2'>
                  <Text strong>Бүртгүүлсэн огноо</Text>
                  <br />
                  <Text>
                    {customer.registeredDate
                      ? dayjs(customer.registeredDate).format('YYYY-MM-DD')
                      : 'Тодорхойгүй'}
                  </Text>
                </div>
              </div>
            </Col>
          </Row>
        </Card>

        {/* Additional Information */}
        <Card title='Нэмэлт мэдээлэл' className='mb-4'>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <div className='text-center p-4 border border-dashed border-gray-300 rounded-lg'>
                <MailOutlined style={{ fontSize: '32px', color: '#65eaae' }} />
                <div className='mt-2'>
                  <Text strong>Сүүлд нэвтэрсэн</Text>
                  <br />
                  <Text>
                    {customer.lastLoginDate
                      ? dayjs(customer.lastLoginDate).format('YYYY-MM-DD HH:mm')
                      : 'Тодорхойгүй'}
                  </Text>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div className='text-center p-4 border border-dashed border-gray-300 rounded-lg'>
                <UserOutlined style={{ fontSize: '32px', color: '#65eaae' }} />
                <div className='mt-2'>
                  <Text strong>Хэрэглэгчийн төрөл</Text>
                  <br />
                  <Tag color={customer.editCustomer ? '#65eaae' : '#f50'}>
                    {customer.editCustomer ? 'Идэвхтэй' : 'Идэвхгүй'}
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

export default CustomerDetailModal;
