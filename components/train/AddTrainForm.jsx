import React, { useState, useContext } from 'react';
import { addTrain } from '../../actions/trainActions';
import { TrainContext } from '../../contexts/TrainContext';
import { FormContainer } from '../form-elements';
import TrainFormFields from './TrainFormFields';

function AddTrainForm() {
  const { trainTypes, routes, dispatch } = useContext(TrainContext);
  const [btnLoading, setBtnLoading] = useState(false);

  // convert trainTypes array to Map
  const trainTypesMapData = new Map();
  trainTypes.forEach((type) => trainTypesMapData.set(type._id, type));

  const onFormSubmit = async (values, form) => {
    const formData = values;
    const { name: trainClass } = trainTypesMapData.get(values.service_class);
    formData.train_no = `${trainClass}${values.train_no}`;
    console.log(formData);
    await addTrain(dispatch, formData, form, setBtnLoading);
  };

  const onFormSubmitFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const formInitialValues = {
    service_class: undefined,
    train_no: '',
    route: undefined,
    carriages: [],
  };

  // render component
  return (
    <FormContainer
      name="addTrain"
      formInitialValues={formInitialValues}
      onFormSubmit={onFormSubmit}
      onFormSubmitFailed={onFormSubmitFailed}
      validationFields={['service_class', 'train_no', 'route', 'carriages']}
      submitBtnLoading={btnLoading}
    >
      <TrainFormFields trainTypes={trainTypesMapData} routes={routes} />
    </FormContainer>
  );
}

export default AddTrainForm;
