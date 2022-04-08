import { TimePicker } from 'antd';
import React from 'react';
import FormItem from './FormItem';

function TimeRangePicker({
  label,
  name,
  format,
  onTimeChange,
  timeProps,
  otherProps,
}) {
  return (
    <FormItem label={label} name={name} {...otherProps}>
      <TimePicker.RangePicker
        use12Hours
        format={format}
        onChange={onTimeChange}
        {...timeProps}
      />
    </FormItem>
  );
}

export default TimeRangePicker;
