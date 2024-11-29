import { Flex, Form, Modal, notification } from 'antd';
import { authStore } from 'context/auth/store';
import {
  CustomFormItem,
  CustomInput,
  FormInput,
  SubmitButton,
} from 'pages/components/atomics';
import { editProfileName } from 'pages/private/private.service';
import { CustomerDetail } from 'pages/public/auth/auth.model';
import { useTranslation } from 'react-i18next';

interface EditNameModalProps {
  isShow: boolean;
  toggleModal: Function;
  handleCancel: () => void;
}

const EditNameModal = (props: EditNameModalProps) => {
  const { isShow, toggleModal, handleCancel } = props;
  const { authUser, setAuthUser } = authStore();
  const { t } = useTranslation();
  const onFinish = (values: CustomerDetail) => {
    if (authUser) {
      const body: CustomerDetail = {
        ...authUser,
        surName: values.surName,
        firstName: values.firstName,
        lastName: values.lastName,
      };
      editProfileName(values).then(() => {
        notification.success({
          message: 'Амжилттай',
          description: 'Таны мэдээлэл амжилттай өөрчлөгдлөө!',
        });
        setAuthUser(body);
        toggleModal();
        return;
      });
    }
    toggleModal();
  };
  return (
    <Modal
      title={t('modal.editNameTitle')}
      open={isShow}
      onCancel={handleCancel}
      footer
    >
      <Form
        layout="vertical"
        autoComplete="off"
        initialValues={{ ...authUser }}
        onFinish={onFinish}
      >
        <CustomFormItem
          name="surName"
          label={t('register.surName')}
          rules={[{ required: true }]}
        >
          <CustomInput placeholder={t('register.surName')} />
        </CustomFormItem>
        <CustomFormItem
          name="lastName"
          label={t('register.lastName')}
          rules={[{ required: true }]}
        >
          <CustomInput placeholder={t('register.lastName')} />
        </CustomFormItem>
        <CustomFormItem
          name="firstName"
          label={t('profile.firstName')}
          rules={[{ required: true }]}
        >
          <CustomInput placeholder={t('register.firstName')} />
        </CustomFormItem>
        <Flex
          justify="center"
          children={<SubmitButton text={t('general.save')} size="small" />}
        />
      </Form>
    </Modal>
  );
};

export default EditNameModal;
