import { Modal } from 'antd';
import React from 'react';

function CustomModal({ title, visible, height, width, onCancel, children }) {
  return (
    <Modal
      title={title}
      centered
      visible={visible}
      onCancel={onCancel}
      width={width || 700}
      bodyStyle={{ height: height || 500, overflowY: 'auto' }}
      maskClosable={false}
      maskStyle={{ opacity: 0.4 }}
      destroyOnClose
      footer={null}
    >
      {children}
    </Modal>
  );
}

export default CustomModal;
