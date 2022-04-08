import React, { useState, useEffect, useContext } from 'react';
import StationFormFields from './StationFormFields';
import { FormContainer } from '../form-elements';
import { getStation, updateStation } from '../../actions/stationActions';
import { StationContext } from '../../contexts/StationContex';
import LoadingSpinner from '../LoadingSpinner';

function UpdateStationForm({ stationId, cities, closeForm }) {
  const { dispatch } = useContext(StationContext);

  const [btnLoading, setBtnLoading] = useState(false);
  const [stationData, setStationData] = useState({});

  useEffect(() => {
    (async () => {
      const station = await getStation(stationId);
      console.log('UPDATE FORM Data', station);
      setStationData({
        ...station,
        lat: station?.location?.coordinates[1],
        lon: station?.location?.coordinates[0],
        city: station?.city?.en_name,
      });
    })();
  }, [stationId]);

  const onFormSubmit = async (values, form) => {
    const formData = values;
    await updateStation(
      dispatch,
      stationId,
      formData,
      closeForm,
      setBtnLoading
    );
  };

  const onFormSubmitFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // render component
  return !Object.keys(stationData).length ? (
    <LoadingSpinner />
  ) : (
    <FormContainer
      name="updateStation"
      formInitialValues={stationData}
      onFormSubmit={onFormSubmit}
      onFormSubmitFailed={onFormSubmitFailed}
      validationFields={[
        // atleast one field needs to be touched for update to occur
        'en_name',
        'type',
        'city',
        'lon',
        'lat',
        'counters',
        'tel_no',
      ]}
      submitBtnLoading={btnLoading}
    >
      <StationFormFields cities={cities} />
    </FormContainer>
  );
}

export default UpdateStationForm;
