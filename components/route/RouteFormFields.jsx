import React, { useState } from 'react';
import { Select } from 'antd';
import { SelectInputField } from '../form-elements';

const { Option } = Select;

function RouteFormFields({ stations }) {
  const [stopsOptions, setStopsOptions] = useState(stations);

  const onSelectOptionChange = (value) => {
    const newOptions = stopsOptions.filter(
      (option) => value !== option.en_name
    );
    setStopsOptions(newOptions);
  };

  return (
    <>
      <SelectInputField
        label="Start Station"
        name="start_station"
        rules={[{ required: true, message: 'Please select a start station!' }]}
        showSearch
        placeholder="Select start station"
        onChange={onSelectOptionChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {stations.map(({ _id, en_name, cn_name }) => (
          <Option key={`start-${_id}`} value={en_name}>
            {`${en_name} (${cn_name})`}
          </Option>
        ))}
      </SelectInputField>

      <SelectInputField
        label="End Station"
        name="end_station"
        rules={[{ required: true, message: 'Please select a end station!' }]}
        showSearch
        placeholder="Select end station"
        onChange={onSelectOptionChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {stations.map(({ _id, en_name, cn_name }) => (
          <Option key={`end-${_id}`} value={en_name}>
            {`${en_name} (${cn_name})`}
          </Option>
        ))}
      </SelectInputField>

      <SelectInputField
        label="Stops"
        name="stops"
        fieldTooltip="Train stations in between start and end stations"
        mode="multiple"
        placeholder="select the lists to stops"
      >
        {stopsOptions.map(({ _id, en_name, cn_name }) => (
          <Option key={`stop-${_id}`} value={_id}>
            {`${en_name} (${cn_name})`}
          </Option>
        ))}
      </SelectInputField>
    </>
  );
}

export default RouteFormFields;
