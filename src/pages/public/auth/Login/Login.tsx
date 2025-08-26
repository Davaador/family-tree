import { Button, Card, Checkbox, Flex, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { authStore } from 'context/auth/store';
import validations from 'context/validations';
import { LanguageButton, SubmitButton } from 'pages/components';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Auth, LoginForm } from '../auth.model';
import { login } from '../auth.service';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setAuthentication, setAuth, phone, setPhoneRemember, clearRemember } =
    authStore();
  const [loading, setLoading] = useState(false);
  const [form] = useForm();

  const onFinish = (values: LoginForm) => {
    setLoading(true);
    login(values)
      .then((res: Auth) => {
        console.log(values, 'test');
        if (values.rememberMe) {
          setPhoneRemember(values.phoneNumber);
        } else {
          clearRemember();
        }
        setAuthentication(true);
        setAuth(res);
        navigate('/');
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (phone) {
      form.setFieldValue('rememberMe', true);
    }
  }, [form, phone]);

  const onClickReset = () => {
    navigate('/auth/reset');
  };

  return (
    <Card hoverable size="default">
      <Flex justify="flex-end">
        <LanguageButton />
        <p>vercel</p>
      </Flex>
      <Form
        form={form}
        layout={'vertical'}
        autoComplete="off"
        requiredMark={false}
        size={'large'}
        onFinish={onFinish}
      >
        <Form.Item
          label={t('register.phoneNumber')}
          name={'phoneNumber'}
          required
          initialValue={phone}
          rules={[
            { required: true, message: `${t('register.enterPhone')}` },
            {
              pattern: validations.phoneNumber,
              message: `${t('register.enterPhoneRegex')}`,
            },
          ]}
        >
          <Input placeholder={t('register.phoneNumber')} />
        </Form.Item>
        <Form.Item
          label={t('login.password')}
          name={'password'}
          required
          initialValue={''}
          rules={[
            { required: true, message: `${t('login.enterPassword')}` },
            { min: 8, message: `${t('register.enterNewPasswordRegex')}` },
          ]}
        >
          <Input.Password
            autoComplete="off"
            placeholder={t('login.password')}
          />
        </Form.Item>
        <Flex justify="space-between">
          <Form.Item name="rememberMe" valuePropName="checked">
            <Checkbox>{t('login.remember')}</Checkbox>
          </Form.Item>
          <Button type="link" onClick={onClickReset}>
            {t('login.resetPassword')}
          </Button>
        </Flex>
        <SubmitButton text={t('general.loginText')} block loading={loading} />
        <Flex justify="center" className="mt-20">
          <Link to={'/auth/register'}>{t('login.register')}</Link>
        </Flex>
      </Form>
    </Card>
  );
};

export default Login;
