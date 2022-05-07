import { Layout } from 'antd';
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/BasicLayout.module.css';
import Header from './Header';
import { AuthContext } from '../../../contexts/AuthContext';
import PageLoading from '../../PageLoading';

function BasicLayout({ pageProtected, children }) {
  const { authData, dispatch } = useContext(AuthContext);
  const { user, isAuthenticated } = authData;
  const router = useRouter();

  useEffect(() => {
    if (pageProtected && !isAuthenticated) {
      router.push('/account/login');
    }
  }, [router, pageProtected, isAuthenticated]);

  if ((pageProtected && isAuthenticated) || !pageProtected) {
    return (
      <Layout className={styles.container}>
        <Header
          user={user}
          dispatch={dispatch}
          isAuthenticated={isAuthenticated}
        />
        <Layout.Content style={{ minHeight: '280px' }}>
          {children}
        </Layout.Content>
      </Layout>
    );
  }

  return <PageLoading />;
}

export default BasicLayout;
