import { Flex, Form, Modal, notification } from "antd";
import { authStore } from "context/auth/store";
import { FormInput, SubmitButton } from "pages/components/atomics";
import { editProfileName } from "pages/private/private.service";
import { User } from "pages/public/auth/auth.model";
import React from "react";
import { useTranslation } from "react-i18next";

interface EditNameModalProps {
  isShow: boolean;
  toggleModal: Function;
  handleCancel: () => void;
}

const EditNameModal = (props: EditNameModalProps) => {
  const { isShow, toggleModal, handleCancel } = props;
  const { authUser, setAuthUser } = authStore();
  const { t } = useTranslation();
  const onFinish = (values: User) => {
    if (authUser) {
      const body: User = {
        ...authUser,
        surName: values.surName,
        firstName: values.firstName,
        lastName: values.lastName,
      };
      editProfileName(values).then(() => {
        notification.success({
          message: "Амжилттай",
          description: "Таны мэдээлэл амжилттай өөрчлөгдлөө!",
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
      title={t("modal.editNameTitle")}
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
        <FormInput
          name="surName"
          label={t("register.surName")}
          rules={[{ required: true }]}
          holder={t("register.surName")}
        />
        <FormInput
          name="lastName"
          label={t("register.lastName")}
          rules={[{ required: true }]}
          holder={t("register.lastName")}
        />
        <FormInput
          name="firstName"
          label={t("profile.firstName")}
          rules={[{ required: true }]}
          holder={t("profile.firstName")}
        />
        <Flex
          justify="center"
          children={<SubmitButton text={t("general.save")} size="small" />}
        />
      </Form>
    </Modal>
  );
};

export default EditNameModal;
