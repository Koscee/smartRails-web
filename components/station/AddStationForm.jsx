import React, { useEffect, useState, useContext } from 'react';
import { FormContainer } from '../form-elements';
import { addStation } from '../../actions/stationActions';
import StationFormFields from './StationFormFields';
import { StationContext } from '../../contexts/StationContex';
import { openNotificationWithIcon } from '../../utils/actionMessages';
import LoadingSpinner from '../LoadingSpinner';

function AddStationForm({ cities }) {
  const { dispatch } = useContext(StationContext);
  const [btnLoading, setBtnLoading] = useState(false);
  const [coordinates, setCoordinates] = useState({
    lon: '',
    lat: '',
    errCode: 0,
  });

  // get user hardware location.
  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        setCoordinates({ lon: longitude, lat: latitude });
      },
      (err) => {
        setCoordinates({ ...coordinates, errCode: err.code });
        openNotificationWithIcon('warn', err.message);
      }
    );
  }, []);

  const onFormSubmit = async (values, form) => {
    const formData = values;
    await addStation(dispatch, formData, form, setBtnLoading);
  };

  const formInitialValues = {
    en_name: '',
    cn_name: '',
    type: undefined,
    lat: coordinates.lat,
    lon: coordinates.lon,
    city: undefined,
    counters: [],
    tel_no: '',
  };

  // render component
  return !coordinates.errCode &&
    coordinates.lat === '' &&
    coordinates.lon === '' ? (
    <LoadingSpinner />
  ) : (
    <FormContainer
      name="addStation"
      formInitialValues={formInitialValues}
      onFormSubmit={onFormSubmit}
      validationFields={['en_name', 'type', 'city']}
      checkAllFieldsTouched
      submitBtnLoading={btnLoading}
    >
      <StationFormFields cities={cities} />
    </FormContainer>
  );
}

export default AddStationForm;
