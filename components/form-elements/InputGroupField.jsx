import React from 'react';
import { Input } from 'antd';
import FormItem from './FormItem';

function InputGroupField({ label, style, children, required, ...otherProps }) {
  return (
    <FormItem
      label={label}
      style={style || { marginBottom: 0 }}
      required={required}
      {...otherProps}
    >
      <Input.Group compact>{children}</Input.Group>
    </FormItem>
  );
}

export default InputGroupField;
