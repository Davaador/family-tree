import { EditOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Flex,
  Form,
  Modal,
  notification,
  Row,
  Typography,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { authStore } from 'context/auth/store';
import dayjs from 'dayjs';
import {
  CustomImage,
  EditNameModal,
  EditPhoneForm,
  SubmitButton,
} from 'pages/components';
import { CustomerDetail } from 'pages/public/auth/auth.model';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { editProfile, getUserDetail } from '../../private.service';
const { confirm } = Modal;
const Profile = () => {
  const { authUser, setAuthUser } = authStore();
  const { t } = useTranslation();
  const [form] = useForm();
  const [isShowModal, setiIshowModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const onFinish = (values: CustomerDetail) => {
    const body: CustomerDetail = {
      ...values,
      birthDate: dayjs(values.birthDate).format('YYYY-MM-DD'),
    };
    confirm({
      title: t('profile.editInfo'),
      content: t('profile.editModalContent'),
      onOk() {
        editProfile(body).then(() => {
          getUserDetail().then((res: CustomerDetail) => {
            setAuthUser(res);
            notification.success({
              message: 'Амжилттай',
              description: 'Таны мэдээлэл амжилттай өөрчлөгдлөө!',
            });
          });
        });
      },
      okType: 'primary',
      okText: t('general.ok'),
      cancelText: t('general.cancel'),
    });
  };
  const setModalInvisible = () => {
    setiIshowModal(false);
  };
  console.log(authUser, 'sss');

  return (
    <Card size="default" style={{ background: '#fff' }}>
      <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Flex align="center">
          <CustomImage
            style={{ borderRadius: 40 }}
            preview={true}
            width={80}
            height={80}
            src={authUser?.profilePicture?.url}
          />
          <Flex vertical className="ml-20">
            <Typography.Text>{authUser?.surName}</Typography.Text>
            <Typography.Text strong>
              {authUser?.lastName} {authUser?.firstName}
            </Typography.Text>
          </Flex>
          <Button
            className="ml-20 flag-button"
            size="small"
            icon={<EditOutlined />}
            type="link"
            onClick={() => setiIshowModal(!isShowModal)}
          />
        </Flex>
        <Flex>
          <Button
            onClick={() => {
              navigate('/add/family');
            }}
          >
            Гэр бүл бүртгэх
          </Button>
        </Flex>
      </Row>
      <Flex
        className="mt-20"
        children={
          <Form
            form={form}
            initialValues={{
              ...authUser,
              birthDate: authUser?.birthDate
                ? dayjs(authUser?.birthDate)
                : dayjs(),
            }}
            layout="inline"
            onFinish={onFinish}
          >
            <EditPhoneForm form={form} />
            <SubmitButton className="mt-20" size="small" />
          </Form>
        }
      />
      <EditNameModal
        isShow={isShowModal}
        toggleModal={setModalInvisible}
        handleCancel={() => setiIshowModal(false)}
      />
    </Card>
  );
};

export default Profile;
