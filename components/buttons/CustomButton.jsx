import { Button } from 'antd';
import React from 'react';

function CustomButton({
  type,
  text,
  onClick,
  marginBottom,
  styles,
  ...otherProps
}) {
  return (
    <Button
      onClick={onClick}
      type={type}
      style={{
        marginBottom: marginBottom || 16,
        ...styles,
      }}
      {...otherProps}
    >
      {text}
    </Button>
  );
}

export default CustomButton;
