import React from 'react';
import styles from '../../styles/Account.module.css';
import { LoginForm, WithAccount } from '../../components/account';
import { PageCenterWrapper } from '../../components/Layouts';

function LoginPage() {
  return (
    <WithAccount>
      <PageCenterWrapper className={styles.container}>
        <LoginForm />
      </PageCenterWrapper>
    </WithAccount>
  );
}

export default LoginPage;
