import { Select } from 'antd';
import React from 'react';
import FormItem from './FormItem';

function SelectInputField({
  label,
  name,
  placeholder,
  className,
  fieldTooltip,
  labelHasColon,
  rules,
  showSearch,
  filterOption,
  onChange,
  children,
  itemStyle,
  style,
  ...otherProps
}) {
  return (
    <FormItem
      label={label}
      name={name}
      className={className}
      tooltip={fieldTooltip}
      colon={labelHasColon}
      rules={rules}
      style={itemStyle}
    >
      <Select
        placeholder={placeholder}
        showSearch={showSearch}
        filterOption={filterOption}
        onChange={onChange}
        style={style}
        {...otherProps}
      >
        {children}
      </Select>
    </FormItem>
  );
}

export default SelectInputField;
