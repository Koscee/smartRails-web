import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Descriptions, PageHeader, Skeleton, Space } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { getUser } from '../../actions/authActions';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './styles/ProfileDetails.module.css';

function ProfileDetails() {
  const { authData } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    (async () => {
      const user = await getUser(authData?.user?.id);
      setUserDetails(user);
    })();
  }, [authData]);

  return (
    <div className={styles.container}>
      <PageHeader title="My Profile" />
      {!userDetails ? (
        <Skeleton loading active />
      ) : (
        <Descriptions column={1} bordered className={styles.descriptions}>
          <Descriptions.Item
            label={
              <Space>
                <UserOutlined />
                Username
              </Space>
            }
          >
            {userDetails.name}
          </Descriptions.Item>

          <Descriptions.Item
            label={
              <Space>
                <MailOutlined />
                Email
              </Space>
            }
          >
            {userDetails.email}
          </Descriptions.Item>

          <Descriptions.Item
            label={
              <Space>
                <PhoneOutlined />
                Phone No.
              </Space>
            }
          >
            {userDetails.phone_no}
          </Descriptions.Item>
        </Descriptions>
      )}
    </div>
  );
}

export default ProfileDetails;
