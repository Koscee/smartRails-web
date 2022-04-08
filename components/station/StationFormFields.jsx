import React from 'react';
import { Select } from 'antd';
import {
  InputField,
  InputGroupField,
  SelectInputField,
  //   TimeRangePicker,
} from '../form-elements';

const { Option } = Select;

function StationFormFields({ cities /* ,onTimeChange */ }) {
  /* const [timeRange, setTimeRange] = useState('');

  const onTimeChange = (time, timeString) => {
    setTimeRange(timeString.join(' - '));
  }; */

  return (
    <>
      <InputField
        label="Name"
        name="en_name"
        placeholder="enter station english name"
        rules={[
          {
            required: true,
            message: 'Please input station name!',
            whitespace: true,
          },
        ]}
      />
      <InputField
        label="Chinese Name"
        name="cn_name"
        placeholder="enter station chinese name"
      />
      <SelectInputField
        label="Type"
        name="type"
        rules={[{ required: true, message: 'Please select station type!' }]}
        placeholder="Select station type"
      >
        <Option value="city">city</Option>
        <Option value="stop">stop</Option>
      </SelectInputField>
      <SelectInputField
        label="City"
        name="city"
        rules={[{ required: true, message: 'Please select a city!' }]}
        showSearch
        placeholder="Select station city"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {cities.map(({ _id, en_name, tag }) => (
          <Option key={_id} value={en_name}>{`${en_name} (${tag})`}</Option>
        ))}
      </SelectInputField>
      <InputGroupField label="Location" required>
        <InputField
          name="lon"
          placeholder="longitude"
          type="number"
          width="50%"
          rules={[{ required: true, message: 'Longitude is required' }]}
        />
        <InputField
          name="lat"
          placeholder="latitude"
          type="number"
          width="50%"
          rules={[{ required: true, message: 'Latitude is required' }]}
        />
      </InputGroupField>
      {/* <TimeRangePicker
        label="Service Hours"
        name="service_hrs"
        format="h:mm a"
        onChange={onTimeChange}
      /> */}
      <SelectInputField
        label="Ticket Counters"
        name="counters"
        fieldTooltip="Type and press enter key to input multiple name lists of station ticket counters"
        mode="tags"
        placeholder="enter name lists of station ticket counters"
      >
        <Option value="A">A</Option>
        <Option value="001">01</Option>
      </SelectInputField>
      <InputField
        label="Telephone"
        name="tel_no"
        type="tel"
        placeholder="enter station telephone number"
      />
    </>
  );
}

export default StationFormFields;
