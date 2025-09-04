import { Col, Form } from 'antd';
import React from 'react';

interface FormFieldProps {
  name: string;
  label: React.ReactNode;
  rules?: any[];
  children: React.ReactNode;
  [key: string]: any;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  rules,
  children,
  ...props
}) => (
  <Col xs={24} md={12}>
    <Form.Item name={name} label={label} rules={rules} {...props}>
      {children}
    </Form.Item>
  </Col>
);

export default FormField;
