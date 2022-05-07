import React from 'react';
import styles from '../../styles/Account.module.css';
import { SignUpForm, WithAccount } from '../../components/account';
import { PageCenterWrapper } from '../../components/Layouts';

function SignUpPage() {
  return (
    <WithAccount>
      <PageCenterWrapper className={styles.container}>
        <SignUpForm />
      </PageCenterWrapper>
    </WithAccount>
  );
}

export default SignUpPage;
