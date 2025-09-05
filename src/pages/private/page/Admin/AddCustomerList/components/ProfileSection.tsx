import { CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Checkbox, Col, Form, Input, Radio, Row, Select } from 'antd';
import { renderLastName } from 'pages/private/hooks/useCustomerHook';
import { CustomerModel } from 'types/customer.types';

import FormField from './FormField';

interface ProfileSectionProps {
  form: any;
  parents: CustomerModel.Customer[];
  parentsLoading: boolean;
  selectedParentId: string | undefined;
  isDeceased: boolean;
  setIsDeceased: (value: boolean) => void;
  handleParentIdChange: (value: string) => void;
  t: (key: string) => string;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  form,
  parents,
  parentsLoading,
  selectedParentId,
  isDeceased,
  setIsDeceased,
  handleParentIdChange,
  t,
}) => (
  <Card
    title={
      <span className='flex items-center gap-2 text-blue-600'>
        <UserOutlined />
        {t('admin.edit.profileInfo')}
      </span>
    }
    className='mb-6 rounded-xl shadow-sm border-0 bg-gray-50/50'
    styles={{ body: { padding: '24px' } }}
  >
    <Row gutter={[24, 16]}>
      <FormField
        name='firstName'
        label={
          <span className='flex items-center gap-2 font-medium'>
            <UserOutlined className='text-blue-500' />
            {t('admin.edit.firstName')}
          </span>
        }
        rules={[
          { required: true, message: t('admin.edit.firstNameRequired') },
          { min: 2, message: t('admin.edit.firstNameMin') },
        ]}
      >
        <Input
          size='large'
          placeholder={t('admin.edit.firstNamePlaceholder')}
          className='rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-blue-500'
        />
      </FormField>

      <FormField
        name='lastName'
        label={
          <span className='flex items-center gap-2 font-medium'>
            <UserOutlined className='text-blue-500' />
            {t('admin.edit.lastName')}
          </span>
        }
        rules={[
          { required: true, message: t('admin.edit.lastNameRequired') },
          { min: 2, message: t('admin.edit.lastNameMin') },
        ]}
      >
        <Input
          size='large'
          placeholder={t('admin.edit.lastNamePlaceholder')}
          className='rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-blue-500'
        />
      </FormField>

      <FormField
        name='surName'
        label={
          <span className='flex items-center gap-2 font-medium'>
            <UserOutlined className='text-blue-500' />
            {t('admin.edit.surName')}
          </span>
        }
      >
        <Input
          size='large'
          placeholder={t('admin.edit.surNamePlaceholder')}
          className='rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-blue-500'
        />
      </FormField>

      <FormField
        name='lastNameId'
        label={
          <span className='flex items-center gap-2 font-medium'>
            <UserOutlined className='text-blue-500' />
            Ургийн овог
          </span>
        }
      >
        <Select
          placeholder='Ургийн овгийг сонгоно уу'
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
            ...(parents || []).map((p: CustomerModel.Customer) => ({
              value: p.id,
              label: renderLastName(p.lastName, p.firstName),
            })),
          ]}
          filterOption={(input, option) =>
            typeof option?.label === 'string' &&
            option.label.toLowerCase().includes(input.toLowerCase())
          }
          onChange={handleParentIdChange}
          loading={parentsLoading}
        />
      </FormField>

      <FormField
        name='birthDate'
        label={
          <span className='flex items-center gap-2 font-medium'>
            <CalendarOutlined className='text-blue-500' />
            {t('admin.edit.birthDate')}
          </span>
        }
        rules={[{ required: true, message: t('admin.edit.birthDateRequired') }]}
      >
        <Input
          type='date'
          size='large'
          placeholder='Төрсөн өдөр сонгоно уу'
          className='rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-blue-500'
          onChange={e => form.setFieldValue('birthDate', e.target.value)}
        />
      </FormField>

      <div
        style={{
          opacity: selectedParentId ? 1 : 0,
          maxHeight: selectedParentId ? '200px' : '0px',
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <Col xs={24}>
          <Form.Item
            name='isParent'
            label={
              <span className='flex items-center gap-2 font-medium'>
                <UserOutlined className='text-green-500' />
                Хүүхдийн төрөл
              </span>
            }
            rules={[
              {
                required:
                  selectedParentId !== undefined && selectedParentId !== '',
                message: 'Хүүхдийн төрлийг сонгоно уу',
              },
            ]}
          >
            <Radio.Group>
              <Radio value={0}>Төрсөн хүүхэд</Radio>
              <Radio value={1}>Хүргэн</Radio>
              <Radio value={2}>Бэр</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </div>

      <FormField
        name='isDeceased'
        label={
          <span className='flex items-center gap-2 font-medium'>
            <UserOutlined className='text-red-500' />
            {t('customer.isDeceased')}
          </span>
        }
      >
        <Checkbox
          checked={isDeceased}
          onChange={e => setIsDeceased(e.target.checked)}
          className='text-gray-700'
        >
          {t('customer.isDeceasedLabel')}
        </Checkbox>
      </FormField>

      {isDeceased && (
        <FormField
          name='deceasedDate'
          label={
            <span className='flex items-center gap-2 font-medium'>
              <CalendarOutlined className='text-red-500' />
              {t('customer.deceasedDate')}
            </span>
          }
          rules={[
            { required: true, message: t('customer.deceasedDateRequired') },
          ]}
        >
          <Input
            type='date'
            size='large'
            className='rounded-lg border-gray-300 hover:border-red-400 focus:border-red-500 focus:ring-red-500'
            onChange={e => form.setFieldValue('deceasedDate', e.target.value)}
          />
        </FormField>
      )}
    </Row>
  </Card>
);

export default ProfileSection;
