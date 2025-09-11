import { Col, Form, FormInstance, Input, Row, Select, Typography } from 'antd';
import validations from 'context/validations';
import { RegisterType } from 'pages/public/auth/auth.model';
import { useEffect, useState } from 'react';
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
    required = true,
    layout = 'vertical',
    className = '',
    placeholder,
  } = props;

  const [numbers, setNumbers] = useState<string | undefined>(
    defaultValue?.substring(2, 10)
  );
  const [firstLetter, setFirstLetter] = useState<string>();
  const [secondLetter, setSecondLetter] = useState<string>();
  const { t } = useTranslation();

  useEffect(() => {
    if (defaultValue) {
      const first = defaultValue.charAt(0);
      const second = defaultValue.charAt(1);
      const nums = defaultValue.substring(2, 10);
      setFirstLetter(first);
      setSecondLetter(second);
      setNumbers(nums);
    }
  }, [defaultValue]);

  return (
    <Form.Item<RegisterType>
      required={required}
      layout={layout}
      className={className}
    >
      <div className='register-number-container'>
        <Row gutter={[8, 12]} className='w-full'>
          {/* First Letter */}
          <Col xs={24} sm={11} md={11} lg={11}>
            <div className='letter-input-container'>
              <Text className='letter-label text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 block'>
                {t('register.firstLetter')}
              </Text>
              <Select
                showSearch
                allowClear
                placeholder={t('register.selectLetterPlaceholder')}
                value={firstLetter}
                onChange={value => {
                  setFirstLetter(value);
                  const registerValue = [value, secondLetter, numbers].join('');
                  form.setFieldValue('register', registerValue);
                }}
                size='large'
                className='letter-select w-full'
                dropdownMatchSelectWidth={false}
                getPopupContainer={triggerNode =>
                  triggerNode.parentNode || document.body
                }
              >
                {MONGOLIAN_ALPHABET.map(letter => (
                  <Select.Option key={letter} value={letter}>
                    {letter}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </Col>

          {/* Second Letter */}
          <Col xs={24} sm={11} md={11} lg={11}>
            <div className='letter-input-container'>
              <Text className='letter-label text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 block'>
                {t('register.secondLetter')}
              </Text>
              <Select
                showSearch
                allowClear
                placeholder={t('register.selectLetterPlaceholder')}
                value={secondLetter}
                onChange={value => {
                  setSecondLetter(value);
                  const registerValue = [firstLetter, value, numbers].join('');
                  form.setFieldValue('register', registerValue);
                }}
                size='large'
                className='letter-select w-full'
                dropdownMatchSelectWidth={false}
                getPopupContainer={triggerNode =>
                  triggerNode.parentNode || document.body
                }
              >
                {MONGOLIAN_ALPHABET.map(letter => (
                  <Select.Option key={letter} value={letter}>
                    {letter}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </Col>

          {/* Numbers */}
          <Col xs={24}>
            <div className='number-input-container'>
              <Text className='number-label text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 block'>
                {t('register.digits')}
              </Text>
              <Form.Item
                noStyle
                name={'register'}
                rules={[
                  {
                    required,
                    message: t('register.enterRegisterNumber'),
                  },
                  ({ setFieldValue: _setFieldValue }) => ({
                    validator(_rule, _value) {
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
                <Input type='hidden' />
              </Form.Item>
              <Input
                value={numbers}
                maxLength={8}
                onChange={e => {
                  const newNumbers = e.target.value;
                  setNumbers(newNumbers);
                  const registerValue = [
                    firstLetter,
                    secondLetter,
                    newNumbers,
                  ].join('');
                  form.setFieldValue('register', registerValue);
                }}
                className='number-input w-full'
                placeholder={placeholder || t('register.digitsPlaceholder')}
                size='large'
              />
            </div>
          </Col>
        </Row>
      </div>
    </Form.Item>
  );
};

export default FormRegisterInput;
