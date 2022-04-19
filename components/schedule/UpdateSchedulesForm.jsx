import React, { useState } from 'react';
import { updateSchedules } from '../../actions/scheduleActions';
import ScheduleForm from './ScheduleForm';

function UpdateSchedulesForm({ closeForm, reloadTableData }) {
  const [btnLoading, setBtnLoading] = useState(false);

  const onFormSubmit = async (formData) => {
    await updateSchedules(formData, closeForm, setBtnLoading);
    await reloadTableData(formData.train_no);
  };

  // render component
  return (
    <ScheduleForm
      name="updateSchedules"
      onFormSubmit={onFormSubmit}
      submitBtnLoading={btnLoading}
    />
  );
}

export default UpdateSchedulesForm;
