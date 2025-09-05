import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  PhoneOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  Typography,
  notification,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import validations from 'context/validations';
import { LanguageButton } from 'pages/components';
import FormRegisterInput from 'pages/components/atomics/FormRegisterInput/FormRegisterInput';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { UserRegisterForm } from '../auth.model';
import { userRegister } from '../auth.service';
import './Register.css';

const { Title, Text } = Typography;

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
    <div className='register-container'>
      {/* Background Animation */}
      <div className='register-background'>
        <div className='floating-shapes'>
          <div className='shape shape-1'></div>
          <div className='shape shape-2'></div>
          <div className='shape shape-3'></div>
          <div className='shape shape-4'></div>
        </div>
      </div>

      {/* Main Content */}
      <div className='register-content'>
        {/* Left Side - Welcome Section */}
        <div className='register-welcome'>
          <div className='welcome-content'>
            <div className='welcome-icon'>
              <TeamOutlined />
            </div>
            <Title level={1} className='welcome-title'>
              {t('register.welcomeTitle')}
            </Title>
            <Title level={3} className='welcome-subtitle'>
              {t('register.welcomeSubtitle')}
            </Title>
            <Text className='welcome-description'>
              {t('register.welcomeDescription')}
            </Text>

            {/* Features */}
            <div className='features-list'>
              <div className='feature-item'>
                <div className='feature-icon'>🌳</div>
                <Text>{t('register.featureCreateTree')}</Text>
              </div>
              <div className='feature-item'>
                <div className='feature-icon'>📖</div>
                <Text>{t('register.featureWriteHistory')}</Text>
              </div>
              <div className='feature-item'>
                <div className='feature-icon'>📸</div>
                <Text>{t('register.featureSaveMedia')}</Text>
              </div>
              <div className='feature-item'>
                <div className='feature-icon'>👥</div>
                <Text>{t('register.featureManageMembers')}</Text>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className='register-form-section'>
          <Card className='register-card' variant='borderless'>
            {/* Header */}
            <div className='register-header'>
              <div className='register-avatar'>
                <UserAddOutlined />
              </div>
              <Title level={2} className='register-title'>
                {t('register.registerTitle')}
              </Title>
              <Text className='register-subtitle'>
                {t('register.registerSubtitle')}
              </Text>
            </div>

            {/* Language Button */}
            <div className='language-section'>
              <LanguageButton />
            </div>

            {/* Register Form */}
            <Form
              layout='vertical'
              autoComplete='off'
              size='large'
              requiredMark={false}
              onFinish={onFinish}
              form={form}
              className='register-form'
            >
              <Form.Item
                label={t('register.phoneNumber')}
                name='phoneNumber'
                rules={[
                  { required: true, message: `${t('register.enterPhone')}` },
                  {
                    pattern: validations.regex.phoneNumber,
                    message: `${t('register.enterPhoneRegex')}`,
                  },
                ]}
              >
                <Input
                  placeholder={t('register.phoneNumber')}
                  prefix={<PhoneOutlined className='input-icon' />}
                  className='register-input'
                />
              </Form.Item>

              <Form.Item
                label={t('register.lastName')}
                name='lastName'
                rules={[
                  {
                    required: true,
                    min: 2,
                    message: `${t('register.enterLastName')}`,
                  },
                ]}
              >
                <Input
                  placeholder={t('register.lastName')}
                  prefix={<UserOutlined className='input-icon' />}
                  className='register-input'
                />
              </Form.Item>

              <Form.Item
                label={t('register.firstName')}
                name='firstName'
                rules={[
                  {
                    required: true,
                    min: 2,
                    message: `${t('register.enterName')}`,
                  },
                ]}
              >
                <Input
                  placeholder={t('register.firstName')}
                  prefix={<UserOutlined className='input-icon' />}
                  className='register-input'
                />
              </Form.Item>

              <Form.Item
                label={t('register.password')}
                name='password'
                rules={[
                  { required: true, message: `${t('register.enterPassword')}` },
                  { min: 8, message: `${t('register.enterNewPasswordRegex')}` },
                ]}
                hasFeedback
              >
                <Input.Password
                  placeholder={t('register.password')}
                  allowClear
                  prefix={<LockOutlined className='input-icon' />}
                  iconRender={visible =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  className='register-input'
                />
              </Form.Item>

              <Form.Item
                label={t('register.confirmPassword')}
                name='confirmPassword'
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
                dependencies={['password']}
              >
                <Input.Password
                  placeholder={t('register.confirmPassword')}
                  allowClear
                  prefix={<LockOutlined className='input-icon' />}
                  iconRender={visible =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  className='register-input'
                />
              </Form.Item>

              {/* Register Number */}
              <FormRegisterInput
                form={form}
                name='register'
                required={true}
                showIcon={true}
                placeholder='8 орон'
              />

              <Button
                type='primary'
                htmlType='submit'
                loading={loading}
                className='register-button'
                icon={<UserAddOutlined />}
                block
              >
                {t('general.registerText')}
              </Button>
            </Form>

            {/* Divider */}
            <Divider className='register-divider'>
              <Text className='divider-text'>{t('register.orText')}</Text>
            </Divider>

            {/* Login Link */}
            <div className='login-section'>
              <Text className='login-text'>
                {t('register.hasAccountText')}{' '}
                <Button
                  type='link'
                  onClick={() => navigate('/auth/login')}
                  className='login-link'
                >
                  {t('general.loginText')}
                </Button>
              </Text>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
