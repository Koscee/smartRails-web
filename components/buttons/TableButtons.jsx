import React from 'react';
import { Button, Popconfirm, Space } from 'antd';

export function ActionButton({ text, onClick, ...otherProps }) {
  return (
    <Button
      type="link"
      style={{ padding: 0 }}
      onClick={onClick}
      {...otherProps}
    >
      {text}
    </Button>
  );
}

export function EditButton({ onClick }) {
  return <ActionButton text="Edit" onClick={onClick} />;
}

export function DeleteButton({ onConfirm }) {
  return (
    <Popconfirm title="Sure to delete?" onConfirm={onConfirm}>
      <ActionButton danger text="Delete" />
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
