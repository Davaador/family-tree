import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Card, Col, Input, Row } from 'antd';
import React from 'react';
import { CustomerModel } from 'types/customer.types';
import { FormRegisterInput } from 'pages/components';
import FormField from './FormField';

interface ContactSectionProps {
  form: any;
  customer: CustomerModel.AdminCustomer;
  t: (key: string) => string;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  form,
  customer,
  t,
}) => (
  <Card
    title={
      <span className="flex items-center gap-2 text-blue-600">
        <PhoneOutlined />
        {t('admin.edit.contactInfo')}
      </span>
    }
    className="mb-6 rounded-xl shadow-sm border-0 bg-gray-50/50"
    styles={{ body: { padding: '24px' } }}
  >
    <Row gutter={[24, 16]}>
      <FormField
        name="phoneNumber"
        label={
          <span className="flex items-center gap-2 font-medium">
            <PhoneOutlined className="text-green-500" />
            {t('admin.edit.phoneNumber')}
          </span>
        }
        rules={[
          { required: true, message: t('admin.edit.phoneNumberRequired') },
          { pattern: /^[0-9]{8}$/, message: t('admin.edit.phoneNumberFormat') },
        ]}
      >
        <Input
          size="large"
          placeholder={t('admin.edit.phoneNumberPlaceholder')}
          className="rounded-lg border-gray-300 hover:border-green-400 focus:border-green-500 focus:ring-green-500"
          prefix={<PhoneOutlined className="text-gray-400" />}
        />
      </FormField>

      <FormField
        name="email"
        label={
          <span className="flex items-center gap-2 font-medium">
            <MailOutlined className="text-orange-500" />
            {t('admin.edit.email')}
          </span>
        }
        rules={[
          { required: false, message: t('admin.edit.emailRequired') },
          { type: 'email', message: t('admin.edit.emailFormat') },
        ]}
      >
        <Input
          size="large"
          placeholder={t('admin.edit.emailPlaceholder')}
          className="rounded-lg border-gray-300 hover:border-orange-400 focus:border-orange-500 focus:ring-orange-500"
          prefix={<MailOutlined className="text-gray-400" />}
        />
      </FormField>

      <Col xs={24} md={12}>
        <FormRegisterInput
          form={form}
          defaultValue={customer.register}
          label={t('admin.edit.registerNumber')}
          required={true}
          layout="vertical"
          showIcon={true}
          placeholder={t('admin.edit.registerNumberPlaceholder')}
        />
      </Col>
    </Row>
  </Card>
);

export default ContactSection;
