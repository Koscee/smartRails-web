import React, { useState } from 'react';
import { Select } from 'antd';
import {
  InputField,
  InputGroupField,
  SelectInputField,
  TextAreaInput,
} from '../../form-elements';
import trainTypeFormOptions from './optionItems';

const { Option } = Select;

const findRailType = (text) =>
  trainTypeFormOptions.find((option) => option.railType === text);

function TrainTypeFormFields({ defaultRailType }) {
  const initialSeatTypes = findRailType(defaultRailType)?.seatTypes;

  const [seatTypes, setSeatTypes] = useState(initialSeatTypes || []);

  const onSelectRailTypeChange = (value) => {
    const selectedItem = findRailType(value);
    setSeatTypes(selectedItem.seatTypes);
  };

  return (
    <>
      <InputField
        label="Class Type"
        name="name"
        placeholder="enter a class type"
        fieldTooltip="Class type should be an uppercase letter from A-Z"
        rules={[
          {
            required: true,
            message: 'Please input class type!',
            whitespace: true,
          },
        ]}
      />
      <InputGroupField label="Speed" required>
        <InputField
          name="max_speed"
          placeholder="maximum speed"
          type="number"
          width="50%"
          suffix="km/h"
          rules={[{ required: true, message: 'Please enter a maximum speed!' }]}
        />
        <InputField
          name="min_speed"
          placeholder="minimum speed"
          type="number"
          width="50%"
          suffix="km/h"
        />
      </InputGroupField>

      <SelectInputField
        label="Railway Type"
        name="rail_type"
        rules={[{ required: true, message: 'Please select a railway type!' }]}
        showSearch
        placeholder="Select railway type"
        onChange={onSelectRailTypeChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {trainTypeFormOptions.map(({ railType }) => (
          <Option key={railType.trim()} value={railType}>
            {railType}
          </Option>
        ))}
      </SelectInputField>

      <SelectInputField
        label="Seat Types"
        name="seat_types"
        fieldTooltip="Multiple seat types can be selected"
        mode="multiple"
        placeholder="select the lists to stops"
        rules={[{ required: true, message: 'Please select seat types!' }]}
      >
        {seatTypes.map((seatType) => (
          <Option key={seatType.replace(' ', '-')}>{seatType}</Option>
        ))}
      </SelectInputField>

      <TextAreaInput
        label="Description"
        name="description"
        placeholder="enter a short description"
      />
    </>
  );
}

export default TrainTypeFormFields;
