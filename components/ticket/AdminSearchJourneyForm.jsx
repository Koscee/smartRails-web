import { Button, DatePicker, Form, Select, Row, Col } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { getSchedules } from '../../actions/scheduleActions';
import { getStations } from '../../actions/stationActions';
import { TicketPurchaseContext } from '../../contexts/TicketPurchaseContext';
import { DATE_FORMAT } from '../../utils/constants';
import { FormItem, SelectInputField } from '../form-elements';

const { Option } = Select;

function AdminSearchJourneyForm() {
  const { loading, setLoading, setAvailableTickets } = useContext(
    TicketPurchaseContext
  );
  const [stations, setStations] = useState([]);

  useEffect(() => {
    (async () => {
      const stationsList = await getStations();
      setStations(stationsList);
    })();
  }, []);

  const renderSelectOptions = (keyPrefix) =>
    stations.map(({ _id, en_name, cn_name }) => (
      <Option key={`${keyPrefix}-${_id}`} value={en_name}>
        {`${en_name} (${cn_name})`}
      </Option>
    ));

  const disabledDate = (current) => current && current < moment().endOf('day');

  const onSearch = async (formData) => {
    const searchQuery = formData;
    searchQuery.dep_date = searchQuery.dep_date.format(DATE_FORMAT);

    // set loading
    setLoading({ searchBtn: true, table: true });
    // call getSchedules action.
    const foundAvailableTickets = await getSchedules(searchQuery);
    console.log(searchQuery);
    console.log(foundAvailableTickets);

    setAvailableTickets(foundAvailableTickets);
    // unset loading
    setLoading({ searchBtn: false, table: false });
  };

  return (
    <div>
      <Form layout="vertical" onFinish={onSearch}>
        <Row align="middle" gutter={{ xs: 4, sm: 8, md: 16, lg: 24 }}>
          <Col xs={24} sm={24} md={6} lg={8} xl={6}>
            <SelectInputField
              label="From"
              name="from"
              rules={[{ required: true, message: 'Field reuqired' }]}
              showSearch
              placeholder="depature station"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {renderSelectOptions('dep')}
            </SelectInputField>
          </Col>
          <Col xs={24} sm={24} md={6} lg={8} xl={6}>
            <SelectInputField
              label="To"
              name="to"
              rules={[{ required: true, message: 'Field reuqired' }]}
              showSearch
              placeholder="arrival station"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {renderSelectOptions('arr')}
            </SelectInputField>
          </Col>
          <Col xs={24} sm={24} md={6} lg={4} xl={4}>
            <FormItem
              label="Date"
              name="dep_date"
              rules={[{ required: true, message: 'Field reuqired' }]}
            >
              <DatePicker
                placeholder="departure date"
                disabledDate={disabledDate}
                style={{ width: '100%' }}
              />
            </FormItem>
          </Col>
          <Col xs={18} sm={6} md={3}>
            <Form.Item label>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading.searchBtn}
                style={{ width: '100%' }}
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

export default AdminSearchJourneyForm;
