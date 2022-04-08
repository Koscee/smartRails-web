import React from 'react';
import { Layout } from 'antd';
import Image from 'next/image';
import SideNavMenu from './SideNavMenu';
import styles from './styles/SideNav.module.css';

function SideNav({ collapsed }) {
  return (
    <Layout.Sider
      className={styles.sider_nav}
      trigger={null}
      theme="light"
      collapsible
      collapsed={collapsed}
    >
      <div className={styles.logo}>
        {collapsed ? (
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        ) : (
          <h2>SmartRails</h2>
        )}
      </div>
      <SideNavMenu />
    </Layout.Sider>
  );
}

export default SideNav;
