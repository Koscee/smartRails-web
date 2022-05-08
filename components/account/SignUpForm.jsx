import React from 'react';
import { useRouter } from 'next/router';
import { registerUser } from '../../actions/authActions';
import AccountForm from './AccountForm';
import {
  EmailInput,
  PasswordInput,
  PhoneNumberInput,
  UsernameInput,
} from './AccountFormFields';

function SignUpForm() {
  const router = useRouter();

  const handleFormSubmit = (formData, setBtnLoading) => {
    registerUser(formData, setBtnLoading, router);
  };

  return (
    <AccountForm
      name="signup_form"
      type="signup"
      headerText="Create an account"
      showFooterText
      submitBtnText="Sign up"
      handleFormSubmit={handleFormSubmit}
      validationFields={['email', 'name', 'password']}
    >
      <EmailInput />

      <UsernameInput />

      <PasswordInput />

      <PhoneNumberInput />
    </AccountForm>
  );
}

export default SignUpForm;
