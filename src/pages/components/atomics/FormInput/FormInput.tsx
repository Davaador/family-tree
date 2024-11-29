import { Form, FormItemProps } from 'antd';
export interface FormInputProps extends FormItemProps {
  holder?: string;
}

const FormInput = (props: FormInputProps) => {
  return (
    <Form.Item {...props} />
    //   <Input
    //     placeholder={placeHolder || holder}
    //     autoComplete="off"
    //     autoCapitalize=""
    //   />
    // </Form.Item>
  );
};

export default FormInput;
