import {
  Button,
  Col,
  Form,
  Layout,
  notification,
  Row,
  Select,
  Spin,
  Typography,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { CustomerModel } from 'context/entities/customer.model';
import { createCouple } from 'context/services/customer.service';
import { CardHeader } from 'pages/components';
import { AddFamilyProps } from 'pages/private/private.model';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';

const AddFamily = () => {
  const { selectData, coupleData } = useLoaderData() as AddFamilyProps;
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [couple, setCouple] = useState<CustomerModel.Customer>(
    coupleData.husband || coupleData.wife
  );
  const [form] = useForm();

  const onSubmit = (values: CustomerModel.CoupleCustomer) => {
    setLoading(true);
    createCouple(values)
      .then((res) => {
        if (res) {
          if (res.gender.includes('0')) {
            setCouple(res.wife);
          } else {
            setCouple(res.husband);
          }
        }
        form.resetFields();
        notification.success({
          message: 'Амжилттай',
          description:
            'Таны гэр бүлийн гишүүний мэдээллийг амжилттай бүртгэлээ.!',
        });
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading)
    return (
      <Layout
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Spin />
      </Layout>
    );
  return (
    <Layout className="layout-transparent">
      <CardHeader headerTitle={t('family.header')} onBack={true} />
      {couple && (
        <Row>
          <Col>
            <Typography.Title level={5}>
              Таны {couple.gender.includes('1') ? 'эхнэр' : 'нөхөр'}:&nbsp;
              {couple.lastName.charAt(0).concat('. ').concat(couple.firstName)}
            </Typography.Title>
          </Col>
        </Row>
      )}
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{
            alignItems: 'center',
          }}
        >
          <Col className="gutter-row" xs={24} sm={24} md={12}>
            <Form.Item
              label="Гэр бүлийн гишүүнээ сонгоно уу?"
              name={'coupleId'}
            >
              <Select
                placeholder="Гэр бүлийн гишүүнээ сонгоно уу"
                showSearch
                allowClear
                options={selectData.map((item) => ({
                  value: item.id,
                  label: item.lastName
                    .charAt(0)
                    .concat('. ')
                    .concat(item.firstName),
                }))}
              ></Select>
            </Form.Item>
          </Col>
          <Col className="gutter-row" xs={24} sm={24} md={12}>
            <Button type="primary" htmlType="submit" size="small">
              <Typography.Text>Хадгалах</Typography.Text>
            </Button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default AddFamily;
