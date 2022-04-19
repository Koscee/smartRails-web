import React from 'react';
import CustomButton from './CustomButton';

function AddButton({ onClick, text, ...otherProps }) {
  return (
    <CustomButton
      type="primary"
      text={text}
      onClick={onClick}
      {...otherProps}
    />
  );
}

export default AddButton;
