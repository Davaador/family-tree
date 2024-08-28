import {
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  Modal,
  notification,
  Row,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { authStore } from "context/auth/store";
import validations from "context/validations";
import dayjs from "dayjs";
import { FormInput, SubmitButton } from "pages/components/atomics";
import { editUser, getUserDetail } from "pages/private/private.service";
import { EditUserForm, User } from "pages/public/auth/auth.model";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface EditUserModalProps {
  isShow: boolean;
  handleOk?: () => void;
  handleCancel?: () => void;
  toggleModal: Function;
}

const EditUserModal = (props: EditUserModalProps) => {
  const { isShow, handleCancel, toggleModal } = props;
  const { t } = useTranslation();
  const [form] = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuthUser, authUser } = authStore();
  const onFinish = (values: EditUserForm) => {
    const body: EditUserForm = {
      ...values,
      birthDate: dayjs(values.birthDate).format("YYYY-MM-DD"),
    };

    setLoading(true);
    editUser(body)
      .then(() => {
        getUserDetail()
          .then((res: User) => {
            setAuthUser(res);
            form.resetFields();
            notification.success({
              message: "Амжилттай",
              description: "Таны мэдээлэл амжилттай өөрчлөгдлөө!",
            });
            toggleModal();
          })
          .finally(() => setLoading(false));
      })
      .catch(() => {
        setLoading(false);
        notification.error({
          message: "Амжилтгүй",
          description: "Таны мэдээллийг шинэчлэхэд алдаа гарлаа.",
        });
      });
  };

  const onChangeDate = (date: dayjs.Dayjs, dateString: string | string[]) => {
    if (date) {
      form.setFieldValue("age", dayjs().diff(date, "year"));
    } else {
      form.setFieldValue("age", null);
    }
  };
  return (
    <Modal title="test" open={isShow} onCancel={handleCancel} footer>
      <Form
        layout="vertical"
        form={form}
        autoComplete="off"
        onFinish={onFinish}
        initialValues={{
          register: authUser?.register,
          surName: authUser?.surName,
          email: authUser?.email,
          birthDate: authUser?.birthDate ? dayjs(authUser?.birthDate) : dayjs(),
        }}
      >
        <FormInput
          name="surName"
          label="Ургийн овог"
          rules={[{ required: true }]}
          holder="Ургийн овог"
        />
        <FormInput
          name="email"
          label="И-Мэйл"
          rules={[
            { required: true, message: "email oruulna uu" },
            ({ setFields }) => ({
              validator(rule, value) {
                if (validations.email.test(value)) {
                  return Promise.resolve();
                } else {
                  return Promise.reject("email hayg zuv oruulna uu.");
                }
              },
            }),
          ]}
          holder="И-Мэйл"
        />
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              label={t("profile.birthDate")}
              required
              rules={[{ required: true, message: "төрсөн өдрөө сонгон уу." }]}
              name="birthDate"
            >
              <DatePicker format={"YYYY-MM-DD"} onChange={onChangeDate} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Нас" required name="age">
              <Input placeholder="Нас" disabled />
            </Form.Item>
          </Col>
        </Row>
        <Flex justify="center">
          <SubmitButton
            style={{ alignItems: "center", justifyContent: "center" }}
            loading={loading}
          />
        </Flex>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
