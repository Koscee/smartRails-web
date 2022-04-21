import React from 'react';
import { DATE_FORMAT } from '../../utils/constants';
import { FormContainer } from '../form-elements';
import PassengerFormFields from './PassengerFormFields';

function PassengerForm({
  name,
  formInitialValues,
  onFormSubmit,
  submitBtnLoading,
  optionalFields = [],
  checkAllFieldsTouched,
}) {
  const onFormSubmitFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // render component
  return (
    <FormContainer
      name={name}
      formInitialValues={formInitialValues}
      onFormSubmit={(value, form) => {
        const formData = value;
        formData.dOB = formData.dOB.format(DATE_FORMAT);
        formData.ID_exp_date = formData.ID_exp_date.format(DATE_FORMAT);
        onFormSubmit(formData, form);
      }}
      onFormSubmitFailed={onFormSubmitFailed}
      validationFields={[
        'first_name',
        'last_name',
        'ID_type',
        'ID_no',
        'ID_exp_date',
        'gender',
        'dOB',
        'nationality',
        'phone_no',
        ...optionalFields,
      ]}
      checkAllFieldsTouched={checkAllFieldsTouched}
      submitBtnLoading={submitBtnLoading}
    >
      <PassengerFormFields />
    </FormContainer>
  );
}

export default PassengerForm;
