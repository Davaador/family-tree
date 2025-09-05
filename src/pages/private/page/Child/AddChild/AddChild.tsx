import { notification } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { Col, Flex, Form, Layout, Row } from 'antd/lib';
import { ChildModel } from 'context/entities/child.model';
import { childService } from 'context/services/child.service';
import {
  CardHeader,
  CustomFormItem,
  CustomInput,
  FormRegisterInput,
  SubmitButton,
} from 'pages/components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AddChild = () => {
  const [form] = useForm();
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = (values: ChildModel.CreateChild) => {
    setLoading(true);
    childService
      .addChild(values)
      .then(() => {
        notification.success({
          message: '',
          description: 'sdss',
        });
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Layout className='layout-transparent'>
      <CardHeader headerTitle='Хүүхэд бүртгэх' onBack={true} />
      <Form
        layout='vertical'
        autoComplete='off'
        size='small'
        form={form}
        requiredMark={false}
        onFinish={onFinish}
      >
        <Flex>
          <Row gutter={[8, 12]}>
            <Col xs={24} sm={12}>
              <CustomFormItem
                layout='vertical'
                label={t('child.surName')}
                name='surName'
                rules={[
                  {
                    required: true,
                    message: `${t('child.enterSurName')}`,
                    min: 2,
                  },
                ]}
              >
                <CustomInput placeholder={t('child.surName')} />
              </CustomFormItem>
            </Col>
            <Col xs={24} sm={12}>
              <CustomFormItem
                layout='vertical'
                label={t('child.lastName')}
                name='lastName'
                rules={[
                  {
                    required: true,
                    message: `${t('register.enterLastName')}`,
                    min: 2,
                  },
                ]}
              >
                <CustomInput placeholder={t('child.lastName')} />
              </CustomFormItem>
            </Col>
            <Col xs={24} sm={12}>
              <CustomFormItem
                layout='vertical'
                label={t('child.firstName')}
                name='firstName'
                rules={[
                  {
                    required: true,
                    message: `${t('child.enterName')}`,
                    min: 2,
                  },
                ]}
              >
                <CustomInput placeholder={t('child.firstName')} />
              </CustomFormItem>
            </Col>
            <Col xs={24} sm={12}>
              <FormRegisterInput form={form} />
            </Col>
            <Col xs={24} className='justify-center flex'>
              <SubmitButton
                className='mt-6'
                size='small'
                text={t('general.registerText')}
                loading={loading}
              />
            </Col>
          </Row>
        </Flex>
      </Form>
    </Layout>
  );
};

export default AddChild;
