import { HeartOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Col, Form, Row, Select, Typography } from 'antd';
import { CustomerModel } from 'types/customer.types';

const { Text } = Typography;

interface FamilyMemberSectionProps {
  availableSpouses: CustomerModel.Customer[];
  spousesLoading: boolean;
  selectedSpouseId: string | undefined;
  handleSpouseIdChange: (value: string) => void;
  customerGender?: string;
}

const FamilyMemberSection: React.FC<FamilyMemberSectionProps> = ({
  availableSpouses,
  spousesLoading,
  selectedSpouseId,
  handleSpouseIdChange,
  customerGender,
}) => {
  // Filter spouses by opposite gender
  const filteredSpouses = availableSpouses.filter(spouse => {
    if (!customerGender) return true;
    return spouse.gender !== customerGender;
  });

  return (
    <Card
      title={
        <span className='flex items-center gap-2 text-pink-600'>
          <HeartOutlined />
          Гэр бүлийн гишүүн
        </span>
      }
      className='mb-6 rounded-xl shadow-sm border-0 bg-pink-50/50'
      styles={{ body: { padding: '24px' } }}
    >
      <Row gutter={[24, 16]}>
        <Col xs={24}>
          <Form.Item
            name='spouseId'
            label={
              <span className='flex items-center gap-2 font-medium'>
                <UserOutlined className='text-pink-500' />
                Гэр бүлийн гишүүн сонгох
              </span>
            }
            rules={[
              {
                required: false,
                message: 'Гэр бүлийн гишүүнийг сонгоно уу',
              },
            ]}
          >
            <Select
              placeholder='Гэр бүлийн гишүүнийг сонгоно уу'
              showSearch
              allowClear
              size='large'
              className='rounded-lg'
              dropdownMatchSelectWidth={false}
              getPopupContainer={triggerNode =>
                triggerNode.parentNode || document.body
              }
              options={[
                { value: '', label: 'Сонгохгүй' },
                ...(filteredSpouses || []).map(
                  (spouse: CustomerModel.Customer) => ({
                    value: spouse.id,
                    label: `${spouse.lastName.charAt(0)}. ${spouse.firstName} (${
                      spouse.gender === '0' ? 'Эрэгтэй' : 'Эмэгтэй'
                    })`,
                  })
                ),
              ]}
              filterOption={(input, option) =>
                typeof option?.label === 'string' &&
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              onChange={handleSpouseIdChange}
              loading={spousesLoading}
            />
          </Form.Item>
        </Col>

        {selectedSpouseId && (
          <Col xs={24}>
            <div className='p-4 bg-pink-100 rounded-lg border border-pink-200'>
              <Text className='text-pink-700'>
                <HeartOutlined className='mr-2' />
                Сонгосон гэр бүлийн гишүүн:{' '}
                {filteredSpouses
                  .find(s => s.id.toString() === selectedSpouseId)
                  ?.lastName.charAt(0)}
                .{' '}
                {
                  filteredSpouses.find(
                    s => s.id.toString() === selectedSpouseId
                  )?.firstName
                }{' '}
                (
                {filteredSpouses.find(s => s.id.toString() === selectedSpouseId)
                  ?.gender === '0'
                  ? 'Эрэгтэй'
                  : 'Эмэгтэй'}
                )
              </Text>
            </div>
          </Col>
        )}
      </Row>
    </Card>
  );
};

export default FamilyMemberSection;
