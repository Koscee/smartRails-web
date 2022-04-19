import React, { useState } from 'react';
import { addSchedules } from '../../actions/scheduleActions';
import ScheduleForm from './ScheduleForm';

function AddSchedulesForm() {
  const [btnLoading, setBtnLoading] = useState(false);

  const onFormSubmit = async (formData, form) => {
    await addSchedules(formData, form, setBtnLoading);
  };

  // render component
  return (
    <ScheduleForm
      name="createSchedules"
      onFormSubmit={onFormSubmit}
      submitBtnLoading={btnLoading}
    />
  );
}

export default AddSchedulesForm;
