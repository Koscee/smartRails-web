import React from 'react';
import { useRouter } from 'next/router';
import { Layout, Typography, Row, Space, Avatar, Button, Tooltip } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import styles from '../styles/AdminLayout.module.css';
import { logout } from '../../../actions/authActions';

const { Title, Text } = Typography;

function Header({ collapsed, handleSiderToggle, user, dispatch }) {
  const router = useRouter();

  const logoutUser = () => {
    logout(dispatch, router);
  };

  return (
    <Layout.Header className={styles.header}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: `${styles.trigger}`,
        onClick: handleSiderToggle, // toggleSider
      })}

      <Row justify="end">
        <Space size={40} align="center" wrap>
          <Space size="small" align="start">
            <Avatar style={{ background: '#87d068' }} size={35}>
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
            <Space direction="vertical" align="center" size={0}>
              <Title
                type="secondary"
                level={5}
                ellipsis={user.name.length > 15}
                style={{ width: user.name.length > 15 && '90px' }}
              >
                {user.name.trim()}
              </Title>
              <Text style={{ fontSize: '0.73em' }} type="warning">
                {user.role}
              </Text>
            </Space>
          </Space>

          <Tooltip title="Logout" placement="bottom">
            <Button
              size="small"
              onClick={logoutUser}
              icon={<LogoutOutlined />}
            />
          </Tooltip>
        </Space>
      </Row>
    </Layout.Header>
  );
}

export default Header;
