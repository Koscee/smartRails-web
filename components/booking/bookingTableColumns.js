import { Tag } from 'antd';
import moment from 'moment';
import { DATE_FORMAT, TIME_FORMAT } from '../../utils/constants';
import TICKET_STATUS from '../../utils/ticketStatus';
import { ActionButton, RowButtonWrapper } from '../buttons';

export default function defineBookingTableColumns(
  bookings,
  setSelectedItem,
  showDetailsModal,
  handleCancelBooking
) {
  return [
    {
      title: '#',
      dataIndex: 'sno',
      width: 60,
      fixed: 'left',
      align: 'center',
      render: (_, __, index) => <span>{index + 1}</span>,
    },

    {
      title: 'BookingId',
      dataIndex: '_id',
      fixed: 'left',
      width: 200,
      filters: bookings.map(({ _id }) => ({
        text: <span>{_id}</span>,
        value: _id,
      })),
      filterSearch: (input, record) =>
        record.value.toLowerCase().indexOf(input.toLowerCase()) > -1,
      onFilter: (value, record) => record._id.includes(value),
    },

    {
      title: 'Passenger',
      dataIndex: 'passenger',
      width: 200,
      render: ({ full_name }) => <span>{full_name}</span>,
    },

    {
      title: 'Train',
      dataIndex: 'seat',
      render: ({ train_no }) => <span>{train_no}</span>,
    },

    {
      title: 'Paid Amount (￥)',
      dataIndex: 'paid_amount',
      align: 'right',
      sorter: (a, b) => a.paid_amount - b.paid_amount,
    },

    {
      title: 'Refund Amount (￥)',
      dataIndex: 'refund_amount',
      align: 'right',
      sorter: (a, b) => a.refund_amount - b.refund_amount,
    },

    {
      title: 'Status',
      dataIndex: 'status',
      filters: [
        { text: <span>pending</span>, value: 'pending' },
        { text: <span>complete</span>, value: 'complete' },
        { text: <span>cancelled</span>, value: 'cancelled' },
        { text: <span>expired</span>, value: 'expired' },
      ],
      onFilter: (value, record) => record.status.includes(value),
      render: (status) => (
        <Tag color={TICKET_STATUS[status].color}>{status}</Tag>
      ),
    },

    {
      title: 'Creation Date',
      dataIndex: 'created_at',
      render: (created_at) => (
        <span>{`${moment(created_at).format(
          `${DATE_FORMAT} ${TIME_FORMAT}`
        )}`}</span>
      ),
    },

    {
      title: 'Action',
      fixed: 'right',
      dataIndex: 'action',
      width: 120,
      render: (_, record) =>
        bookings?.length >= 1 ? (
          <RowButtonWrapper size="large">
            <ActionButton
              text="View"
              onClick={() => {
                const selectedItem = record;
                selectedItem.created_at = `${moment(
                  selectedItem.created_at
                ).format(`${DATE_FORMAT} ${TIME_FORMAT}`)}`;
                setSelectedItem(selectedItem);
                showDetailsModal();
              }}
            />
            <ActionButton
              text="Refund"
              danger
              disabled={
                record.status === 'cancelled' ||
                record.status === 'expired' ||
                moment(record?.schedule?.dep_date).diff(moment(), 'days') < 1
              }
              onClick={() => handleCancelBooking(record)}
            />
          </RowButtonWrapper>
        ) : null,
    },
  ];
}
