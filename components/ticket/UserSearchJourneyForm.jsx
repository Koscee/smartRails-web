import { Button, DatePicker, Form, Select, Row, Col } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { CalendarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import styles from './styles/UserSearchJourneyForm.module.css';
import { getStations } from '../../actions/stationActions';
import { TicketPurchaseContext } from '../../contexts/TicketPurchaseContext';
import { FormItem, SelectInputField } from '../form-elements';

const { Option } = Select;

function UserSearchJourneyForm({ onSearch, initialValues = null }) {
  const { loading } = useContext(TicketPurchaseContext);
  const [stations, setStations] = useState([]);

  useEffect(() => {
    (async () => {
      const stationsList = await getStations();
      setStations(stationsList);
    })();
  }, []);

  const renderInputLabel = (text, Icon) => (
    <span>
      <Icon className={styles.input_label_icon} />
      <span className={styles.input_label_text}>&nbsp;{text}</span>
    </span>
  );

  const renderSelectOptions = (keyPrefix) =>
    stations.map(({ _id, en_name, cn_name }) => (
      <Option key={`${keyPrefix}-${_id}`} value={en_name}>
        {`${en_name} (${cn_name})`}
      </Option>
    ));

  const disabledDate = (current) => current && current < moment().endOf('day');

  const formInitialValues = initialValues;
  if (formInitialValues) {
    const { dep_date } = formInitialValues;
    formInitialValues.dep_date = moment(dep_date);
  }

  return (
    <div>
      <Form
        layout="vertical"
        size="small"
        initialValues={
          formInitialValues || {
            from: 'Beijing',
            to: 'Shenzhen',
            dep_date: moment(),
          }
        }
        onFinish={onSearch}
        className={styles.form}
        requiredMark={false}
      >
        <Row align="middle" className={styles.form_row}>
          <Col xs={6} sm={6} md={6} lg={8} xl={6}>
            <SelectInputField
              label={renderInputLabel('From', EnvironmentOutlined)}
              name="from"
              showSearch
              bordered={false}
              suffixIcon={null}
              className={styles.input_item}
              rules={[{ required: true, message: 'Field reuqired' }]}
              placeholder="depature station"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {renderSelectOptions('dep')}
            </SelectInputField>
          </Col>
          <Col xs={6} sm={6} md={6} lg={8} xl={6}>
            <SelectInputField
              label={renderInputLabel('To', EnvironmentOutlined)}
              name="to"
              showSearch
              bordered={false}
              suffixIcon={null}
              className={styles.input_item}
              rules={[{ required: true, message: 'Field reuqired' }]}
              placeholder="arrival station"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {renderSelectOptions('arr')}
            </SelectInputField>
          </Col>
          <Col xs={6} sm={6} md={6} lg={8} xl={6}>
            <FormItem
              label={renderInputLabel('Date', CalendarOutlined)}
              name="dep_date"
              className={styles.input_item}
              rules={[{ required: true, message: 'Field reuqired' }]}
            >
              <DatePicker
                allowClear={false}
                bordered={false}
                suffixIcon={null}
                disabledDate={disabledDate}
                placeholder="departure date"
                className={styles.date_picker}
              />
            </FormItem>
          </Col>
          <Col xs={6} sm={6} md={4}>
            <Form.Item className={styles.input_item}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading.searchBtn}
                className={styles.search_btn}
              >
                Search
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default UserSearchJourneyForm;
