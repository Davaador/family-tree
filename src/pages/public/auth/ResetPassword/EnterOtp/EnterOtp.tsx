import { ArrowLeftOutlined } from '@ant-design/icons';
import { Card, Flex, Form, Input, notification, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { CustomFormItem, LanguageButton, SubmitButton } from 'pages/components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { CheckOtpForm } from '../../auth.model';
import { checkOtp } from '../../auth.service';
const { Title } = Typography;

const EnterOtp = () => {
  const { t } = useTranslation();
  const [form] = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const { email } = location.state || {};
  const navigate = useNavigate();

  const onFinish = (values: CheckOtpForm) => {
    const data = {
      ...values,
      email: email,
    };
    setLoading(true);
    checkOtp(data)
      .then((res: string) => {
        notification.success({
          message: 'Амжилттай',
          description: t('reset.success.enterOtpMessage'),
        });

        navigate('/auth/forgot/password', {
          state: { email: email, resetToken: res },
        });
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Card hoverable size='default'>
      <Flex justify='space-between'>
        <ArrowLeftOutlined
          onClick={() => {
            navigate(-1);
          }}
        />
        <Title level={3}>{t('reset.enterOtp')}</Title>
        <LanguageButton />
      </Flex>
      <Form
        layout='vertical'
        autoComplete='off'
        size='large'
        form={form}
        onFinish={onFinish}
      >
        <CustomFormItem
          label={t('reset.enterOtp')}
          name='otp'
          rules={[
            { required: true, message: `${t('reset.enterOtpRequired')}` },
          ]}
        >
          <Input.OTP length={6} type='number' />
        </CustomFormItem>
        <Flex justify='center'>
          <SubmitButton loading={loading} text={t('general.continue')} />
        </Flex>
      </Form>
    </Card>
  );
};

export default EnterOtp;
