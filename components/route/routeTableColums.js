import { Tag } from 'antd';
import { DeleteButton, EditButton, RowButtonWrapper } from '../buttons';

export default function defineRouteTableColumns(
  routesList,
  stationsList,
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
      title: 'Start station',
      dataIndex: 'start_station',
      filters: stationsList.map(({ en_name, cn_name }) => ({
        text: <span>{`${en_name} (${cn_name})`}</span>,
        value: en_name,
      })),
      filterSearch: (input, record) =>
        record.value.toLowerCase().indexOf(input.toLowerCase()) > -1,
      onFilter: (value, record) => record.start_station.includes(value),
    },

    {
      title: 'End station',
      dataIndex: 'end_station',
      filters: stationsList.map(({ en_name, cn_name }) => ({
        text: <span>{`${en_name} (${cn_name})`}</span>,
        value: en_name,
      })),
      filterSearch: (input, record) =>
        record.value.toLowerCase().indexOf(input.toLowerCase()) > -1,
      onFilter: (value, record) => record.end_station.includes(value),
    },

    {
      title: 'Stops',
      dataIndex: 'stops',
      width: '30%',
      render: (stops) => (
        <span>
          {stops
            .filter((_, index) => index !== 0 && index !== stops.length - 1)
            .map(({ en_name }) => (
              <Tag key={Math.random().toFixed(10).slice(2)}>{en_name}</Tag>
            ))}
        </span>
      ),
    },

    {
      title: 'Total Distance (km)',
      dataIndex: 'total_dist',
      align: 'right',
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.total_dist - b.total_dist,
    },

    {
      title: 'Action',
      dataIndex: 'action',
      width: 110,
      render: (_, record) =>
        routesList?.length >= 1 ? (
          <RowButtonWrapper size="middle">
            <EditButton
              onClick={() => {
                setSelectedItem(record);
                showEditModal();
              }}
            />

            <DeleteButton onConfirm={() => handleDelete(record._id)} />
          </RowButtonWrapper>
        ) : null,
    },
  ];
}
