import { Input, InputProps } from 'antd';
import React from 'react';

interface CustomInputProps extends InputProps {}

const CustomInput: React.FC<CustomInputProps> = ({ ...rest }) => {
  return <Input {...rest} />;
};

export default CustomInput;
