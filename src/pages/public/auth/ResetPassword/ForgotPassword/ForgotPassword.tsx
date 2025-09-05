import { ArrowLeftOutlined } from '@ant-design/icons';
import { Card, Flex, Form, Input, notification, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { CustomFormItem, SubmitButton } from 'pages/components';
import LanguageButton from 'pages/components/atomics/LanguageButton/LanguageButton';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { ForgotPasswordForm } from '../../auth.model';
import { resetPassword } from '../../auth.service';
const { Title } = Typography;

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [form] = useForm();
  const location = useLocation();
  const { email, resetToken } = location.state || {};
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = (values: ForgotPasswordForm) => {
    const data = { ...values, email: email, resetToken: resetToken };
    setLoading(true);
    resetPassword(data)
      .then(() => {
        notification.success({
          message: 'Амжилттай',
          description: t('reset.success.forgotMessage'),
        });
        navigate('/auth/login');
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Card hoverable size='default'>
      <Flex justify='space-between'>
        <ArrowLeftOutlined
          onClick={() => {
            navigate(-1);
          }}
        />
        <Title level={3}>{t('reset.forgotPassword')}</Title>
        <LanguageButton />
      </Flex>
      <Form
        layout='vertical'
        autoComplete='off'
        size='large'
        requiredMark={false}
        form={form}
        onFinish={onFinish}
      >
        <CustomFormItem
          label={t('register.password')}
          name='password'
          hasFeedback
          rules={[
            { required: true, message: `${t('register.enterPassword')}` },
            { min: 8, message: `${t('register.enterNewPasswordRegex')}` },
          ]}
        >
          <Input.Password allowClear placeholder={t('register.password')} />
        </CustomFormItem>
        <CustomFormItem
          label={t('register.confirmPassword')}
          name='confirmPassword'
          hasFeedback
          dependencies={['passwords']}
          rules={[
            {
              required: true,
              message: `${t('register.confirmPasswordRequired')}`,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(`${t('register.matchOldPassword')}`)
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder={t('register.confirmPassword')}
            allowClear
          />
        </CustomFormItem>
        <Flex justify='center'>
          <SubmitButton loading={loading} />
        </Flex>
      </Form>
    </Card>
  );
};
export default ForgotPassword;
