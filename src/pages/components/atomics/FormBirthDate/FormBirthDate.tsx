import { Form, DatePicker, FormItemProps } from "antd";
import React from "react";

interface FormBirthDateProps extends FormItemProps {
  format: string;
}

const FormBirthDate = (props: FormBirthDateProps) => {
  return (
    <Form.Item
      required
      rules={[{ required: true, message: "төрсөн өдрөө сонгон уу." }]}
      {...props}
    >
      <DatePicker format={props.format} />
    </Form.Item>
  );
};

export default FormBirthDate;
