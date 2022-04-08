import { Input } from 'antd';
import React from 'react';
import FormItem from './FormItem';

function InputField({
  name,
  label,
  width,
  rules,
  type,
  placeholder,
  otherProps,
}) {
  return (
    <FormItem
      label={label}
      name={name}
      width={width}
      rules={rules}
      {...otherProps}
    >
      <Input placeholder={placeholder} type={type} />
    </FormItem>
  );
}

export default InputField;
