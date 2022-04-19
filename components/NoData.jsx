import { Empty } from 'antd';
import React from 'react';

function NoData({ description, styles, children, ...otherProps }) {
  return (
    <Empty
      description={<span>{description}</span>}
      style={{ margin: '80px auto', ...styles }}
      {...otherProps}
    >
      {children}
    </Empty>
  );
}

export default NoData;
