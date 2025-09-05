import { Input, InputProps } from 'antd';

interface CustomInputProps extends InputProps {}

const CustomInput: React.FC<CustomInputProps> = ({ ...rest }) => {
  return <Input {...rest} />;
};

export default CustomInput;
