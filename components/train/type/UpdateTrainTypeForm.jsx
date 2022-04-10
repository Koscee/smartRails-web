import React, { useState, useContext, useEffect } from 'react';
import {
  getTrainType,
  updateTrainType,
} from '../../../actions/trainTypeAction';
import { TrainTypeContext } from '../../../contexts/TrainTypeContex';
import { FormContainer } from '../../form-elements';
import LoadingSpinner from '../../LoadingSpinner';
import TrainTypeFormFields from './TrainTypeFormFields';

function UpdateTrainTypeForm({ trainTypeId, closeForm }) {
  const { dispatch } = useContext(TrainTypeContext);
  const [btnLoading, setBtnLoading] = useState(false);
  const [trainTypeData, setTrainTypeData] = useState({});

  useEffect(() => {
    (async () => {
      const trainType = await getTrainType(trainTypeId);
      console.log('UPDATE FORM Data', trainType);
      setTrainTypeData(trainType);
    })();
  }, [trainTypeId]);

  const onFormSubmit = async (values) => {
    const formData = values;
    formData.name = formData.name.toUpperCase();
    await updateTrainType(
      dispatch,
      trainTypeId,
      formData,
      closeForm,
      setBtnLoading
    );
  };

  const onFormSubmitFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // render component
  return !Object.keys(trainTypeData).length ? (
    <LoadingSpinner />
  ) : (
    <FormContainer
      name="updateTrainType"
      formInitialValues={trainTypeData}
      onFormSubmit={onFormSubmit}
      onFormSubmitFailed={onFormSubmitFailed}
      // atleast one field needs to be touched for update to occur
      validationFields={[
        'name',
        'max_speed',
        'min_speed',
        'rail_type',
        'seat_types',
        'description',
      ]}
      submitBtnLoading={btnLoading}
    >
      <TrainTypeFormFields defaultRailType={trainTypeData.rail_type} />
    </FormContainer>
  );
}

export default UpdateTrainTypeForm;
