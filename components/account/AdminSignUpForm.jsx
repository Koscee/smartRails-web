import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { registerAdmin } from '../../actions/authActions';
import { getStations } from '../../actions/stationActions';
import AccountForm from './AccountForm';
import {
  EmailInput,
  PasswordInput,
  PhoneNumberInput,
  RoleSelectInput,
  StationSelectInput,
  UsernameInput,
} from './AccountFormFields';

function AdminSignUpForm() {
  const [stations, setStations] = useState();

  useEffect(() => {
    (async () => {
      const stationsList = await getStations();
      setStations(stationsList);
    })();
  }, []);

  const router = useRouter();

  const handleFormSubmit = (formData, setBtnLoading) => {
    registerAdmin(formData, setBtnLoading, router);
  };

  return (
    <AccountForm
      name="admin_signup_form"
      type="signup"
      headerText="Create an account"
      submitBtnText="Sign up"
      handleFormSubmit={handleFormSubmit}
      validationFields={['email', 'name', 'password', 'role']}
      style={{ height: 'fit-content', padding: '15px 0' }}
    >
      <EmailInput />

      <UsernameInput />

      <PasswordInput />

      <RoleSelectInput />

      <StationSelectInput stations={stations} />

      <PhoneNumberInput />
    </AccountForm>
  );
}

export default AdminSignUpForm;
