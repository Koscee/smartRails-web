import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Layout } from 'antd';
import Header from './Header';
import SideNav from '../SideNav';
import styles from '../styles/AdminLayout.module.css';
import { AuthContext } from '../../../contexts/AuthContext';
import { isSuperOrBasicAdmin } from '../../../utils/permissionCheck';
import PageLoading from '../../PageLoading';

function AdminLayout({ children }) {
  const { authData, dispatch } = useContext(AuthContext);
  const { user, isAuthenticated } = authData;
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/account/login');
    } else if (isAuthenticated && !isSuperOrBasicAdmin(user.role)) {
      router.push('/403');
    }
  }, [isAuthenticated, user, router]);

  const [collapsed, setCollapsed] = useState(false);

  const toggleSider = () => setCollapsed(!collapsed);

  if (isAuthenticated && isSuperOrBasicAdmin(user?.role)) {
    return (
      <Layout className={styles.layout_container}>
        <SideNav collapsed={collapsed} />
        <Layout className={styles.main_layout}>
          <Header
            user={user}
            dispatch={dispatch}
            collapsed={collapsed}
            handleSiderToggle={toggleSider}
          />
          {children}
        </Layout>
      </Layout>
    );
  }

  return <PageLoading />;
}

export default AdminLayout;
