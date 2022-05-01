import React from 'react';
import { Spin } from 'antd';

function LoadingSpinner({ tip, size, spinning, children }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Spin tip={tip || 'Loading...'} size={size} spinning={spinning}>
        {children}
      </Spin>
    </div>
  );
}

export default LoadingSpinner;
