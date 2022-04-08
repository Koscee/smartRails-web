import React from 'react';
import { Layout, Typography, Row, Space, Badge, Avatar } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
} from '@ant-design/icons';
import styles from './styles/Header.module.css';

const { Title, Text } = Typography;

function Header({ collapsed, handleSiderToggle }) {
  return (
    <Layout.Header className={styles.header}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: `${styles.trigger}`,
        onClick: handleSiderToggle, // toggleSider
      })}
      <Row justify="end">
        <Space size="middle" align="center" wrap>
          {/* <Badge count={3} size="small">
            <BellOutlined className={styles.icon} />
          </Badge> */}
          <Space size="small" align="start">
            <Avatar src="https://joeschmoe.io/api/v1/random" size={40} />
            <Space direction="vertical" align="center" size={1}>
              <Title level={5}>John</Title>
              <Text type="warning">admin</Text>
            </Space>
          </Space>
        </Space>
      </Row>
    </Layout.Header>
  );
}

export default Header;
