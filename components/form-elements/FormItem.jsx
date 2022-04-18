import React from 'react';
import { Form } from 'antd';

function FormItem({
  label,
  name,
  width,
  rules,
  style,
  children,
  ...otherProps
}) {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      style={{ width, ...style }}
      {...otherProps}
    >
      {children}
    </Form.Item>
  );
}

export default FormItem;
