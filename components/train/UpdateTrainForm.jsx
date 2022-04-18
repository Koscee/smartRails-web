import React, { useState, useEffect, useContext } from 'react';
import { getTrain, updateTrain } from '../../actions/trainActions';
import { TrainContext } from '../../contexts/TrainContext';
import { FormContainer } from '../form-elements';
import LoadingSpinner from '../LoadingSpinner';
import TrainFormFields from './TrainFormFields';

function UpdateTrainForm({ trainId, closeForm }) {
  const { trainTypes, routes, dispatch } = useContext(TrainContext);
  const [btnLoading, setBtnLoading] = useState(false);
  const [trainData, setTrainData] = useState({});

  // convert trainTypes array to Map
  const trainTypesMapData = new Map();
  trainTypes.forEach((type) => trainTypesMapData.set(type._id, type));

  useEffect(() => {
    (async () => {
      const train = await getTrain(trainId);
      train.train_no = train.train_no.slice(1);
      console.log('UPDATE FORM Data', train);
      setTrainData(train);
    })();
  }, [trainId]);

  const onFormSubmit = async (values) => {
    const formData = values;
    const { name: trainClass } = trainTypesMapData.get(values.service_class);
    formData.train_no = `${trainClass}${values.train_no}`;
    console.log('UPDATE TRAIN', formData);
    await updateTrain(dispatch, trainId, formData, closeForm, setBtnLoading);
  };

  const onFormSubmitFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // render component
  return !Object.keys(trainData).length ? (
    <LoadingSpinner />
  ) : (
    <FormContainer
      name="updateTrain"
      formInitialValues={trainData}
      onFormSubmit={onFormSubmit}
      onFormSubmitFailed={onFormSubmitFailed}
      validationFields={['service_class', 'train_no', 'route', 'carriages']}
      submitBtnLoading={btnLoading}
    >
      <TrainFormFields trainTypes={trainTypesMapData} routes={routes} />
    </FormContainer>
  );
}

export default UpdateTrainForm;
