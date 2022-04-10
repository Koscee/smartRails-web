import { Input } from 'antd';
import React from 'react';
import FormItem from './FormItem';

function InputField({
  name,
  label,
  width,
  rules,
  fieldTooltip,
  type,
  placeholder,
  suffix,
  otherProps,
}) {
  return (
    <FormItem
      label={label}
      name={name}
      width={width}
      tooltip={fieldTooltip}
      rules={rules}
      {...otherProps}
    >
      <Input placeholder={placeholder} type={type} suffix={suffix} />
    </FormItem>
  );
}

export default InputField;
