import { notification } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { Col, Flex, Form, Layout, Row, Select } from 'antd/lib';
import { CustomerModel } from 'context/entities/customer.model';
import { createAdminCustomer } from 'context/services/admin.service';
import { parentService } from 'context/services/parent.service';
import validations from 'context/validations';
import dayjs from 'dayjs';

import {
  CardHeader,
  CustomFormItem,
  CustomInput,
  FormBirthDate,
  FormRegisterInput,
  SubmitButton,
} from 'pages/components';
import { renderLastName } from 'pages/private/hooks/useCustomerHook';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const AddCustomer = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [parents, setParents] = useState<CustomerModel.Customer[]>([]);
  const { t } = useTranslation();
  const [form] = useForm();

  useEffect(() => {
    setLoading(true);
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
      })
      .finally(() => {
        setLoading(false);
      });
  }, [t]);

  const onFinish = (values: CustomerModel.AdminCustomer) => {
    const body: CustomerModel.AdminCustomer = {
      ...values,
      birthDate: dayjs(values.birthDate).format('YYYY-MM-DD'),
      age: dayjs().diff(values.birthDate, 'year'),
    };

    setLoading(true);
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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Layout className="layout-transparent">
      <CardHeader headerTitle={t('admin.add.customerTitle')} onBack={true} />
      <Form
        layout="vertical"
        autoComplete="off"
        size="small"
        form={form}
        requiredMark={false}
        onFinish={onFinish}
      >
        <Flex>
          <Row gutter={[8, 0]}>
            <Col xs={24} sm={8}>
              <CustomFormItem
                layout="vertical"
                label={t('register.surName')}
                name="surName"
                rules={validations.rules.surName(t)}
              >
                <CustomInput placeholder={t('register.surName')} />
              </CustomFormItem>
            </Col>

            <Col xs={24} sm={8}>
              <CustomFormItem
                layout="vertical"
                label={t('register.lastName')}
                name="lastNameId"
                rules={validations.rules.required(t('admin.add.lastName'))}
              >
                <Select
                  placeholder={t('admin.add.lastName')}
                  showSearch
                  allowClear
                  options={(parents || []).map((p) => ({
                    value: p.id,
                    label: renderLastName(p.lastName, p.firstName),
                  }))}
                  filterOption={(input, option) =>
                    typeof option?.label === 'string' &&
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </CustomFormItem>
            </Col>

            <Col xs={24} sm={8}>
              <CustomFormItem
                layout="vertical"
                label={t('register.firstName')}
                name="firstName"
                rules={validations.rules.name(t)}
              >
                <CustomInput placeholder={t('register.firstName')} />
              </CustomFormItem>
            </Col>

            <Col xs={24} sm={8}>
              <FormRegisterInput form={form} />
            </Col>

            <Col xs={24} sm={8}>
              <CustomFormItem
                layout="vertical"
                label={t('profile.email')}
                name={'email'}
                rules={validations.rules.email(t)}
              >
                <CustomInput placeholder={t('profile.email')} />
              </CustomFormItem>
            </Col>

            <Col xs={24} sm={8}>
              <CustomFormItem
                layout="vertical"
                label={t('register.phoneNumber')}
                name={'phoneNumber'}
                rules={validations.rules.phoneNumber(t)}
              >
                <CustomInput placeholder={t('register.phoneNumber')} />
              </CustomFormItem>
            </Col>

            <Col xs={24} sm={8}>
              <CustomFormItem
                label={t('register.password')}
                name="password"
                hasFeedback
                layout="vertical"
                rules={validations.rules.password(t)}
              >
                <CustomInput
                  type="password"
                  allowClear
                  placeholder={t('register.password')}
                />
              </CustomFormItem>
            </Col>

            <Col xs={24} sm={8}>
              <CustomFormItem
                label={t('register.confirmPassword')}
                name="confirmPassword"
                hasFeedback
                layout="vertical"
                dependencies={['password']}
                rules={validations.rules.confirmPassword(t)}
              >
                <CustomInput
                  type="password"
                  allowClear
                  placeholder={t('register.confirmPassword')}
                />
              </CustomFormItem>
            </Col>

            <Col xs={24} sm={8}>
              <FormBirthDate
                format={'YYYY-MM-DD'}
                label={t('profile.birthDate')}
                layout="vertical"
                name={'birthDate'}
                rules={validations.rules.birthDate(t)}
              />
            </Col>

            <Col xs={24} className="justify-center flex">
              <SubmitButton
                className="mt-6"
                size="small"
                text={t('general.registerText')}
                loading={loading}
              />
            </Col>
          </Row>
        </Flex>
      </Form>
    </Layout>
  );
};

export default AddCustomer;
