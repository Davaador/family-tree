import { Flex, Form, Modal, notification } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { AddRoleRequest } from 'context/entities/auth.model';
import {
  CustomFormItem,
  CustomInput,
  SubmitButton,
} from 'pages/components/atomics';
import { addRoleUser } from 'pages/private/private.service';
import { useTranslation } from 'react-i18next';

interface AddRoleUserModalProps {
  isShow: boolean;
  toggleModal: Function;
  handleCancel: () => void;
}

const AddRoleUserModal = (props: AddRoleUserModalProps) => {
  const { isShow, toggleModal, handleCancel } = props;
  const { t } = useTranslation();
  const [form] = useForm();

  const onFinish = async (values: AddRoleRequest) => {
    await addRoleUser(values).then((res: AddRoleRequest) => {
      if (res.id) {
        notification.success({
          message: 'Амжилттай',
          description: 'Таны мэдээлэл амжилттай өөрчлөгдлөө!',
        });
        form.resetFields();
        toggleModal();
        return;
      } else {
        toggleModal();
        return;
      }
    });
    toggleModal();
  };

  return (
    <Modal
      title={t('modal.addUser')}
      open={isShow}
      footer
      onCancel={handleCancel}
    >
      <Form
        form={form}
        layout='vertical'
        autoComplete='off'
        onFinish={onFinish}
      >
        <CustomFormItem
          rules={[{ required: true }]}
          name='phoneNumber'
          label={t('modal.add.userPhone')}
        >
          <CustomInput placeholder={t('modal.add.enterPhoneNumber')} />
        </CustomFormItem>
        <CustomFormItem
          rules={[{ required: true }]}
          name='roleName'
          label={t('modal.add.roleName')}
        >
          <CustomInput placeholder={t('modal.add.enterroleName')} />
        </CustomFormItem>
        <Flex
          justify='center'
          children={<SubmitButton text={t('general.save')} size='small' />}
        />
      </Form>
    </Modal>
  );
};

export default AddRoleUserModal;
