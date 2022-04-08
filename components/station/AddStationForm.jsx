import React, { useState, useContext } from 'react';
import { FormContainer } from '../form-elements';
import { addStation } from '../../actions/stationActions';
import StationFormFields from './StationFormFields';
import { StationContext } from '../../contexts/StationContex';

function AddStationForm({ cities }) {
  const { dispatch } = useContext(StationContext);
  const [btnLoading, setBtnLoading] = useState(false);

  const onFormSubmit = async (values, form) => {
    const formData = values;
    await addStation(dispatch, formData, form, setBtnLoading);
  };

  const onFormSubmitFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const formInitialValues = {
    en_name: '',
    cn_name: '',
    type: undefined,
    lat: '',
    lon: '',
    city: undefined,
    counters: [],
    tel_no: '',
  };

  // render component
  return (
    <FormContainer
      name="addStation"
      formInitialValues={formInitialValues}
      onFormSubmit={onFormSubmit}
      onFormSubmitFailed={onFormSubmitFailed}
      validationFields={['en_name', 'type', 'city', 'lon', 'lat']}
      checkAllFieldsTouched
      submitBtnLoading={btnLoading}
    >
      <StationFormFields cities={cities} />
    </FormContainer>
  );
}

export default AddStationForm;
