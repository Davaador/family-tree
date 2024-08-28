import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Flex,
  Form,
  Image,
  Modal,
  notification,
  Typography,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { authStore } from "context/auth/store";
import dayjs from "dayjs";
import { EditNameModal, EditPhoneForm, SubmitButton } from "pages/components";
import { User } from "pages/public/auth/auth.model";
import { useTranslation } from "react-i18next";
import { editProfile, getUserDetail } from "../private.service";
import { useState } from "react";
const { confirm } = Modal;
const Profile = () => {
  const { authUser, setAuthUser } = authStore();
  const { t } = useTranslation();
  const [form] = useForm();
  const [isShowModal, setiIshowModal] = useState<boolean>(false);
  const onFinish = (values: User) => {
    const body: User = {
      ...values,
      birthDate: dayjs(values.birthDate).format("YYYY-MM-DD"),
    };
    confirm({
      title: t("profile.editInfo"),
      content: t("profile.editModalContent"),
      onOk() {
        editProfile(body).then(() => {
          getUserDetail().then((res: User) => {
            setAuthUser(res);
            notification.success({
              message: "Амжилттай",
              description: "Таны мэдээлэл амжилттай өөрчлөгдлөө!",
            });
          });
        });
      },
      okType: "primary",
      okText: t("general.ok"),
      cancelText: t("general.cancel"),
    });
  };
  const setModalInvisible = () => {
    setiIshowModal(false);
  };
  return (
    <Card size="default" style={{ background: "transparent" }}>
      <Flex justify="space-between" align="center">
        <Flex align="center">
          <Image
            style={{ borderRadius: 40 }}
            preview={false}
            width={80}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
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
      </Flex>
      <Flex
        className="mt-20"
        children={
          <Form
            form={form}
            initialValues={{
              ...authUser,
              birthDate: dayjs(authUser?.birthDate),
            }}
            layout="inline"
            onFinish={onFinish}
          >
            <EditPhoneForm form={form} />
            <SubmitButton
              className="mt-20"
              text={t("general.save")}
              size="small"
            />
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
