import React from 'react';
import { DatePicker, Select } from 'antd';
import {
  FormItem,
  InputField,
  InputGroupField,
  SelectInputField,
} from '../form-elements';
import identityTypes from '../../utils/identityTypes';
import countries from '../../utils/countries.json';

const { Option } = Select;

function PassengerFormFields() {
  return (
    <>
      <InputField
        label="First Name"
        name="first_name"
        placeholder="enter first name"
        rules={[
          {
            required: true,
            message: 'Please input passenger first name!',
            whitespace: true,
          },
        ]}
      />

      <InputField
        label="Middle Name"
        name="middle_name"
        placeholder="enter middle name (optional)"
      />

      <InputField
        label="Last Name"
        name="last_name"
        placeholder="enter surname"
        rules={[
          {
            required: true,
            message: 'Please input passenger last name!',
            whitespace: true,
          },
        ]}
      />

      <SelectInputField
        label="Gender"
        name="gender"
        placeholder="Select a gender"
        rules={[{ required: true, message: 'Please select a gender!' }]}
      >
        <Option value="M">Male</Option>
        <Option value="F">Female</Option>
      </SelectInputField>

      <FormItem
        label="Date of Birth"
        name="dOB"
        rules={[{ required: true, message: 'Please select a start date!' }]}
      >
        <DatePicker
          placeholder="Select date of birth"
          style={{ width: '50%' }}
        />
      </FormItem>

      <InputGroupField label="Identity" required>
        <SelectInputField
          name="ID_type"
          placeholder="Select ID type"
          itemStyle={{ width: '45%' }}
          style={{ width: '100%' }}
          rules={[{ required: true, message: 'Please select identity type!' }]}
        >
          {identityTypes.map((type) => (
            <Option key={type.replace(/\s/g, '-')} value={type.toLowerCase()}>
              {type}
            </Option>
          ))}
        </SelectInputField>
        <InputField
          name="ID_no"
          placeholder="enter passenger ID number"
          width="55%"
          rules={[
            {
              required: true,
              message: 'Please input identity number!',
              whitespace: true,
            },
          ]}
        />
      </InputGroupField>

      <FormItem
        label="Expiry Date"
        name="ID_exp_date"
        rules={[{ required: true, message: 'Please select an expiry date!' }]}
      >
        <DatePicker
          placeholder="Select ID expiry date"
          style={{ width: '50%' }}
        />
      </FormItem>

      <SelectInputField
        label="Nationality"
        name="nationality"
        rules={[{ required: true, message: 'Please select a nationality!' }]}
        showSearch
        placeholder="Select passenger nationality"
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
      >
        {countries.map(({ id, value }) => {
          const [cn, en] = value.split(',');
          return <Option key={id} value={en}>{`${en} (${cn})`}</Option>;
        })}
      </SelectInputField>

      <InputField
        label="Phone No."
        name="phone_no"
        type="tel"
        placeholder="enter phone number"
        rules={[{ required: true, message: 'Please input phone number!' }]}
      />
    </>
  );
}

export default PassengerFormFields;
