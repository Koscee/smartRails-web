import { Select } from 'antd';
import React from 'react';
import FormItem from './FormItem';

function SelectInputField({
  label,
  name,
  placeholder,
  mode,
  fieldTooltip,
  labelHasColon,
  rules,
  showSearch,
  filterOption,
  children,
  otherProps,
}) {
  return (
    <FormItem
      label={label}
      name={name}
      tooltip={fieldTooltip}
      colon={labelHasColon}
      rules={rules}
    >
      <Select
        mode={mode}
        placeholder={placeholder}
        showSearch={showSearch}
        filterOption={filterOption}
        {...otherProps}
      >
        {children}
      </Select>
    </FormItem>
  );
}

export default SelectInputField;
