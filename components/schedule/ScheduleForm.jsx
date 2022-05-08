import moment from 'moment';
import React from 'react';
import { DATE_FORMAT, TIME_FORMAT } from '../../utils/constants';
import { FormContainer } from '../form-elements';
import ScheduleFormFields from './ScheduleFormFields';

function ScheduleForm({ name, onFormSubmit, submitBtnLoading }) {
  const formInitialValues = {
    train_no: '',
    startDate: moment().add(1, 'day'),
    startTime: '',
  };

  // render component
  return (
    <FormContainer
      name={name}
      formInitialValues={formInitialValues}
      onFormSubmit={(value, form) => {
        const formData = value;
        formData.startDate = formData.startDate.format(DATE_FORMAT);
        formData.startTime = formData.startTime.format(TIME_FORMAT);
        onFormSubmit(formData, form);
      }}
      validationFields={['train_no', 'startTime']}
      checkAllFieldsTouched
      submitBtnLoading={submitBtnLoading}
    >
      <div style={{ marginTop: 30 }}>
        <ScheduleFormFields />
      </div>
    </FormContainer>
  );
}

export default ScheduleForm;
