import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Dropdown, Layout, Menu, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SmartRailsLogo from '../../SmartRailsLogo';
import styles from '../styles/BasicLayout.module.css';
import { navMenuItems, profileMenuItems } from './menuItems';
import { logout } from '../../../actions/authActions';

function Header({ dispatch, isAuthenticated }) {
  const router = useRouter();
  const [activeKey, setActiveKey] = useState('home');

  useEffect(() => {
    const activeNavMenuItem = navMenuItems.find(
      (item) => item.href === router.pathname
    );
    setActiveKey(activeNavMenuItem?.key);
  }, [router.pathname]);

  const renderMenuItems = (items) =>
    items.map((item) => (
      <Menu.Item key={item.key}>
        <Link href={item.href}>{item.text}</Link>
      </Menu.Item>
    ));

  const profileMenu = <Menu>{renderMenuItems(profileMenuItems)}</Menu>;

  const logoutUser = () => {
    logout(dispatch, router);
  };

  return (
    <Layout.Header className={styles.header}>
      <Row>
        <Col className={styles.logo}>
          <Link href="/">
            <a>
              <SmartRailsLogo width={90} height={45} />
            </a>
          </Link>
        </Col>
        <Col xs={2} sm={12}>
          <Menu
            selectedKeys={[`${activeKey}`]}
            mode="horizontal"
            className={styles.menu_nav}
          >
            {renderMenuItems(navMenuItems)}
          </Menu>
        </Col>
        <Col>
          <Space size="middle">
            {isAuthenticated ? (
              <>
                <Dropdown overlay={profileMenu} placement="bottom">
                  <Button type="ghost" shape="round" icon={<UserOutlined />}>
                    <DownOutlined />
                  </Button>
                </Dropdown>
                <Button type="text" size="small" onClick={logoutUser}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button type="ghost" shape="round" href="/account/login">
                  Log in
                </Button>
                <Button type="primary" shape="round" href="/account/register">
                  Sign up
                </Button>
              </>
            )}
          </Space>
        </Col>
      </Row>
    </Layout.Header>
  );
}

export default Header;
