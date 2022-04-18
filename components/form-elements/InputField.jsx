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
  prefix,
  suffix,
  onChange,
  ...otherProps
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
      <Input
        placeholder={placeholder}
        type={type}
        prefix={prefix}
        suffix={suffix}
        onChange={onChange}
      />
    </FormItem>
  );
}

export default InputField;
