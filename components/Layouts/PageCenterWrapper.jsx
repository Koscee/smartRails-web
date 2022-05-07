import React from 'react';

function PageCenterWrapper({ className, children }) {
  return <div className={`screen-wrapper ${className}`}>{children}</div>;
}

export default PageCenterWrapper;
