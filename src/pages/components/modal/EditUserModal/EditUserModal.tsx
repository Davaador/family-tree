import { LogoutOutlined } from '@ant-design/icons';
import {
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  Modal,
  notification,
  Radio,
  Row,
  Select,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { authStore } from 'context/auth/store';
import { CustomerModel } from 'context/entities/customer.model';
import { parentService } from 'context/services/parent.service';
import validations from 'context/validations';
import dayjs from 'dayjs';
import {
  CustomFormItem,
  CustomInput,
  SubmitButton,
} from 'pages/components/atomics';
import { renderLastName } from 'pages/private/hooks/useCustomerHook';
import { getUserDetail } from 'pages/private/private.service';
import { AddParentForm, CustomerDetail } from 'pages/public/auth/auth.model';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface EditUserModalProps {
  isShow: boolean;
  handleOk?: () => void;
  toggleModal: Function;
}

const EditUserModal = (props: EditUserModalProps) => {
  const { isShow, toggleModal } = props;
  const { t } = useTranslation();
  const [form] = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [parents, setParents] = useState<CustomerModel.Customer[]>();
  const { setAuthUser, authUser } = authStore();
  const navigate = useNavigate();
  const onFinish = (values: AddParentForm) => {
    setLoading(true);
    const body: AddParentForm = {
      ...values,
      birthDate: dayjs(values.birthDate).format('YYYY-MM-DD'),
    };
    console.log(values, 'body', body);
    parentService
      .addParent(body)
      .then((res: CustomerModel.Customer) => {
        getUserDetail()
          .then((details: CustomerDetail) => {
            if (res.id === details.id) {
              setAuthUser(details);
              form.resetFields();
              notification.success({
                message: 'Амжилттай',
                description: 'Та ургийн мэдээлэл амжилттай нэмэгдлээ.',
              });
              toggleModal();
            }
          })
          .finally(() => setLoading(false));
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onChangeDate = (date: dayjs.Dayjs, dateString: string | string[]) => {
    if (date) {
      form.setFieldValue('age', dayjs().diff(date, 'year'));
    } else {
      form.setFieldValue('age', null);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (isShow) {
      parentService.getParents().then((res) => {
        console.log(res);
        setParents(res);
        setLoading(false);
      });
    }
  }, [isShow]);

  return (
    <Modal
      loading={loading}
      title="test"
      open={isShow}
      footer
      maskClosable={false}
      onCancel={() => navigate('/logout')}
      closeIcon={<LogoutOutlined style={{ fontSize: '16px', color: 'red' }} />}
    >
      <Form
        layout="vertical"
        form={form}
        autoComplete="off"
        onFinish={onFinish}
        initialValues={{
          register: authUser?.register,
          surName: authUser?.surName,
          email: authUser?.email,
        }}
      >
        <CustomFormItem
          name="parentId"
          label="Өөрийн овог"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Өөрийн овгийг сонгоно уу."
            showSearch
            allowClear
            options={(parents || []).map((p) => ({
              value: p.id,
              label: renderLastName(p.lastName, p.firstName),
            }))}
          />
        </CustomFormItem>
        <CustomFormItem
          name="isParent"
          label="Хүүхдийн төрөл"
          rules={[{ required: true }]}
        >
          <Radio.Group>
            <Radio value={0}>Төрсөн хүүхэд</Radio>
            <Radio value={1}>Хүргэн</Radio>
            <Radio value={2}>Бэр</Radio>
          </Radio.Group>
        </CustomFormItem>
        <CustomFormItem
          name="surName"
          label="Ургийн овог"
          rules={[{ required: true }]}
        >
          <CustomInput placeholder="Ургийн овог" />
        </CustomFormItem>
        <CustomFormItem
          name="email"
          label="И-Мэйл"
          rules={[
            { required: true, message: 'email oruulna uu' },
            () => ({
              validator(rule, value) {
                if (validations.email.test(value)) {
                  return Promise.resolve();
                } else {
                  return Promise.reject('email hayg zuv oruulna uu.');
                }
              },
            }),
          ]}
        >
          <CustomInput placeholder="И-Мэйл" />
        </CustomFormItem>
        <Row gutter={8}>
          <Col span={12}>
            <CustomFormItem
              label={t('profile.birthDate')}
              required
              rules={[{ required: true, message: 'төрсөн өдрөө сонгон уу.' }]}
              name="birthDate"
            >
              <DatePicker format={'YYYY-MM-DD'} onChange={onChangeDate} />
            </CustomFormItem>
          </Col>
          <Col span={6} xs={8} xxl={6} md={6}>
            <CustomFormItem label="Нас" required name="age">
              <Input placeholder="Нас" disabled />
            </CustomFormItem>
          </Col>
        </Row>
        <Flex justify="center">
          <SubmitButton
            style={{ alignItems: 'center', justifyContent: 'center' }}
            loading={loading}
          />
        </Flex>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
