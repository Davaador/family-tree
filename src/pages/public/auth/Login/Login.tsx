import EyeInvisibleOutlined from '@ant-design/icons/lib/icons/EyeInvisibleOutlined';
import EyeTwoTone from '@ant-design/icons/lib/icons/EyeTwoTone';
import LockOutlined from '@ant-design/icons/lib/icons/LockOutlined';
import LoginOutlined from '@ant-design/icons/lib/icons/LoginOutlined';
import PhoneOutlined from '@ant-design/icons/lib/icons/PhoneOutlined';
import TeamOutlined from '@ant-design/icons/lib/icons/TeamOutlined';
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined';
import Button from 'antd/es/button';
import Card from 'antd/es/card';
import Checkbox from 'antd/es/checkbox';
import Divider from 'antd/es/divider';
import Form from 'antd/es/form';
import { useForm } from 'antd/es/form/Form';
import Input from 'antd/es/input';
import Typography from 'antd/es/typography';
import { authStore } from 'context/auth/store';
import { LanguageButton } from 'pages/components';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { Auth, LoginForm } from '../auth.model';
import { login } from '../auth.service';
import './Login.css';

const { Title, Text } = Typography;

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Create stable translation function to prevent circular references
  const getTranslation = useMemo(
    () => ({
      phoneNumber: t('register.phoneNumber'),
      enterPhone: t('register.enterPhone'),
      enterPhoneRegex: t('register.enterPhoneRegex'),
      password: t('login.password'),
      enterPassword: t('login.enterPassword'),
      enterNewPasswordRegex: t('register.enterNewPasswordRegex'),
      remember: t('login.remember'),
      resetPassword: t('login.resetPassword'),
      loginTitle: t('login.loginTitle'),
      loginSubtitle: t('login.loginSubtitle'),
      welcomeTitle: t('login.welcomeTitle'),
      welcomeSubtitle: t('login.welcomeSubtitle'),
      welcomeDescription: t('login.welcomeDescription'),
      featureCreateTree: t('login.featureCreateTree'),
      featureWriteHistory: t('login.featureWriteHistory'),
      featureSaveMedia: t('login.featureSaveMedia'),
      featureManageMembers: t('login.featureManageMembers'),
    }),
    [t]
  );

  // Destructure authStore functions to avoid potential circular references
  const setAuthentication = authStore(state => state.setAuthentication);
  const setAuth = authStore(state => state.setAuth);
  const phone = authStore(state => state.phone);
  const setPhoneRemember = authStore(state => state.setPhoneRemember);
  const clearRemember = authStore(state => state.clearRemember);
  const [loading, setLoading] = useState(false);
  const [form] = useForm();

  // Memoize validation rules to prevent circular references
  const phoneValidationRules = useMemo(
    () => [
      { required: true, message: getTranslation.enterPhone },
      {
        pattern: /^[0-9]{8}$/, // Direct regex instead of validations.regex.phoneNumber
        message: getTranslation.enterPhoneRegex,
      },
    ],
    [getTranslation]
  );

  const passwordValidationRules = useMemo(
    () => [
      { required: true, message: getTranslation.enterPassword },
      { min: 8, message: getTranslation.enterNewPasswordRegex },
    ],
    [getTranslation]
  );

  const onFinish = (values: LoginForm) => {
    setLoading(true);
    login(values)
      .then((res: Auth) => {
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
  }, [form, phone]); // Removed form from dependencies to prevent circular references

  const onClickReset = () => {
    navigate('/auth/reset');
  };

  return (
    <div className='login-container'>
      {/* Background Animation */}
      <div className='login-background'>
        <div className='floating-shapes'>
          <div className='shape shape-1'></div>
          <div className='shape shape-2'></div>
          <div className='shape shape-3'></div>
          <div className='shape shape-4'></div>
        </div>
      </div>

      {/* Main Content */}
      <div className='login-content'>
        {/* Left Side - Welcome Section */}
        <div className='login-welcome'>
          <div className='welcome-content'>
            <div className='welcome-icon'>
              <TeamOutlined />
            </div>
            <Title level={1} className='welcome-title'>
              {getTranslation.welcomeTitle}
            </Title>
            <Title level={3} className='welcome-subtitle'>
              {getTranslation.welcomeSubtitle}
            </Title>
            <Text className='welcome-description'>
              {getTranslation.welcomeDescription}
            </Text>

            {/* Features */}
            <div className='features-list'>
              <div className='feature-item'>
                <div className='feature-icon'>🌳</div>
                <Text>{getTranslation.featureCreateTree}</Text>
              </div>
              <div className='feature-item'>
                <div className='feature-icon'>📖</div>
                <Text>{getTranslation.featureWriteHistory}</Text>
              </div>
              <div className='feature-item'>
                <div className='feature-icon'>📸</div>
                <Text>{getTranslation.featureSaveMedia}</Text>
              </div>
              <div className='feature-item'>
                <div className='feature-icon'>👥</div>
                <Text>{getTranslation.featureManageMembers}</Text>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className='login-form-section'>
          <Card className='login-card' variant='borderless'>
            {/* Header */}
            <div className='login-header'>
              <div className='login-avatar'>
                <UserOutlined />
              </div>
              <Title level={2} className='login-title'>
                {getTranslation.loginTitle}
              </Title>
              <Text className='login-subtitle'>
                {getTranslation.loginSubtitle}
              </Text>
            </div>

            {/* Language Button */}
            <div className='language-section'>
              <LanguageButton />
            </div>

            {/* Login Form */}
            <Form
              key='login-form'
              form={form}
              layout={'vertical'}
              autoComplete='off'
              requiredMark={false}
              size={'large'}
              onFinish={onFinish}
              className='login-form'
            >
              <Form.Item
                label={getTranslation.phoneNumber}
                name={'phoneNumber'}
                required
                initialValue={phone}
                rules={phoneValidationRules}
              >
                <Input
                  placeholder={getTranslation.phoneNumber}
                  prefix={<PhoneOutlined className='input-icon' />}
                  className='login-input'
                />
              </Form.Item>

              <Form.Item
                label={getTranslation.password}
                name={'password'}
                required
                initialValue={''}
                rules={passwordValidationRules}
              >
                <Input.Password
                  autoComplete='off'
                  placeholder={getTranslation.password}
                  prefix={<LockOutlined className='input-icon' />}
                  iconRender={visible =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  className='login-input'
                />
              </Form.Item>

              <div className='login-options'>
                <Form.Item
                  name='rememberMe'
                  valuePropName='checked'
                  className='remember-me'
                >
                  <Checkbox className='custom-checkbox'>
                    {getTranslation.remember}
                  </Checkbox>
                </Form.Item>
                <Button
                  type='link'
                  onClick={onClickReset}
                  className='reset-link'
                >
                  {getTranslation.resetPassword}
                </Button>
              </div>

              <Button
                type='primary'
                htmlType='submit'
                loading={loading}
                className='login-button'
                icon={<LoginOutlined />}
                block
              >
                {t('general.loginText')}
              </Button>
            </Form>

            {/* Divider */}
            <Divider className='login-divider'>
              <Text className='divider-text'>{t('login.orText')}</Text>
            </Divider>

            {/* Register Link */}
            <div className='register-section'>
              <Text className='register-text'>
                {t('login.noAccountText')}{' '}
                <Link to={'/auth/register'} className='register-link'>
                  {t('login.register')}
                </Link>
              </Text>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
