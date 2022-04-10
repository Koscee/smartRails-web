import { Tag } from 'antd';
import { DeleteButton, EditButton, RowButtonWrapper } from '../../buttons';

export default function defineTrainTypeTableColumns(
  trainTypesList,
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
      title: 'Type',
      dataIndex: 'name',
      width: 80,
      filters: trainTypesList.map(({ name }) => ({
        text: <span>{name}</span>,
        value: name,
      })),
      filterSearch: (input, record) =>
        record.value.toLowerCase().indexOf(input.toLowerCase()) > -1,
      onFilter: (value, record) => record.name.includes(value),
    },

    {
      title: 'Maximum Speed (km/h)',
      dataIndex: 'max_speed',
      align: 'right',
      sorter: (a, b) => a.max_speed - b.max_speed,
    },

    {
      title: 'Minimum Speed (km/h)',
      dataIndex: 'min_speed',
      align: 'right',
      sorter: (a, b) => a.min_speed - b.min_speed,
    },

    {
      title: 'Average Speed (km/h)',
      dataIndex: 'avg_speed',
      align: 'right',
      sorter: (a, b) => a.avg_speed - b.avg_speed,
    },

    {
      title: 'Rail Type',
      dataIndex: 'rail_type',
      filters: [
        { text: <span>High speed</span>, value: 'High speed' },
        { text: <span>Conventional</span>, value: 'Conventional' },
      ],
      onFilter: (value, record) => record.rail_type.includes(value),
    },

    {
      title: 'Seat Types',
      dataIndex: 'seat_types',
      render: (seatTypes) => (
        <span>
          {seatTypes.map((type) => (
            <Tag key={Math.random().toFixed(5).slice(2)}>{type}</Tag>
          ))}
        </span>
      ),
    },

    {
      title: 'Description',
      dataIndex: 'description',
    },

    {
      title: 'Action',
      dataIndex: 'action',
      width: 110,
      render: (_, record) =>
        trainTypesList?.length >= 1 ? (
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
