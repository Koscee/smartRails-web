import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';
import React from 'react';
import { TIME_FORMAT } from '../../utils/constants';
import { FormItem, InputField } from '../form-elements';

function ScheduleFormFields() {
  // Can not select days before today and today
  const disabledDate = (current) => current && current < moment().endOf('day');

  const checkSelectedDate = async (_, value) => {
    if (value.diff(moment(), 'months') <= 4) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Date should not exceed 4 months'));
  };

  return (
    <>
      <InputField
        label="Train"
        name="train_no"
        placeholder="enter train name"
        rules={[
          {
            required: true,
            message: 'Please input train name!',
            whitespace: true,
          },
        ]}
      />
      <FormItem
        label="Start date"
        name="startDate"
        rules={[
          {
            required: true,
            // message: 'Please select a start date!',
            validator: checkSelectedDate,
          },
        ]}
      >
        <DatePicker disabledDate={disabledDate} />
      </FormItem>

      <FormItem
        label="Start time"
        name="startTime"
        rules={[
          {
            required: true,
            message: 'Please select a start time!',
          },
        ]}
      >
        <TimePicker format={TIME_FORMAT} />
      </FormItem>
    </>
  );
}

export default ScheduleFormFields;
