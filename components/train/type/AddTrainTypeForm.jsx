import React, { useState, useContext } from 'react';
import { addTrainType } from '../../../actions/trainTypeAction';
import { TrainTypeContext } from '../../../contexts/TrainTypeContex';
import { FormContainer } from '../../form-elements';
import TrainTypeFormFields from './TrainTypeFormFields';

function AddTrainTypeForm() {
  const { dispatch } = useContext(TrainTypeContext);
  const [btnLoading, setBtnLoading] = useState(false);

  const onFormSubmit = async (values, form) => {
    const formData = values;
    formData.name = formData.name.toUpperCase();
    await addTrainType(dispatch, formData, form, setBtnLoading);
  };

  const formInitialValues = {
    name: '',
    max_speed: '',
    min_speed: '',
    rail_type: undefined,
    seat_types: [],
    description: '',
  };

  // render component
  return (
    <FormContainer
      name="addTrainType"
      formInitialValues={formInitialValues}
      onFormSubmit={onFormSubmit}
      validationFields={['name', 'max_speed', 'rail_type', 'seat_types']}
      checkAllFieldsTouched
      submitBtnLoading={btnLoading}
    >
      <TrainTypeFormFields />
    </FormContainer>
  );
}

export default AddTrainTypeForm;
