import React, { useState, useContext } from 'react';
import { Button, Divider, Form, Select, Space } from 'antd';
import {
  DeleteOutlined,
  PlusOutlined,
  SwapRightOutlined,
} from '@ant-design/icons';
import { FormItem, InputField, SelectInputField } from '../form-elements';
import { FormContext } from '../form-elements/FormContainer';

const { Option } = Select;

const MIN_TRAIN_NO = 1;
const MAX_TRAIN_NO = 9999;

function TrainFormFields({ trainTypes, routes }) {
  const form = useContext(FormContext);

  const typeId = form.getFieldValue('service_class');
  const trainType = trainTypes.get(typeId);

  const [train, setTrain] = useState({
    typeOptions: {},
    type: trainType?.name || '',
    seatTypes: trainType?.seat_types || [],
  });

  const onSelectTrainClass = (value) => {
    const selectedTrainType = trainTypes.get(value);
    const { name, seat_types } = selectedTrainType;

    setTrain({
      ...train,
      typeOptions: selectedTrainType,
      type: name,
      seatTypes: seat_types,
    });
  };

  const renderTrainClassOptions = () => {
    const options = [];
    trainTypes.forEach(({ _id, name }) => {
      options.push(
        <Option key={_id} value={_id}>
          {name}
        </Option>
      );
    });
    return options;
  };

  const onTrainNumChange = (e) => {
    const num = parseInt(e.target.value, 10);
    if (Number.isNaN(num)) {
      form.setFieldsValue({ train_no: '' });
      return;
    }
    form.setFieldsValue({ train_no: num });
  };

  const checkTrainNumber = async (_, value) => {
    if (value >= MIN_TRAIN_NO && value <= MAX_TRAIN_NO) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error(
        `Train number must be between ${MIN_TRAIN_NO} - ${MAX_TRAIN_NO}!`
      )
    );
  };

  const onSelectSeatType = () => {
    const newSet = new Set(train.typeOptions.seat_types);
    form.getFieldValue('carriages').forEach((c) => newSet.delete(c?.seat_type));
    setTrain({ ...train, seatTypes: [...newSet] });
  };

  return (
    <>
      <SelectInputField
        label="Train Class"
        name="service_class"
        rules={[{ required: true, message: 'Please select a class type!' }]}
        showSearch
        placeholder="Select train class type"
        onChange={onSelectTrainClass}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {renderTrainClassOptions()}
      </SelectInputField>

      <InputField
        label="Train number"
        name="train_no"
        placeholder="enter a train number"
        prefix={train.type}
        onChange={onTrainNumChange}
        fieldTooltip={`Choose a number from ${MIN_TRAIN_NO} - ${MAX_TRAIN_NO}`}
        rules={[{ required: true, validator: checkTrainNumber }]}
      />

      <SelectInputField
        label="Route"
        name="route"
        rules={[{ required: true, message: 'Please select a route!' }]}
        showSearch
        placeholder="Select train route"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {routes.map(({ _id, start_station, end_station }) => (
          <Option key={_id} value={_id}>
            {`${start_station}`} <SwapRightOutlined /> {`${end_station}`}
          </Option>
        ))}
      </SelectInputField>

      <FormItem label="Coaches">
        <Divider />
        <Form.List name="carriages">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }) => (
                <Space
                  key={key}
                  size="middle"
                  align="center"
                  style={{ display: 'flex', marginBottom: 8 }}
                >
                  <FormItem style={{ marginBottom: '0' }}>
                    <SelectInputField
                      name={[name, 'cars']}
                      mode="tags"
                      rules={[
                        {
                          required: true,
                          message:
                            'Enter list of train coach numbers that have the below chosen seat type!',
                        },
                      ]}
                      placeholder="enter list of car numbers"
                      itemStyle={{ marginBottom: '10px' }}
                      // fieldTooltip="Enter the list of car numbers that have this seat type"
                    >
                      <Option value="1">1</Option>
                    </SelectInputField>

                    <Space size="small">
                      <SelectInputField
                        name={[name, 'seat_type']}
                        placeholder="select seat type"
                        onChange={onSelectSeatType}
                        style={{ width: '160px' }}
                        rules={[
                          {
                            required: true,
                            message: 'Select seat type!',
                          },
                        ]}
                      >
                        {train.seatTypes.map((seatType) => (
                          <Option key={seatType.trim()} value={seatType}>
                            {seatType}
                          </Option>
                        ))}
                      </SelectInputField>
                      <InputField
                        name={[name, 'max_seats_per_car']}
                        type="number"
                        placeholder="total seats per coach"
                        rules={[
                          {
                            required: true,
                            message: 'No. of seats per coach',
                          },
                        ]}
                        // fieldTooltip="Total number of seats that a car with this seat type have"
                      />
                    </Space>
                  </FormItem>

                  <DeleteOutlined
                    onClick={() => remove(name)}
                    style={{ marginBottom: 25 }}
                  />
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add coaches
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </FormItem>
    </>
  );
}

export default TrainFormFields;
