import React from 'react';
import { Button } from 'antd';

function Submit({
  form,
  buttonText,
  className,
  validationFields,
  checkAllFieldsTouched,
  ...otherProps
}) {
  return (
    <Button
      type="primary"
      htmlType="submit"
      className={className}
      disabled={
        !form.isFieldsTouched(validationFields, checkAllFieldsTouched) ||
        !!form.getFieldsError().filter(({ errors }) => errors.length).length
      }
      {...otherProps}
    >
      {buttonText}
    </Button>
  );
}

export default Submit;
