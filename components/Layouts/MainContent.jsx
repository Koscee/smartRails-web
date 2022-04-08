import React from 'react';
import { Layout, PageHeader } from 'antd';

const { Content } = Layout;

function MainContent({ title, subtitle, children }) {
  return (
    <>
      <PageHeader title={title} subTitle={subtitle} />
      <Content
        style={{
          margin: '16px 16px',
          padding: 20,
          minHeight: 280,
        }}
      >
        {children}
      </Content>
    </>
  );
}

export default MainContent;
