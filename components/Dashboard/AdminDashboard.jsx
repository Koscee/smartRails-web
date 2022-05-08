import Icon, {
  ApartmentOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  InsertRowRightOutlined,
  NodeIndexOutlined,
  ScheduleOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Col, Row, Statistic, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './admin-dashboard.module.css';
import TrainSvg from '../../public/assets/train.svg';
import { defineSchedulesTableColumns } from '../schedule';
import LoadingSpinner from '../LoadingSpinner';
import getSystemRecordsSummary from '../../actions/dashboardActions';

export default function AdminDashboard() {
  const [summary, setSummary] = useState(null);
  const { dataStatistic, latestSchedules } = summary || {};

  useEffect(() => {
    (async () => {
      const data = await getSystemRecordsSummary();
      setSummary(data);
    })();
  }, []);

  const scheduleTableColums = defineSchedulesTableColumns();

  return !summary ? (
    <LoadingSpinner />
  ) : (
    <div>
      <div className={styles.statistic_section}>
        <Row gutter={22} className={styles.statistic_section_row}>
          <Col span={12}>
            <Row>
              <Col span={10}>
                <Statistic
                  title="Revenue (CNY)"
                  value={dataStatistic.totalRevenue || 0}
                  precision={2}
                />
              </Col>
              <Col
                span={7}
                className={styles.statistic_section_inventory_action}
              >
                <Statistic
                  title="Purchases"
                  value={dataStatistic.purchaseRate || 0}
                  precision={2}
                  valueStyle={{ color: '#3f8600', fontSize: '1.2em' }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Col>
              <Col
                span={7}
                className={styles.statistic_section_inventory_action}
              >
                <Statistic
                  title="Refunds"
                  value={dataStatistic.refundRate || 0}
                  precision={2}
                  valueStyle={{ color: '#cf1322', fontSize: '1.2em' }}
                  prefix={<ArrowDownOutlined />}
                  suffix="%"
                />
              </Col>
            </Row>
          </Col>
          <Col span={6}>
            <Statistic
              title="Schedules"
              value={dataStatistic.totalSchedules}
              prefix={<ScheduleOutlined />}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Passengers"
              value={dataStatistic.totalPassengers}
              prefix={<UsergroupAddOutlined />}
            />
          </Col>
        </Row>

        <Row gutter={22} className={styles.statistic_section_row}>
          <Col span={6}>
            <Statistic
              title="Stations"
              value={dataStatistic.totalStations}
              prefix={<InsertRowRightOutlined />}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Routes"
              value={dataStatistic.totalRoutes}
              prefix={<NodeIndexOutlined />}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Trains"
              value={dataStatistic.totalTrains}
              prefix={<Icon component={TrainSvg} />}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Train Types"
              value={dataStatistic.totalTrainTypes}
              prefix={<ApartmentOutlined />}
            />
          </Col>
        </Row>
      </div>

      <div className={styles.latest_schedules}>
        <h3>Latest Schedules</h3>
        <Table
          bordered
          dataSource={latestSchedules}
          size="small"
          columns={scheduleTableColums}
          scroll={{ y: 350 }}
          rowKey={(record) => record._id}
        />
      </div>
    </div>
  );
}
