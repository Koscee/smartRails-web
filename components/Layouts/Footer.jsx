import React from 'react';
import { Layout } from 'antd';

function Footer() {
  return (
    <Layout.Footer style={{ textAlign: 'center', padding: '10px 50px' }}>
      Footer ©{new Date().getFullYear()}
    </Layout.Footer>
  );
}

export default Footer;
