import {
  Button,
  Card,
  Checkbox,
  Flex,
  Form,
  Input,
  Typography,
  Divider,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { authStore } from 'context/auth/store';
import validations from 'context/validations';
import { LanguageButton, SubmitButton } from 'pages/components';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Auth, LoginForm } from '../auth.model';
import { login } from '../auth.service';
import {
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoginOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import './Login.css';

const { Title, Text } = Typography;

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
    <div className="login-container">
      {/* Background Animation */}
      <div className="login-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="login-content">
        {/* Left Side - Welcome Section */}
        <div className="login-welcome">
          <div className="welcome-content">
            <div className="welcome-icon">
              <TeamOutlined />
            </div>
            <Title level={1} className="welcome-title">
              Гэр бүлийн мод
            </Title>
            <Title level={3} className="welcome-subtitle">
              Таны гэр бүлийн түүх, холбоо, уялдаа
            </Title>
            <Text className="welcome-description">
              Гэр бүлийнхээ түүхийг бүртгэж, үе үеийн холбоог хадгалж, ирээдүй
              үеэдээ үлдээх үнэ цэнэтэй өв соёлыг бий болгоно уу.
            </Text>

            {/* Features */}
            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon">🌳</div>
                <Text>Гэр бүлийн мод бүтээх</Text>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📖</div>
                <Text>Түүх, намтар бичих</Text>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📸</div>
                <Text>Зураг, бичлэг хадгалах</Text>
              </div>
              <div className="feature-item">
                <div className="feature-icon">👥</div>
                <Text>Гэр бүлийн гишүүд удирдах</Text>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-section">
          <Card className="login-card" bordered={false}>
            {/* Header */}
            <div className="login-header">
              <div className="login-avatar">
                <UserOutlined />
              </div>
              <Title level={2} className="login-title">
                Нэвтрэх
              </Title>
              <Text className="login-subtitle">
                Тавтай морил! Гэр бүлийн мод руу нэвтэрнэ үү
              </Text>
            </div>

            {/* Language Button */}
            <div className="language-section">
              <LanguageButton />
            </div>

            {/* Login Form */}
            <Form
              form={form}
              layout={'vertical'}
              autoComplete="off"
              requiredMark={false}
              size={'large'}
              onFinish={onFinish}
              className="login-form"
            >
              <Form.Item
                label={t('register.phoneNumber')}
                name={'phoneNumber'}
                required
                initialValue={phone}
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
                  prefix={<PhoneOutlined className="input-icon" />}
                  className="login-input"
                />
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
                  prefix={<LockOutlined className="input-icon" />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  className="login-input"
                />
              </Form.Item>

              <div className="login-options">
                <Form.Item
                  name="rememberMe"
                  valuePropName="checked"
                  className="remember-me"
                >
                  <Checkbox className="custom-checkbox">
                    {t('login.remember')}
                  </Checkbox>
                </Form.Item>
                <Button
                  type="link"
                  onClick={onClickReset}
                  className="reset-link"
                >
                  {t('login.resetPassword')}
                </Button>
              </div>

              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="login-button"
                icon={<LoginOutlined />}
                block
              >
                {t('general.loginText')}
              </Button>
            </Form>

            {/* Divider */}
            <Divider className="login-divider">
              <Text className="divider-text">эсвэл</Text>
            </Divider>

            {/* Register Link */}
            <div className="register-section">
              <Text className="register-text">
                Бүртгэл байхгүй юу?{' '}
                <Link to={'/auth/register'} className="register-link">
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
