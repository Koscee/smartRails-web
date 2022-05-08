import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { EmailInput, PasswordInput } from './AccountFormFields';
import AccountForm from './AccountForm';
import { login } from '../../actions/authActions';
import { AuthContext } from '../../contexts/AuthContext';

function LoginForm() {
  const { dispatch } = useContext(AuthContext);
  const router = useRouter();

  const handleFormSubmit = (formData, setBtnLoading) => {
    login(dispatch, formData, setBtnLoading, router);
  };

  return (
    <AccountForm
      name="login_form"
      type="login"
      headerText="Log in to your account"
      showFooterText
      submitBtnText="Log in"
      handleFormSubmit={handleFormSubmit}
      validationFields={['email', 'password']}
    >
      <EmailInput />

      <PasswordInput />
    </AccountForm>
  );
}

export default LoginForm;
