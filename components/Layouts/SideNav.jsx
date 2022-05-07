import React from 'react';
import { Layout } from 'antd';
import SideNavMenu from './SideNavMenu';
import styles from './styles/SideNav.module.css';
import SmartRailsLogo from '../SmartRailsLogo';

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
        <span style={{ margin: !collapsed && '26px' }}>
          <SmartRailsLogo width={90} height={45} />
        </span>
      </div>
      <SideNavMenu />
    </Layout.Sider>
  );
}

export default SideNav;
