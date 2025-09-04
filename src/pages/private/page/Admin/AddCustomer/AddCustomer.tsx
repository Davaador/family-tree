import { Input, notification, Radio } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { Card, Checkbox, Col, Form, Row, Select } from 'antd/lib';
import { createAdminCustomer } from 'context/services/admin.service';
import { parentService } from 'context/services/parent.service';
import validations from 'context/validations';
import dayjs from 'dayjs';
import { CustomerModel } from 'types/customer.types';

import {
  CardHeader,
  CustomFormItem,
  CustomInput,
  FormRegisterInput,
  SubmitButton,
} from 'pages/components';
import { renderLastName } from 'pages/private/hooks/useCustomerHook';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const AddCustomer = () => {
  const [parents, setParents] = useState<CustomerModel.Customer[]>([]);
  const [isDeceased, setIsDeceased] = useState<boolean>(false);
  const [selectedParentId, setSelectedParentId] = useState<
    string | undefined
  >();
  const { t } = useTranslation();
  const [form] = useForm();

  useEffect(() => {
    parentService
      .getParents()
      .then((res: CustomerModel.Customer[]) => {
        setParents(res);
      })
      .catch((err) => {
        notification.error({
          message: t('admin.error.title'),
          description: err?.message || t('admin.error.message'),
        });
      });
  }, [t]);

  const onFinish = (values: CustomerModel.AdminCustomer) => {
    const body: CustomerModel.AdminCustomer = {
      ...values,
      birthDate: dayjs(values.birthDate).format('YYYY-MM-DD'),
      age: dayjs().diff(values.birthDate, 'year'),
      isDeceased: isDeceased,
      deceasedDate:
        isDeceased && values.deceasedDate
          ? dayjs(values.deceasedDate).format('YYYY-MM-DD')
          : undefined,
    };

    createAdminCustomer(body)
      .then((res: CustomerModel.AdminCustomer) => {
        if (res.id) {
          notification.success({
            message: t('admin.success.title'),
            description: t('admin.success.message'),
          });
          // зөвхөн password талбаруудыг цэвэрлэнэ
          form.resetFields(['password', 'confirmPassword']);
        }
      })
      .catch((err) => {
        notification.error({
          message: t('admin.error.title'),
          description: err?.message || t('admin.error.message'),
        });
      });
  };

  const handleParentIdChange = (value: string) => {
    setSelectedParentId(value);
    if (!value) {
      form.setFieldValue('isParent', undefined);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CardHeader headerTitle={t('admin.add.customerTitle')} onBack={true} />

      <div className="px-6 py-4">
        <Card className="shadow-sm border-0 bg-white">
          <Form
            layout="vertical"
            autoComplete="off"
            size="middle"
            form={form}
            requiredMark={true}
            onFinish={onFinish}
            className="max-w-4xl mx-auto"
          >
            <Row gutter={[32, 24]}>
              <Col xs={24} lg={12}>
                <CustomFormItem
                  layout="vertical"
                  label={
                    <span className="text-gray-700 font-medium">
                      {t('register.surName')}
                    </span>
                  }
                  name="surName"
                  rules={validations.rules.surName(t)}
                  className="mb-0"
                >
                  <CustomInput
                    placeholder={t('register.surName')}
                    size="large"
                    className="rounded-lg"
                  />
                </CustomFormItem>
              </Col>
              <Col xs={24} lg={12}>
                <CustomFormItem
                  layout="vertical"
                  label={
                    <span className="text-gray-700 font-medium">
                      {t('register.lastName')}
                    </span>
                  }
                  name="lastName"
                  rules={validations.rules.lastName(t)}
                  className="mb-0"
                >
                  <CustomInput
                    placeholder={t('register.lastName')}
                    size="large"
                    className="rounded-lg"
                  />
                </CustomFormItem>
              </Col>
              <Col xs={24} lg={12}>
                <CustomFormItem
                  layout="vertical"
                  label={
                    <span className="text-gray-700 font-medium">
                      {t('admin.add.lastName')}
                    </span>
                  }
                  name="lastNameId"
                  className="mb-0"
                >
                  <Select
                    placeholder={t('admin.add.lastName')}
                    showSearch
                    allowClear
                    size="large"
                    className="rounded-lg"
                    dropdownMatchSelectWidth={false}
                    getPopupContainer={(triggerNode) =>
                      triggerNode.parentNode || document.body
                    }
                    options={[
                      {
                        value: '',
                        label: 'Сонгохгүй',
                      },
                      ...(parents || []).map((p) => ({
                        value: p.id,
                        label: renderLastName(p.lastName, p.firstName),
                      })),
                    ]}
                    filterOption={(input, option) =>
                      typeof option?.label === 'string' &&
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                    onChange={handleParentIdChange}
                  />
                </CustomFormItem>
              </Col>
              <Col xs={24} lg={12}>
                <CustomFormItem
                  layout="vertical"
                  label={
                    <span className="text-gray-700 font-medium">
                      {t('register.firstName')}
                    </span>
                  }
                  name="firstName"
                  rules={validations.rules.name(t)}
                  className="mb-0"
                >
                  <CustomInput
                    placeholder={t('register.firstName')}
                    size="large"
                    className="rounded-lg"
                  />
                </CustomFormItem>
              </Col>
              <div
                style={{
                  opacity: selectedParentId ? 1 : 0,
                  maxHeight: selectedParentId ? '200px' : '0px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                <Col xs={24}>
                  <CustomFormItem
                    name="isParent"
                    label="Хүүхдийн төрөл"
                    rules={[
                      {
                        required:
                          selectedParentId !== undefined &&
                          selectedParentId !== '',
                        message: 'Хүүхдийн төрлийг сонгоно уу',
                      },
                    ]}
                  >
                    <Radio.Group>
                      <Radio value={0}>Төрсөн хүүхэд</Radio>
                      <Radio value={1}>Хүргэн</Radio>
                      <Radio value={2}>Бэр</Radio>
                    </Radio.Group>
                  </CustomFormItem>
                </Col>
              </div>
              <Col xs={24} lg={12}>
                <FormRegisterInput
                  form={form}
                  label=""
                  required={true}
                  layout="vertical"
                  showIcon={false}
                />
              </Col>

              <Col xs={24} lg={12}>
                <CustomFormItem
                  layout="vertical"
                  label={
                    <span className="text-gray-700 font-medium">
                      {t('profile.email')}
                    </span>
                  }
                  name={'email'}
                  rules={validations.rules.email(t)}
                  className="mb-0"
                >
                  <CustomInput
                    placeholder={t('profile.email')}
                    size="large"
                    className="rounded-lg"
                  />
                </CustomFormItem>
              </Col>

              <Col xs={24} lg={12}>
                {/* Phone Number */}
                <CustomFormItem
                  layout="vertical"
                  label={
                    <span className="text-gray-700 font-medium">
                      {t('register.phoneNumber')}
                    </span>
                  }
                  name={'phoneNumber'}
                  rules={validations.rules.phoneNumber(t)}
                  className="mb-0"
                >
                  <CustomInput
                    placeholder={t('register.phoneNumber')}
                    size="large"
                    className="rounded-lg"
                  />
                </CustomFormItem>
              </Col>

              <Col xs={24} lg={12}>
                {/* Password */}
                <CustomFormItem
                  label={
                    <span className="text-gray-700 font-medium">
                      {t('register.password')}
                    </span>
                  }
                  name="password"
                  hasFeedback
                  layout="vertical"
                  rules={validations.rules.password(t)}
                  className="mb-0"
                >
                  <CustomInput
                    type="password"
                    allowClear
                    placeholder={t('register.password')}
                    size="large"
                    className="rounded-lg"
                  />
                </CustomFormItem>
              </Col>

              <Col xs={24} lg={12}>
                {/* Confirm Password */}
                <CustomFormItem
                  label={
                    <span className="text-gray-700 font-medium">
                      {t('register.confirmPassword')}
                    </span>
                  }
                  name="confirmPassword"
                  hasFeedback
                  layout="vertical"
                  dependencies={['password']}
                  rules={validations.rules.confirmPassword(t)}
                  className="mb-0"
                >
                  <CustomInput
                    type="password"
                    allowClear
                    placeholder={t('register.confirmPassword')}
                    size="large"
                    className="rounded-lg"
                  />
                </CustomFormItem>
              </Col>
              <Col xs={24} lg={12}>
                {/* Birth Date */}
                <CustomFormItem
                  layout="vertical"
                  label={
                    <span className="text-gray-700 font-medium">
                      {t('profile.birthDate')}
                    </span>
                  }
                  name={'birthDate'}
                  rules={validations.rules.birthDate(t)}
                  className="mb-0"
                >
                  <Input
                    type="date"
                    style={{ width: '100%' }}
                    placeholder="Төрсөн өдөр сонгоно уу"
                    size="large"
                    onChange={(e) => {
                      form.setFieldValue('birthDate', e.target.value);
                    }}
                  />
                </CustomFormItem>
              </Col>

              <Col xs={24} lg={12}>
                {/* Deceased Checkbox */}
                <CustomFormItem
                  layout="vertical"
                  label={
                    <span className="text-gray-700 font-medium">
                      {t('customer.isDeceased')}
                    </span>
                  }
                  name="isDeceased"
                  className="mb-0"
                >
                  <Checkbox
                    checked={isDeceased}
                    onChange={(e) => setIsDeceased(e.target.checked)}
                    className="text-gray-700 text-base"
                  >
                    {t('customer.isDeceasedLabel')}
                  </Checkbox>
                </CustomFormItem>
              </Col>

              {/* Deceased Date - Full Width */}
              {isDeceased && (
                <Col xs={24} lg={12}>
                  <CustomFormItem
                    layout="vertical"
                    label={
                      <span className="text-gray-700 font-medium">
                        {t('customer.deceasedDate')}
                      </span>
                    }
                    name="deceasedDate"
                    rules={[
                      {
                        required: true,
                        message: t('customer.deceasedDateRequired'),
                      },
                    ]}
                    className="mb-0"
                  >
                    <Input
                      type="date"
                      style={{ width: '100%' }}
                      size="large"
                      onChange={(e) => {
                        form.setFieldValue('deceasedDate', e.target.value);
                      }}
                    />
                  </CustomFormItem>
                </Col>
              )}

              {/* Submit Button */}
              <Col xs={24} className="flex justify-end">
                <SubmitButton
                  className="mt-8 px-8 h-12 text-base font-medium"
                  size="large"
                  text={t('general.registerText')}
                />
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default AddCustomer;
