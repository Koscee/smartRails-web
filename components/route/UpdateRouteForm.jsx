import React, { useState, useEffect, useContext } from 'react';
import { getRoute, updateRoute } from '../../actions/routeActions';
import { RouteContext } from '../../contexts/RouteContex';
import { FormContainer } from '../form-elements';
import LoadingSpinner from '../LoadingSpinner';
import RouteFormFields from './RouteFormFields';

function UpdateRouteForm({ routeId, stations, closeForm }) {
  const { dispatch } = useContext(RouteContext);

  const [btnLoading, setBtnLoading] = useState(false);
  const [routeData, setRouteData] = useState({});

  useEffect(() => {
    (async () => {
      const route = await getRoute(routeId);
      setRouteData(route);
    })();
  }, [routeId]);

  const onFormSubmit = async (values) => {
    const formData = values;
    await updateRoute(dispatch, routeId, formData, closeForm, setBtnLoading);
  };

  // render component
  return !Object.keys(routeData).length ? (
    <LoadingSpinner />
  ) : (
    <FormContainer
      name="updateRoute"
      formInitialValues={routeData}
      onFormSubmit={onFormSubmit}
      // atleast one field needs to be touched for update to occur
      validationFields={['start_station', 'end_station', 'stops']}
      submitBtnLoading={btnLoading}
    >
      <RouteFormFields stations={stations} />
    </FormContainer>
  );
}

export default UpdateRouteForm;
