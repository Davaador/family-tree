import { Card, Flex, Form, notification, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import validations from 'context/validations';
import {
  CustomFormItem,
  CustomInput,
  LanguageButton,
  SubmitButton,
} from 'pages/components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SendEmailForm } from '../../auth.model';
import { sendOtp } from '../../auth.service';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
const { Title } = Typography;
const SendOtp = () => {
  const { t } = useTranslation();
  const [form] = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onFinish = (values: SendEmailForm) => {
    setLoading(true);
    sendOtp(values)
      .then(() => {
        notification.success({
          message: 'Амжилттай',
          description: t('reset.success.message'),
        });
        navigate('/auth/enter/otp', { state: { email: values.email } });
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Card hoverable size="default">
      <Flex justify="space-between">
        <ArrowLeftOutlined
          onClick={() => {
            navigate(-1);
          }}
        />
        <Title level={3}>{t('reset.inputEmail')}</Title>
        <LanguageButton />
      </Flex>
      <Form
        layout="vertical"
        size="large"
        requiredMark={false}
        form={form}
        onFinish={onFinish}
      >
        <CustomFormItem
          label={t('reset.enterEmail')}
          name="email"
          rules={[
            { required: true, message: `${t('reset.enterEmailRequired')}` },
            () => ({
              validator(_, value) {
                if (validations.regex.email.test(value)) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(`${t('reset.incorrectEmail')}`);
                }
              },
            }),
          ]}
        >
          <CustomInput placeholder={t('reset.enterEmail')} />
        </CustomFormItem>
        <Flex justify="center">
          <SubmitButton loading={loading} text={t('general.continue')} />
        </Flex>
      </Form>
    </Card>
  );
};

export default SendOtp;
