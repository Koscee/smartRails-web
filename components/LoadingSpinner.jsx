import React from 'react';
import { Spin } from 'antd';

function LoadingSpinner() {
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
      <Spin />
    </div>
  );
}

export default LoadingSpinner;
