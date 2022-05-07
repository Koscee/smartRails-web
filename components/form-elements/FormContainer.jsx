import { Form } from 'antd';
import React, { useState, useEffect, createContext } from 'react';
import Submit from './Submit';

export const FormContext = createContext();

function FormContainer({
  name,
  formInitialValues,
  onFormSubmit,
  onFormSubmitFailed,
  validationFields,
  checkAllFieldsTouched,
  submitBtnLoading,
  children,
}) {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({}); // To disable submit button at the beginning.

  useEffect(() => {
    forceUpdate({});
    console.log('FORM Loaded');
  }, []);

  const gridPosition = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };

  // render component
  return (
    <FormContext.Provider value={form}>
      <Form
        form={form}
        name={name}
        {...gridPosition}
        layout="horizontal"
        size="middle"
        initialValues={formInitialValues}
        onFinish={(values) => onFormSubmit(values, form)}
        onFinishFailed={onFormSubmitFailed}
        autoComplete="off"
      >
        {children}
        <Form.Item shouldUpdate wrapperCol={{ offset: 6, span: 12 }}>
          {() => (
            <Submit
              form={form}
              buttonText="Submit"
              loading={submitBtnLoading}
              checkAllFieldsTouched={checkAllFieldsTouched}
              validationFields={validationFields}
            />
          )}
        </Form.Item>
      </Form>
    </FormContext.Provider>
  );
}

export default FormContainer;
