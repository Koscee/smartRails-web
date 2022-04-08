import { Modal } from 'antd';
import React from 'react';

function CustomModal({ title, visible, onCancel, children }) {
  return (
    <Modal
      title={title}
      centered
      visible={visible}
      onCancel={onCancel}
      width={700}
      bodyStyle={{ height: 500, overflowY: 'scroll' }}
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
