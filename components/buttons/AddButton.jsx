import { Button } from 'antd';
import React from 'react';

function AddButton({ onClick, text }) {
  return (
    <Button
      onClick={onClick}
      type="primary"
      style={{
        marginBottom: 16,
      }}
    >
      {text}
    </Button>
  );
}

export default AddButton;
