import { Col, Form, Layout, notification, Row, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { CustomerModel } from 'context/entities/customer.model';
import { createBiography } from 'context/services/cutomer.service';
import { CardHeader, CustomFormItem, SubmitButton } from 'pages/components';
import { BiographyProps } from 'pages/private/private.model';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const { TextArea } = Input;

const EditBiography = () => {
  const [form] = useForm();
  const { biographyData } = useLoaderData() as BiographyProps;
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = (values: CustomerModel.BiographyCustomer) => {
    console.log(values);
    setLoading(true);
    createBiography(values)
      .then((res) => {
        if (res) {
          notification.success({
            message: 'Амжилттай.',
            description: 'Таны намтарыг амжилттай бүртгэлээ.!',
          });
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Layout className="layout-transparent">
      <CardHeader headerTitle="Өөрийн намтар бүртгэх" />
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={{
          detailBiography: biographyData ? biographyData.detailBiography : '',
        }}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
          <Col span={24}>
            <CustomFormItem
              name={'detailBiography'}
              label="Намтар"
              rules={[
                { required: true, message: 'Намтараа заавал оруулна уу.' },
              ]}
            >
              <TextArea
                placeholder="Намтараа заавал оруулна уу."
                autoSize={{ minRows: 4, maxRows: 12 }}
              />
            </CustomFormItem>
          </Col>
          <Col span={24}>
            <SubmitButton loading={loading} />
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default EditBiography;
