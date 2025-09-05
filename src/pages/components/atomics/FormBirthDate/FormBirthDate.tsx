import { Form, DatePicker, FormItemProps } from 'antd';

interface FormBirthDateProps extends FormItemProps {
  format: string;
}

const FormBirthDate = (props: FormBirthDateProps) => {
  return (
    <Form.Item
      required
      rules={[{ required: true, message: 'төрсөн өдрөө сонгон уу.' }]}
      {...props}
    >
      <DatePicker format={props.format} />
    </Form.Item>
  );
};

export default FormBirthDate;
