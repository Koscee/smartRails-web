import React, { useState } from 'react';
import { addPassenger } from '../../actions/passengerActions';
import PassengerForm from './PassengerForm';

function AddPassengerForm({
  initialValues,
  handleFormSubmit,
  checkAllFieldsTouched,
  dispatch,
}) {
  const [btnLoading, setBtnLoading] = useState(false);

  const onFormSubmit = async (formData, form) => {
    await addPassenger(dispatch, formData, form, setBtnLoading);
  };

  const formInitialValues = {
    first_name: '',
    middle_name: '',
    last_name: '',
    ID_type: undefined,
    ID_no: '',
    ID_exp_date: '',
    gender: undefined,
    dOB: '',
    nationality: undefined,
    phone_no: '',
  };

  // render component
  return (
    <PassengerForm
      name="addPassenger"
      formInitialValues={initialValues || formInitialValues}
      onFormSubmit={handleFormSubmit || onFormSubmit}
      checkAllFieldsTouched={checkAllFieldsTouched}
      submitBtnLoading={btnLoading}
    />
  );
}

export default AddPassengerForm;
