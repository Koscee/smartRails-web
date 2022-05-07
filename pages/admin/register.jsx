import React from 'react';
import styles from '../../styles/Account.module.css';
import { AdminSignUpForm, WithAccount } from '../../components/account';
import { PageCenterWrapper } from '../../components/Layouts';

function AdminSignUpPage() {
  return (
    <WithAccount>
      <PageCenterWrapper className={styles.container}>
        <AdminSignUpForm />
      </PageCenterWrapper>
    </WithAccount>
  );
}

export default AdminSignUpPage;
