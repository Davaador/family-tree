import { Card, Flex, Form, Input, Typography, notification } from 'antd';
import { useForm } from 'antd/es/form/Form';
import validations from 'context/validations';
import {
  FormRegisterInput,
  LanguageButton,
  SubmitButton,
  TextButton,
} from 'pages/components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { UserRegisterForm } from '../auth.model';
import { userRegister } from '../auth.service';

const { Title } = Typography;
const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [form] = useForm();
  const onFinish = (values: UserRegisterForm) => {
    setLoading(true);
    userRegister(values)
      .then(() => {
        notification.success({
          message: 'Амжилттай',
          description: 'Таны бүртгэл амжилттай хийгдлээ. Та нэвтэрч орно уу.',
        });
        navigate('/auth/login');
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Card hoverable size="default">
      <Flex justify="space-between">
        <Title level={3}>{t('general.registerText')}</Title>
        <LanguageButton />
      </Flex>
      <Form
        layout="vertical"
        autoComplete="off"
        size="large"
        requiredMark={false}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          label={t('register.phoneNumber')}
          name="phoneNumber"
          rules={[
            { required: true, message: `${t('register.enterPhone')}` },
            {
              pattern: validations.regex.phoneNumber,
              message: `${t('register.enterPhoneRegex')}`,
            },
          ]}
        >
          <Input placeholder={t('register.phoneNumber')} />
        </Form.Item>

        <Form.Item
          label={t('register.lastName')}
          name="lastName"
          rules={[
            {
              required: true,
              min: 2,
              message: `${t('register.enterLastName')}`,
            },
          ]}
        >
          <Input placeholder={t('register.lastName')} />
        </Form.Item>
        <Form.Item
          label={t('register.firstName')}
          name="firstName"
          rules={[
            { required: true, min: 2, message: `${t('register.enterName')}` },
          ]}
        >
          <Input placeholder={t('register.firstName')} />
        </Form.Item>

        <Form.Item
          label={t('register.password')}
          name="password"
          rules={[
            { required: true, message: `${t('register.enterPassword')}` },
            { min: 8, message: `${t('register.enterNewPasswordRegex')}` },
          ]}
          hasFeedback
        >
          <Input.Password placeholder={t('register.password')} allowClear />
        </Form.Item>
        <Form.Item
          label={t('register.confirmPassword')}
          name="confirmPassword"
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
          hasFeedback
          dependencies={['passwords']}
        >
          <Input.Password
            placeholder={t('register.confirmPassword')}
            allowClear
          />
        </Form.Item>
        <FormRegisterInput form={form} />

        <Flex justify="space-evenly" align="center" gap="middle">
          <TextButton
            text={t('general.loginText')}
            onPress={() => navigate('/auth/login')}
          />
          <SubmitButton text={t('general.registerText')} loading={loading} />
        </Flex>
      </Form>
    </Card>
  );
};

export default Register;
