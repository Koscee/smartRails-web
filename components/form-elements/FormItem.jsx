import React from 'react';
import { Form } from 'antd';

function FormItem({
  width,
  label,
  name,
  rules,
  tooltip,
  colon,
  required,
  style,
  children,
  otherProps,
}) {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      tooltip={tooltip}
      colon={colon}
      required={rules || required}
      style={{ width, ...style }}
      {...otherProps}
    >
      {children}
    </Form.Item>
  );
}

export default FormItem;
