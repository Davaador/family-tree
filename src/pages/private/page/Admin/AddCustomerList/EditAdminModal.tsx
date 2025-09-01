import React, { useCallback, useEffect, useState } from 'react';
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Button,
  Row,
  Col,
  Card,
  Typography,
  Avatar,
  message,
  Checkbox,
} from 'antd';
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  CalendarOutlined,
  SaveOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { CustomerModel } from 'types/customer.types';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { FormBirthDate, FormRegisterInput } from 'pages/components';

const { Title, Text } = Typography;

interface EditAdminModalProps {
  visible: boolean;
  onClose: () => void;
  admin: CustomerModel.Customer | null;
  onSave: (data: CustomerModel.Customer) => Promise<void>;
  loading?: boolean;
}

const EditAdminModal: React.FC<EditAdminModalProps> = ({
  visible,
  onClose,
  admin,
  onSave,
  loading = false,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [birthDateValue, setBirthDateValue] = useState<any>(null);
  const [isDeceased, setIsDeceased] = useState<boolean>(false);
  const [deceasedDateValue, setDeceasedDateValue] = useState<any>(null);

  const handleCancel = useCallback(() => {
    form.resetFields();
    setBirthDateValue(null);
    setIsDeceased(false);
    setDeceasedDateValue(null);
    onClose();
  }, [form, onClose]);

  const handleSave = useCallback(async () => {
    try {
      const values = await form.validateFields();
      const updatedAdmin = {
        ...admin!,
        ...values,
        birthDate: values.birthDate
          ? dayjs(values.birthDate).format('YYYY-MM-DD')
          : admin?.birthDate,
        age: values.birthDate
          ? dayjs().diff(values.birthDate, 'year')
          : admin?.age,
        isDeceased: isDeceased,
        deceasedDate:
          isDeceased && values.deceasedDate
            ? dayjs(values.deceasedDate).format('YYYY-MM-DD')
            : undefined,
      };
      await onSave(updatedAdmin);
      message.success(t('admin.edit.success'));
      handleCancel();
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  }, [form, admin, onSave, t, handleCancel]);

  // Reset form when admin data changes
  useEffect(() => {
    if (admin && visible) {
      // Reset form first
      form.resetFields();

      // Set birthDate value in state
      const birthDate = admin.birthDate ? dayjs(admin.birthDate) : null;
      const deceasedDate = admin.deceasedDate
        ? dayjs(admin.deceasedDate)
        : null;

      setBirthDateValue(birthDate);
      setIsDeceased(admin.isDeceased || false);
      setDeceasedDateValue(deceasedDate);

      // Then set new values with proper timing
      const timer = setTimeout(() => {
        form.setFieldsValue({
          firstName: admin.firstName,
          lastName: admin.lastName,
          surName: admin.surName,
          phoneNumber: admin.phoneNumber,
          email: admin.email,
          register: admin.register,
        });

        // Set birthDate separately to ensure it works
        if (birthDate) {
          form.setFieldValue('birthDate', birthDate);
        }

        // Set deceasedDate separately to ensure it works
        if (deceasedDate) {
          form.setFieldValue('deceasedDate', deceasedDate);
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [admin, visible, form]);

  if (!admin) return null;

  return (
    <Modal
      title={
        <div className="flex items-center gap-3">
          <Avatar size={40} icon={<UserOutlined />} className="bg-blue-500" />
          <div>
            <Title level={4} className="!mb-0">
              {t('admin.edit.title')}
            </Title>
            <Text type="secondary" className="text-sm">
              {admin.firstName} {admin.lastName}
            </Text>
          </div>
        </div>
      }
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={900}
      centered
      destroyOnHidden
      className="edit-admin-modal"
    >
      <div className="py-4">
        <Form form={form} layout="vertical" className="space-y-6">
          {/* Profile Section */}
          <Card
            title={
              <span className="flex items-center gap-2 text-blue-600">
                <UserOutlined />
                {t('admin.edit.profileInfo')}
              </span>
            }
            className="mb-6 rounded-xl shadow-sm border-0 bg-gray-50/50"
            styles={{ body: { padding: '24px' } }}
          >
            <Row gutter={[24, 16]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="firstName"
                  label={
                    <span className="flex items-center gap-2 font-medium">
                      <UserOutlined className="text-blue-500" />
                      {t('admin.edit.firstName')}
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: t('admin.edit.firstNameRequired'),
                    },
                    { min: 2, message: t('admin.edit.firstNameMin') },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder={t('admin.edit.firstNamePlaceholder')}
                    className="rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-blue-500"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="lastName"
                  label={
                    <span className="flex items-center gap-2 font-medium">
                      <UserOutlined className="text-blue-500" />
                      {t('admin.edit.lastName')}
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: t('admin.edit.lastNameRequired'),
                    },
                    { min: 2, message: t('admin.edit.lastNameMin') },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder={t('admin.edit.lastNamePlaceholder')}
                    className="rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-blue-500"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="surName"
                  label={
                    <span className="flex items-center gap-2 font-medium">
                      <UserOutlined className="text-blue-500" />
                      {t('admin.edit.surName')}
                    </span>
                  }
                >
                  <Input
                    size="large"
                    placeholder={t('admin.edit.surNamePlaceholder')}
                    className="rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-blue-500"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="birthDate"
                  label={
                    <span className="flex items-center gap-2 font-medium">
                      <CalendarOutlined className="text-blue-500" />
                      {t('admin.edit.birthDate')}
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: t('admin.edit.birthDateRequired'),
                    },
                  ]}
                >
                  <DatePicker
                    size="large"
                    value={birthDateValue}
                    onChange={(date) => {
                      setBirthDateValue(date);
                      form.setFieldValue('birthDate', date);
                    }}
                    className="w-full rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-blue-500"
                    placeholder={t('admin.edit.birthDatePlaceholder')}
                    format="YYYY-MM-DD"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="isDeceased"
                  label={
                    <span className="flex items-center gap-2 font-medium">
                      <UserOutlined className="text-red-500" />
                      {t('customer.isDeceased')}
                    </span>
                  }
                >
                  <Checkbox
                    checked={isDeceased}
                    onChange={(e) => setIsDeceased(e.target.checked)}
                    className="text-gray-700"
                  >
                    {t('customer.isDeceasedLabel')}
                  </Checkbox>
                </Form.Item>
              </Col>

              {isDeceased && (
                <Col xs={24} md={12}>
                  <Form.Item
                    name="deceasedDate"
                    label={
                      <span className="flex items-center gap-2 font-medium">
                        <CalendarOutlined className="text-red-500" />
                        {t('customer.deceasedDate')}
                      </span>
                    }
                    rules={[
                      {
                        required: true,
                        message: t('customer.deceasedDateRequired'),
                      },
                    ]}
                  >
                    <DatePicker
                      size="large"
                      value={deceasedDateValue}
                      onChange={(date) => {
                        setDeceasedDateValue(date);
                        form.setFieldValue('deceasedDate', date);
                      }}
                      className="w-full rounded-lg border-gray-300 hover:border-red-400 focus:border-red-500 focus:ring-red-500"
                      placeholder={t('customer.deceasedDatePlaceholder')}
                      format="YYYY-MM-DD"
                    />
                  </Form.Item>
                </Col>
              )}
            </Row>
          </Card>

          {/* Contact Information */}
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
              <Col xs={24} md={12}>
                <Form.Item
                  name="phoneNumber"
                  label={
                    <span className="flex items-center gap-2 font-medium">
                      <PhoneOutlined className="text-green-500" />
                      {t('admin.edit.phoneNumber')}
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: t('admin.edit.phoneNumberRequired'),
                    },
                    {
                      pattern: /^[0-9]{8}$/,
                      message: t('admin.edit.phoneNumberFormat'),
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder={t('admin.edit.phoneNumberPlaceholder')}
                    className="rounded-lg border-gray-300 hover:border-green-400 focus:border-green-500 focus:ring-green-500"
                    prefix={<PhoneOutlined className="text-gray-400" />}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="email"
                  label={
                    <span className="flex items-center gap-2 font-medium">
                      <MailOutlined className="text-orange-500" />
                      {t('admin.edit.email')}
                    </span>
                  }
                  rules={[
                    { required: true, message: t('admin.edit.emailRequired') },
                    { type: 'email', message: t('admin.edit.emailFormat') },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder={t('admin.edit.emailPlaceholder')}
                    className="rounded-lg border-gray-300 hover:border-orange-400 focus:border-orange-500 focus:ring-orange-500"
                    prefix={<MailOutlined className="text-gray-400" />}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <FormRegisterInput
                  form={form}
                  defaultValue={admin.register}
                  label={t('admin.edit.registerNumber')}
                  required={true}
                  layout="vertical"
                  showIcon={true}
                  placeholder={t('admin.edit.registerNumberPlaceholder')}
                />
              </Col>
            </Row>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
            <Button
              size="large"
              icon={<CloseOutlined />}
              onClick={handleCancel}
              className="px-6 py-2 h-auto rounded-lg border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-800"
            >
              {t('admin.edit.cancel')}
            </Button>
            <Button
              type="primary"
              size="large"
              icon={<SaveOutlined />}
              onClick={handleSave}
              loading={loading}
              className="px-6 py-2 h-auto rounded-lg bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600 focus:ring-blue-500"
            >
              {t('admin.edit.save')}
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default EditAdminModal;
