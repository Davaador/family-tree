import {
  CalendarOutlined,
  CrownOutlined,
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Form,
  Modal,
  notification,
  Tag,
  Typography,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { authStore } from 'context/auth/store';
import { RolesConstants } from 'context/constants/auth.constants';
import dayjs from 'dayjs';
import { EditNameModal, EditPhoneForm, SubmitButton } from 'pages/components';
import AddRoleUserModal from 'pages/components/modal/AddRoleUserModal/AddRoleUserModal';
import { CustomerDetail } from 'pages/public/auth/auth.model';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { editProfile, getUserDetail } from '../../private.service';

const { confirm } = Modal;
const { Title, Text } = Typography;

const Profile = () => {
  const { authUser, setAuthUser, roleUser } = authStore();
  const { t } = useTranslation();
  const [form] = useForm();
  const [isShowModal, setiIshowModal] = useState<boolean>(false);
  const [isShowAddUserModal, setIshowAddUserModal] = useState<boolean>(false);

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

  useEffect(() => {
    console.log(authUser, 'sss auth');
  }, [authUser]);

  const isRootUser = roleUser?.find(
    (role) => role.name === RolesConstants.ROOT
  );
  const userAge = authUser?.birthDate
    ? dayjs().diff(dayjs(authUser.birthDate), 'year')
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="text-center mb-6">
          <Title
            level={2}
            className="!mb-2 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
          >
            {t('profile.title')}
          </Title>
          <Text type="secondary" className="text-lg">
            {t('profile.subtitle')}
          </Text>
        </div>
      </div>

      {/* Main Profile Card */}
      <div className="max-w-4xl mx-auto">
        <Card
          className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl rounded-3xl overflow-hidden"
          bodyStyle={{ padding: 0 }}
        >
          {/* Profile Header */}
          <div className="relative bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-8 text-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                <Badge.Ribbon
                  text={isRootUser ? 'ROOT' : 'USER'}
                  color={isRootUser ? 'gold' : 'blue'}
                  className="!top-0"
                >
                  <div className="relative">
                    <Avatar
                      size={80}
                      src={authUser?.profileImage?.url}
                      icon={<UserOutlined />}
                      className="border-4 border-white/30 shadow-xl md:w-[120px] md:h-[120px]"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                </Badge.Ribbon>

                <div className="space-y-2 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start space-x-3">
                    <Title level={3} className="!mb-0 !text-white">
                      {authUser?.lastName} {authUser?.firstName}
                    </Title>
                    {isRootUser && (
                      <CrownOutlined className="text-yellow-300 text-xl" />
                    )}
                  </div>
                  <Text className="text-white text-lg font-medium drop-shadow-lg">
                    {authUser?.surName}
                  </Text>
                  <div className="flex items-center justify-center md:justify-start space-x-4">
                    <Tag className="bg-emerald-600 text-white font-medium border-emerald-600">
                      {userAge} {t('profile.age')}
                    </Tag>
                    <Tag className="bg-emerald-600 text-white font-medium border-emerald-600">
                      {authUser?.register}
                    </Tag>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center md:justify-end space-x-3 space-y-2 md:space-y-0">
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  className="text-white hover:bg-white/20 border-white/30 text-sm md:text-base"
                  onClick={() => setiIshowModal(!isShowModal)}
                >
                  {t('profile.edit')}
                </Button>
                {isRootUser && (
                  <Button
                    type="text"
                    icon={<TeamOutlined />}
                    className="text-white hover:bg-white/20 border-white/30 text-sm md:text-base"
                    onClick={() => setIshowAddUserModal(!isShowAddUserModal)}
                  >
                    {t('profile.add.role')}
                  </Button>
                )}
                <Button
                  type="text"
                  icon={<TeamOutlined />}
                  className="text-white hover:bg-white/20 border-white/30 text-sm md:text-base"
                  onClick={() => navigate('/add/family')}
                >
                  {t('profile.addFamily')}
                </Button>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <Title level={4} className="!mb-4 flex items-center space-x-2">
                  <UserOutlined className="text-emerald-500" />
                  <span>{t('profile.personalInfo')}</span>
                </Title>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                    <CalendarOutlined className="text-emerald-500 text-lg" />
                    <div>
                      <Text type="secondary" className="text-sm">
                        {t('profile.birthDateLabel')}
                      </Text>
                      <div className="font-medium">
                        {authUser?.birthDate
                          ? dayjs(authUser.birthDate).format('YYYY-MM-DD')
                          : 'Тодорхойгүй'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                    <PhoneOutlined className="text-emerald-500 text-lg" />
                    <div>
                      <Text type="secondary" className="text-sm">
                        {t('profile.phoneNumber')}
                      </Text>
                      <div className="font-medium">{authUser?.phoneNumber}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                    <MailOutlined className="text-emerald-500 text-lg" />
                    <div>
                      <Text type="secondary" className="text-sm">
                        {t('profile.email')}
                      </Text>
                      <div className="font-medium">
                        {authUser?.email || 'Тодорхойгүй'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="space-y-6">
                <Title level={4} className="!mb-4 flex items-center space-x-2">
                  <PhoneOutlined className="text-emerald-500" />
                  <span>{t('profile.contactInfo')}</span>
                </Title>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-100">
                  <Form
                    form={form}
                    initialValues={{
                      ...authUser,
                      birthDate: authUser?.birthDate
                        ? dayjs(authUser?.birthDate)
                        : dayjs(),
                    }}
                    layout="vertical"
                    onFinish={onFinish}
                  >
                    <EditPhoneForm form={form} />
                    <div className="mt-6">
                      <SubmitButton
                        className="w-full h-12 text-base font-medium bg-gradient-to-r from-emerald-500 to-teal-500 border-0 hover:from-emerald-600 hover:to-teal-600"
                        size="large"
                      />
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Modals */}
      <EditNameModal
        isShow={isShowModal}
        toggleModal={setModalInvisible}
        handleCancel={() => setiIshowModal(false)}
      />
      <AddRoleUserModal
        isShow={isShowAddUserModal}
        toggleModal={setIshowAddUserModal}
        handleCancel={() => {
          setIshowAddUserModal(!isShowAddUserModal);
        }}
      />
    </div>
  );
};

export default Profile;
