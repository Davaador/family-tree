import {
  Col,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import { IdcardOutlined } from '@ant-design/icons';
import validations from 'context/validations';
import { RegisterType } from 'pages/public/auth/auth.model';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

type RegisterInputProps = {
  name?: string;
  defaultValue?: string;
  onChange?(e: string): void;
  form: FormInstance;
  label?: string;
  required?: boolean;
  layout?: 'horizontal' | 'vertical';
  className?: string;
  showIcon?: boolean;
  placeholder?: string;
};

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

const FormRegisterInput = (props: RegisterInputProps) => {
  const {
    form,
    defaultValue,
    label,
    required = true,
    layout = 'vertical',
    className = '',
    showIcon = false,
    placeholder,
  } = props;

  const [numbers, setNumbers] = useState<string | undefined>(
    defaultValue?.substring(2, 10)
  );
  const [firstLetter, setFirstLetter] = useState<string>();
  const [secondLetter, setSecondLetter] = useState<string>();
  const { t } = useTranslation();

  useEffect(() => {
    console.log('FormRegisterInput defaultValue:', defaultValue);
    if (defaultValue) {
      const first = defaultValue.charAt(0);
      const second = defaultValue.charAt(1);
      const nums = defaultValue.substring(2, 10);
      console.log('Setting values:', { first, second, nums });
      setFirstLetter(first);
      setSecondLetter(second);
      setNumbers(nums);
    }
  }, [defaultValue]);

  const onTouch = (fn: any, key: string) => {
    if (validations.regex.mongolianUpperLetter.test(key.toUpperCase())) {
      fn(key.toUpperCase());
    }
  };

  const getLabel = () => {
    if (label) return label;
    return t('register.registerNumber');
  };

  return (
    <Form.Item<RegisterType>
      label={
        showIcon ? (
          <span className="flex items-center gap-2 font-medium">
            <IdcardOutlined className="text-blue-500" />
            {getLabel()}
          </span>
        ) : (
          getLabel()
        )
      }
      required={required}
      layout={layout}
      className={className}
    >
      <div className="register-number-container">
        <div className="register-number-display">
          <div className="register-number-preview">
            <Text className="register-number-text">
              {firstLetter || 'А'} {secondLetter || 'А'} {numbers || '12345678'}
            </Text>
          </div>
        </div>

        <div className="register-number-inputs">
          <Row gutter={[12, 12]}>
            <Col xs={12} sm={8} md={6}>
              <div className="letter-input-container">
                <Text className="letter-label">
                  {t('register.firstLetter')}
                </Text>
                <Select
                  showSearch
                  allowClear
                  placeholder={t('register.selectLetterPlaceholder')}
                  value={firstLetter}
                  onChange={(value) => {
                    setFirstLetter(value);
                    const registerValue = [value, secondLetter, numbers].join(
                      ''
                    );
                    form.setFieldValue('register', registerValue);
                  }}
                  size="large"
                  className="letter-select"
                  getPopupContainer={(triggerNode) =>
                    triggerNode.parentNode || document.body
                  }
                >
                  <Select.Option value="">
                    {t('register.allLetters')}
                  </Select.Option>
                  {MONGOLIAN_ALPHABET.map((letter) => (
                    <Select.Option key={letter} value={letter}>
                      {letter}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </Col>

            <Col xs={12} sm={8} md={6}>
              <div className="letter-input-container">
                <Text className="letter-label">
                  {t('register.secondLetter')}
                </Text>
                <Select
                  allowClear
                  placeholder={t('register.selectLetterPlaceholder')}
                  value={secondLetter}
                  onChange={(value) => {
                    setSecondLetter(value);
                    const registerValue = [firstLetter, value, numbers].join(
                      ''
                    );
                    form.setFieldValue('register', registerValue);
                  }}
                  size="large"
                  className="letter-select"
                  getPopupContainer={(triggerNode) =>
                    triggerNode.parentNode || document.body
                  }
                >
                  <Select.Option value="">
                    {t('register.allLetters')}
                  </Select.Option>
                  {MONGOLIAN_ALPHABET.map((letter) => (
                    <Select.Option key={letter} value={letter}>
                      {letter}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </Col>

            <Col xs={24} sm={8} md={12}>
              <div className="number-input-container">
                <Text className="number-label">{t('register.digits')}</Text>
                <Form.Item
                  noStyle
                  name={'register'}
                  rules={[
                    {
                      required,
                      message: t('register.enterRegisterNumber'),
                    },
                    ({ setFieldValue }) => ({
                      validator(rule, value) {
                        const fullValue = [
                          firstLetter,
                          secondLetter,
                          numbers,
                        ].join('');
                        if (
                          ((numbers && numbers.length > 0) ||
                            (firstLetter && firstLetter.length > 0) ||
                            (secondLetter && secondLetter.length > 0)) &&
                          !validations.regex.register.test(fullValue)
                        ) {
                          return Promise.reject(
                            t('register.invalidRegisterNumber')
                          );
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <Input type="hidden" />
                </Form.Item>
                <Input
                  value={numbers}
                  maxLength={8}
                  onChange={(e) => {
                    const newNumbers = e.target.value;
                    setNumbers(newNumbers);
                    const registerValue = [
                      firstLetter,
                      secondLetter,
                      newNumbers,
                    ].join('');
                    form.setFieldValue('register', registerValue);
                  }}
                  className="number-input"
                  placeholder={placeholder || t('register.digitsPlaceholder')}
                  size="large"
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Form.Item>
  );
};

export default FormRegisterInput;
