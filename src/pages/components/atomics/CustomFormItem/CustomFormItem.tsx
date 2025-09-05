import { Form, FormItemProps } from 'antd';

interface CustomFormItemProps extends FormItemProps {}

const CustomFormItem: React.FC<CustomFormItemProps> = ({ ...rest }) => {
  return <Form.Item {...rest} />;
};

export default CustomFormItem;
