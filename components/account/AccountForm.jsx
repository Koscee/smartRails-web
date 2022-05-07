import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Form } from 'antd';
import styles from './styles/Form.module.css';
import { Submit } from '../form-elements';
import SmartRailsLogo from '../SmartRailsLogo';

const footerText = {
  login: (
    <span>
      Don&apos;t have an account?{' '}
      <Link href="/account/register">Sign Up now!</Link>
    </span>
  ),
  signup: (
    <span>
      Have an account? <Link href="/account/login">Log in</Link>
    </span>
  ),
};

function AccountForm({
  name,
  type,
  headerText,
  showFooterText,
  children,
  submitBtnText,
  handleFormSubmit,
  validationFields,
  ...otherProps
}) {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});
  const [btnLoading, setBtnLoading] = useState(false);
  const isLoginForm = type === 'login';

  useEffect(() => {
    forceUpdate({});
  }, []);

  return (
    <Form
      form={form}
      name={name}
      autoComplete="off"
      initialValues={{}}
      className={styles.form}
      onFinish={(values) => handleFormSubmit(values, setBtnLoading)}
      {...otherProps}
    >
      <div
        className={`${styles.form_header} ${
          isLoginForm ? styles.login_header : ''
        }`}
      >
        <div className={styles.form_logo}>
          <Link href="/">
            <a>
              <SmartRailsLogo />
            </a>
          </Link>
        </div>
        <h3>{headerText}</h3>
      </div>

      {children}

      <Form.Item shouldUpdate className={styles.form_input}>
        {() => (
          <>
            <Submit
              form={form}
              buttonText={submitBtnText}
              loading={btnLoading}
              className={styles.form_button}
              validationFields={validationFields}
              checkAllFieldsTouched
            />
            {showFooterText && footerText[type]}
          </>
        )}
      </Form.Item>
    </Form>
  );
}

export default AccountForm;
