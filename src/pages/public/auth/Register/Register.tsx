import {
  Card,
  Flex,
  Form,
  Input,
  Typography,
  notification,
  Button,
  Divider,
  Select,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import validations from 'context/validations';
import { LanguageButton, SubmitButton, TextButton } from 'pages/components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { UserRegisterForm } from '../auth.model';
import { userRegister } from '../auth.service';
import {
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserAddOutlined,
  TeamOutlined,
  IdcardOutlined,
} from '@ant-design/icons';
import './Register.css';

const { Title, Text } = Typography;

const MONGOLIAN_ALPHABET = [
  'А',
  'Б',
  'В',
  'Г',
  'Д',
  'Е',
  'Ё',
  'Ж',
  'З',
  'И',
  'Й',
  'К',
  'Л',
  'М',
  'Н',
  'О',
  'Ө',
  'П',
  'Р',
  'С',
  'Т',
  'У',
  'Ү',
  'Ф',
  'Х',
  'Ц',
  'Ч',
  'Ш',
  'Щ',
  'Ъ',
  'Ы',
  'Ь',
  'Э',
  'Ю',
  'Я',
];

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [form] = useForm();

  // Register number state
  const [firstLetter, setFirstLetter] = useState<string>('');
  const [secondLetter, setSecondLetter] = useState<string>('');
  const [numbers, setNumbers] = useState<string>('');

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

  // Update register field when letters or numbers change
  const updateRegisterField = () => {
    const registerValue = [firstLetter, secondLetter, numbers].join('');
    form.setFieldValue('register', registerValue);
  };

  return (
    <div className="register-container">
      {/* Background Animation */}
      <div className="register-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="register-content">
        {/* Left Side - Welcome Section */}
        <div className="register-welcome">
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

        {/* Right Side - Register Form */}
        <div className="register-form-section">
          <Card className="register-card" bordered={false}>
            {/* Header */}
            <div className="register-header">
              <div className="register-avatar">
                <UserAddOutlined />
              </div>
              <Title level={2} className="register-title">
                Бүртгүүлэх
              </Title>
              <Text className="register-subtitle">
                Гэр бүлийн мод руу бүртгүүлж эхлээрэй
              </Text>
            </div>

            {/* Language Button */}
            <div className="language-section">
              <LanguageButton />
            </div>

            {/* Register Form */}
            <Form
              layout="vertical"
              autoComplete="off"
              size="large"
              requiredMark={false}
              onFinish={onFinish}
              form={form}
              className="register-form"
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
                <Input
                  placeholder={t('register.phoneNumber')}
                  prefix={<PhoneOutlined className="input-icon" />}
                  className="register-input"
                />
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
                <Input
                  placeholder={t('register.lastName')}
                  prefix={<UserOutlined className="input-icon" />}
                  className="register-input"
                />
              </Form.Item>

              <Form.Item
                label={t('register.firstName')}
                name="firstName"
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
                  prefix={<UserOutlined className="input-icon" />}
                  className="register-input"
                />
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
                <Input.Password
                  placeholder={t('register.password')}
                  allowClear
                  prefix={<LockOutlined className="input-icon" />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  className="register-input"
                />
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
                dependencies={['password']}
              >
                <Input.Password
                  placeholder={t('register.confirmPassword')}
                  allowClear
                  prefix={<LockOutlined className="input-icon" />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  className="register-input"
                />
              </Form.Item>

              {/* Register Number */}
              <Form.Item
                label={t('register.registerNumber')}
                name="register"
                rules={[
                  {
                    required: true,
                    message: `${t('register.enterRegisterNumber')}`,
                  },
                  {
                    pattern: validations.regex.register,
                    message: `${t('register.invalidRegisterNumber')}`,
                  },
                ]}
              >
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Select
                    showSearch
                    allowClear
                    placeholder="Үсэг сонгох"
                    value={firstLetter}
                    onChange={(value) => {
                      setFirstLetter(value);
                      updateRegisterField();
                    }}
                    style={{ flex: 1 }}
                    size="large"
                    getPopupContainer={(triggerNode) =>
                      triggerNode.parentNode || document.body
                    }
                  >
                    <Select.Option value="">Бүгд</Select.Option>
                    {MONGOLIAN_ALPHABET.map((letter) => (
                      <Select.Option key={letter} value={letter}>
                        {letter}
                      </Select.Option>
                    ))}
                  </Select>

                  <Select
                    showSearch
                    allowClear
                    placeholder="Үсэг сонгох"
                    value={secondLetter}
                    onChange={(value) => {
                      setSecondLetter(value);
                      updateRegisterField();
                    }}
                    style={{ flex: 1 }}
                    size="large"
                    getPopupContainer={(triggerNode) =>
                      triggerNode.parentNode || document.body
                    }
                  >
                    <Select.Option value="">Бүгд</Select.Option>
                    {MONGOLIAN_ALPHABET.map((letter) => (
                      <Select.Option key={letter} value={letter}>
                        {letter}
                      </Select.Option>
                    ))}
                  </Select>

                  <Input
                    value={numbers}
                    onChange={(e) => {
                      setNumbers(e.target.value);
                      updateRegisterField();
                    }}
                    maxLength={8}
                    placeholder="8 орон"
                    style={{
                      flex: 2,
                      borderRadius: '12px',
                      border: '2px solid #e2e8f0',
                      fontSize: '16px',
                      background: '#f7fafc',
                    }}
                  />
                </div>
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="register-button"
                icon={<UserAddOutlined />}
                block
              >
                {t('general.registerText')}
              </Button>
            </Form>

            {/* Divider */}
            <Divider className="register-divider">
              <Text className="divider-text">эсвэл</Text>
            </Divider>

            {/* Login Link */}
            <div className="login-section">
              <Text className="login-text">
                Бүртгэл байгаа юу?{' '}
                <Button
                  type="link"
                  onClick={() => navigate('/auth/login')}
                  className="login-link"
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
