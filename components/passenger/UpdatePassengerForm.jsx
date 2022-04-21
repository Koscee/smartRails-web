import React, { useContext, useState } from 'react';
import moment from 'moment';
import { updatePassenger } from '../../actions/passengerActions';
import { PassengerContext } from '../../contexts/PassengerContext';
import PassengerForm from './PassengerForm';

function UpdatePassengerForm({ passenger, closeForm }) {
  const { dispatch } = useContext(PassengerContext);
  const [btnLoading, setBtnLoading] = useState(false);

  const onFormSubmit = async (formData) => {
    const passengerId = passenger._id;
    await updatePassenger(
      dispatch,
      passengerId,
      formData,
      closeForm,
      setBtnLoading
    );
  };

  const formInitialValues = {
    ...passenger,
    ID_exp_date: moment(passenger.ID_exp_date),
    dOB: moment(passenger.dOB),
  };

  // render component
  return (
    <PassengerForm
      name="updatePassenger"
      formInitialValues={formInitialValues}
      onFormSubmit={onFormSubmit}
      submitBtnLoading={btnLoading}
      optionalFields={['middle_name']}
    />
  );
}

export default UpdatePassengerForm;
