import { Input } from 'antd';
import React from 'react';
import FormItem from './FormItem';

function PasswordField({
  name,
  label,
  width,
  rules,
  placeholder,
  prefix,
  onChange,
  ...otherProps
}) {
  return (
    <FormItem
      label={label}
      name={name}
      width={width}
      rules={rules}
      {...otherProps}
    >
      <Input.Password
        placeholder={placeholder}
        prefix={prefix}
        onChange={onChange}
      />
    </FormItem>
  );
}

export default PasswordField;
