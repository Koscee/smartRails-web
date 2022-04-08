import React, { useState } from 'react';
import { Layout } from 'antd';
import Header from './Header';
import SideNav from './SideNav';
import styles from './styles/AdminLayout.module.css';

function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSider = () => setCollapsed(!collapsed);

  return (
    <Layout className={styles.layout_container}>
      <SideNav collapsed={collapsed} />
      <Layout className={styles.main_layout}>
        <Header collapsed={collapsed} handleSiderToggle={toggleSider} />
        {children}
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
