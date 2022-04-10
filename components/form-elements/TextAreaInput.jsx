import { Input } from 'antd';
import React from 'react';
import FormItem from './FormItem';

function TextAreaInput({
  name,
  label,
  fieldTooltip,
  rules,
  placeholder,
  otherProps,
}) {
  return (
    <FormItem
      label={label}
      name={name}
      tooltip={fieldTooltip}
      rules={rules}
      {...otherProps}
    >
      <Input.TextArea placeholder={placeholder} />
    </FormItem>
  );
}

export default TextAreaInput;
