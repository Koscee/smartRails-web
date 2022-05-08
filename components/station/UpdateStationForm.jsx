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
      setStationData({
        ...station,
        lat: station?.location?.coordinates[1],
        lon: station?.location?.coordinates[0],
        city: station?.city?.en_name,
      });
    })();
  }, [stationId]);

  const onFormSubmit = async (values) => {
    const formData = values;
    await updateStation(
      dispatch,
      stationId,
      formData,
      closeForm,
      setBtnLoading
    );
  };

  // render component
  return !Object.keys(stationData).length ? (
    <LoadingSpinner />
  ) : (
    <FormContainer
      name="updateStation"
      formInitialValues={stationData}
      onFormSubmit={onFormSubmit}
      validationFields={[
        // atleast one field needs to be touched for update to occur
        'en_name',
        'cn_name',
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
