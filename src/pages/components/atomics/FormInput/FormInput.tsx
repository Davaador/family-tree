import { Form, FormItemProps, Input } from "antd";
export interface FormInputProps extends FormItemProps {
  placeHolder?: string;
  holder?: string;
}

const FormInput = (props: FormInputProps) => {
  const { placeHolder, holder } = props;
  return (
    <Form.Item {...props}>
      <Input
        placeholder={placeHolder || holder}
        autoComplete="off"
        autoCapitalize=""
      />
    </Form.Item>
  );
};

export default FormInput;
