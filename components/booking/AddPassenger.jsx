import React, { useContext } from 'react';
import moment from 'moment';
import { ADD_PASSENGER_INFO } from '../../actions/types';
import { TicketPurchaseContext } from '../../contexts/TicketPurchaseContext';
import { AddPassengerForm } from '../passenger';

function AddPassenger({ nextStep }) {
  const { dispatch, purchaseInfo } = useContext(TicketPurchaseContext);
  const { passenger } = purchaseInfo;

  const handleFormSubmit = (formData) => {
    dispatch({ type: ADD_PASSENGER_INFO, payload: formData });
    nextStep();
  };

  let initialValues = {};

  if (Object.keys(passenger || {}).length > 0) {
    initialValues = {
      ...passenger,
      ID_exp_date: moment(passenger.ID_exp_date),
      dOB: moment(passenger.dOB),
    };
  }

  return (
    <div style={{ width: '600px', margin: 'auto' }}>
      <AddPassengerForm
        initialValues={initialValues}
        handleFormSubmit={handleFormSubmit}
        checkAllFieldsTouched={false}
      />
    </div>
  );
}

export default AddPassenger;
