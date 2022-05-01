import { SwapRightOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space, Tag } from 'antd';
import formatTimeDuration from '../../utils/duration';

export default function defineAvailableTicketsTableColumns(handleBookBtnClick) {
  return [
    {
      title: 'Train No.',
      dataIndex: 'train_no',
      align: 'center',
      width: 100,
    },

    {
      title: 'Depature Time',
      dataIndex: 'from',
      align: 'center',
      render: (from, { from_cn, dep_time }) => (
        <Space direction="vertical">
          <span>{dep_time}</span>
          <span>{`${from} (${from_cn})`}</span>
        </Space>
      ),
    },

    {
      title: 'Travel time',
      dataIndex: 'total_time',
      align: 'center',
      render: (totalTimeString) => {
        const totalTime = Number(totalTimeString);
        if (totalTime) {
          return (
            <Space direction="vertical">
              <span>{formatTimeDuration(totalTime)}</span>
              <SwapRightOutlined
                style={{ width: '100px', fontSize: '1.4em' }}
              />
            </Space>
          );
        }
        return <span>{totalTimeString}</span>;
      },
      sorter: (a, b) => a.total_time - b.total_time,
    },

    {
      title: 'Arrival Time',
      dataIndex: 'to',
      align: 'center',
      render: (to, { to_cn, arr_time }) => (
        <Space direction="vertical">
          <span>{arr_time}</span>
          <span>{`${to} (${to_cn})`}</span>
        </Space>
      ),
    },

    {
      title: 'Price',
      dataIndex: 'tickets',
      width: '30%',
      align: 'left',
      sorter: (a, b) => a.distance - b.distance,
      render: (tickets, record) =>
        tickets.map((ticket) => (
          <div key={ticket._id}>
            <Row align="middle" style={{ margin: 8 }}>
              <Col span={8} style={{ textAlign: 'end' }}>
                <span>{ticket.seat_type}</span>
              </Col>
              <Col span={7} style={{ textAlign: 'center' }}>
                <span style={{ color: 'var(--accent-main)' }}>
                  {`￥${ticket.actual_price}`}
                </span>
                {ticket.curr_count < 15 && (
                  <Tag
                    color="geekblue"
                    style={{
                      padding: '0 3px',
                      margin: '0 8px',
                      lineHeight: 1,
                      transform: 'translateY(-4px)',
                    }}
                  >
                    {`${ticket.curr_count} left`}
                  </Tag>
                )}
              </Col>
              <Col span={7} offset={2}>
                <Button
                  type="primary"
                  size="small"
                  disabled={!ticket.is_available}
                  style={{
                    width: '90%',
                    background: ticket.is_available && 'var(--accent-light)',
                    border:
                      ticket.is_available && '1px solid var(--accent-light)',
                  }}
                  onClick={() => {
                    console.log('TICKET', ticket);
                    console.log('RECORD', record);
                    handleBookBtnClick(record, ticket);
                  }}
                >
                  Book
                </Button>
              </Col>
            </Row>
          </div>
        )),
    },
  ];
}
