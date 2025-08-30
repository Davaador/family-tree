import { Col, Form, FormInstance, Input, Row, Select } from 'antd';
import { IdcardOutlined } from '@ant-design/icons';
import validations from 'context/validations';
import { RegisterType } from 'pages/public/auth/auth.model';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
      <Row gutter={8}>
        <Col span={6}>
          <Select
            placeholder="Үсэг сонгох"
            value={firstLetter}
            onChange={(value) => {
              console.log('First letter changed:', value);
              setFirstLetter(value);
              const registerValue = [value, secondLetter, numbers].join('');
              form.setFieldValue('register', registerValue);
            }}
            style={{ width: '100%' }}
            size="large"
          >
            <Select.Option value="">Бүгд</Select.Option>
            {MONGOLIAN_ALPHABET.map((letter) => (
              <Select.Option key={letter} value={letter}>
                {letter}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={6}>
          <Select
            placeholder="Үсэг сонгох"
            value={secondLetter}
            onChange={(value) => {
              console.log('Second letter changed:', value);
              setSecondLetter(value);
              const registerValue = [firstLetter, value, numbers].join('');
              form.setFieldValue('register', registerValue);
            }}
            style={{ width: '100%' }}
            size="large"
          >
            <Select.Option value="">Бүгд</Select.Option>
            {MONGOLIAN_ALPHABET.map((letter) => (
              <Select.Option key={letter} value={letter}>
                {letter}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={12}>
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
                  const fullValue = [firstLetter, secondLetter, numbers].join(
                    ''
                  );

                  if (
                    ((numbers && numbers.length > 0) ||
                      (firstLetter && firstLetter.length > 0) ||
                      (secondLetter && secondLetter.length > 0)) &&
                    !validations.regex.register.test(fullValue)
                  ) {
                    return Promise.reject(t('register.invalidRegisterNumber'));
                  }

                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input type="hidden" />
          </Form.Item>
          <Form.Item noStyle>
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
              className="rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-blue-500"
              placeholder={placeholder || '8 орон'}
              size="large"
            />
          </Form.Item>
        </Col>
      </Row>
    </Form.Item>
  );
};

export default FormRegisterInput;
