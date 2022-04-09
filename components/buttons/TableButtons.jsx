import React from 'react';
import { Button, Popconfirm, Space } from 'antd';

export function EditButton({ onClick }) {
  return (
    <Button type="link" style={{ padding: 0 }} onClick={onClick}>
      Edit
    </Button>
  );
}

export function DeleteButton({ onConfirm }) {
  return (
    <Popconfirm title="Sure to delete?" onConfirm={onConfirm}>
      <Button type="link" style={{ padding: 0 }}>
        Delete
      </Button>
    </Popconfirm>
  );
}

export function RowButtonWrapper({ size, direction, children }) {
  return (
    <Space size={size} direction={direction}>
      {children}
    </Space>
  );
}
