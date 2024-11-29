import { Form, FormItemProps } from 'antd';
import React from 'react';

interface CustomFormItemProps extends FormItemProps {}

const CustomFormItem: React.FC<CustomFormItemProps> = ({ ...rest }) => {
  return <Form.Item {...rest} />;
};

export default CustomFormItem;
