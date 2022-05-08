import React, { useState, useContext } from 'react';
import { addRoute } from '../../actions/routeActions';
import { RouteContext } from '../../contexts/RouteContex';
import { FormContainer } from '../form-elements';
import RouteFormFields from './RouteFormFields';

function AddRouteForm({ stations }) {
  const { dispatch } = useContext(RouteContext);
  const [btnLoading, setBtnLoading] = useState(false);

  const onFormSubmit = async (values, form) => {
    const formData = values;
    await addRoute(dispatch, formData, form, setBtnLoading);
  };

  const formInitialValues = {
    start_station: undefined,
    end_station: undefined,
    stops: [],
  };

  // render component
  return (
    <FormContainer
      name="addRoute"
      formInitialValues={formInitialValues}
      onFormSubmit={onFormSubmit}
      validationFields={['start_station', 'end_station']}
      checkAllFieldsTouched
      submitBtnLoading={btnLoading}
    >
      <RouteFormFields stations={stations} />
    </FormContainer>
  );
}

export default AddRouteForm;
