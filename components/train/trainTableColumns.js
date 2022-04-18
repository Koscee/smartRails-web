import { SwapRightOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { DeleteButton, EditButton, RowButtonWrapper } from '../buttons';

export default function defineTrainTableColumns(
  trainsList,
  trainTypes,
  showEditModal,
  setSelectedItem,
  handleDelete
) {
  return [
    {
      title: '#',
      dataIndex: 'sno',
      width: 60,
      align: 'center',
      render: (_, __, index) => <span>{index + 1}</span>,
    },

    {
      title: 'Name',
      dataIndex: 'train_no',
      filters: trainsList.map(({ train_no }) => ({
        text: <span>{train_no}</span>,
        value: train_no,
      })),
      filterSearch: (input, record) =>
        record.value.toLowerCase().indexOf(input.toLowerCase()) > -1,
      onFilter: (value, record) => record.train_no.includes(value),
    },

    {
      title: 'Type',
      dataIndex: 'service_class',
      render: ({ name }) => <span>{name}</span>,
      filters: trainTypes.map(({ name }) => ({
        text: <span>{name}</span>,
        value: name,
      })),
      filterSearch: (input, record) =>
        record.value.toLowerCase().indexOf(input.toLowerCase()) > -1,
      onFilter: (value, record) => record.service_class.name.includes(value),
    },

    {
      title: 'Total cars',
      dataIndex: 'total_cars',
      align: 'right',
      sorter: (a, b) => a.total_cars - b.total_cars,
    },

    {
      title: 'Total seats',
      dataIndex: 'pssngr_capacity',
      align: 'right',
      sorter: (a, b) => a.pssngr_capacity - b.pssngr_capacity,
    },

    {
      title: 'Avg speed (km/h)',
      dataIndex: 'service_class',
      align: 'right',
      render: ({ avg_speed }) => <span>{avg_speed}</span>,
      sorter: (a, b) => a.pssngr_capacity - b.pssngr_capacity,
    },

    {
      title: 'Route',
      dataIndex: 'route',
      render: ({ start_station, end_station }) => (
        <span>
          {`${start_station}`} <SwapRightOutlined /> {`${end_station}`}
        </span>
      ),
      filters: [...new Set(trainsList.map(({ route }) => route))].map(
        ({ start_station, end_station }) => ({
          text: (
            <span>
              {`${start_station}`} <SwapRightOutlined /> {`${end_station}`}
            </span>
          ),
          value: `${start_station} -- ${end_station}`,
        })
      ),
      filterSearch: (input, record) =>
        record.value.toLowerCase().indexOf(input.toLowerCase()) > -1,
      onFilter: (value, record) =>
        value.includes(record.route.start_station) ||
        value.includes(record.route.end_station),
    },

    {
      title: 'Schedule status',
      dataIndex: 'is_scheduled',
      render: (status) => <span>{status ? 'Busy' : 'Available'}</span>,
      filters: [true, false].map((status) => ({
        text: <span>{status ? 'Busy' : 'Available'}</span>,
        value: status,
      })),
      onFilter: (value, record) => record.is_scheduled === value,
    },

    {
      title: 'Current station',
      dataIndex: 'curr_station',
      render: (currStation) => <span>{currStation}</span>,
    },

    {
      title: 'Action',
      dataIndex: 'action',
      width: 100,
      render: (_, record) =>
        trainsList?.length >= 1 ? (
          <RowButtonWrapper size="middle">
            <EditButton
              onClick={() => {
                if (!record.is_scheduled) {
                  setSelectedItem(record);
                  showEditModal();
                } else {
                  Modal.warning({
                    title: 'Warning!',
                    content: 'Train is busy, try updating later...',
                  });
                }
              }}
            />

            <DeleteButton onConfirm={() => handleDelete(record._id)} />
          </RowButtonWrapper>
        ) : null,
    },
  ];
}
