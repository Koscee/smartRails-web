import { Badge, Button, Popconfirm, Space } from 'antd';

export default function defineStationTableColumns(
  stationsList,
  cities,
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
      dataIndex: 'name',
      // render: (_, { en_name, cn_name }) => `${en_name} (${cn_name})`,
      children: [
        {
          title: 'English',
          dataIndex: 'en_name',
          render: (_, { en_name }) => <span>{en_name}</span>,
        },
        {
          title: 'Chinese',
          dataIndex: 'cn_name',
          render: (_, { cn_name }) => <span>{cn_name}</span>,
        },
      ],
      filters: stationsList.map(({ en_name, cn_name }) => ({
        text: <span>{`${en_name} (${cn_name})`}</span>,
        value: en_name,
      })),
      filterSearch: (input, record) =>
        record.value.toLowerCase().indexOf(input.toLowerCase()) > -1,
      onFilter: (value, record) => record.en_name.includes(value),
    },

    {
      title: 'Type',
      dataIndex: 'type',
      width: 80,
      filters: [
        { text: <span>city</span>, value: 'city' },
        { text: <span>stop</span>, value: 'stop' },
      ],
      onFilter: (value, record) => record.type.includes(value),
    },

    {
      title: 'Address',
      dataIndex: 'address',
      children: [
        {
          title: 'City',
          dataIndex: 'city',
          render: (_, record) => <span>{record.city.cn_name}</span>,
        },
        {
          title: 'Province',
          dataIndex: 'state',
          render: (_, record) => <span>{record.city.state}</span>,
        },
      ],
    },

    {
      title: 'Contact',
      dataIndex: 'tel_no',
      render: (text) => <span>{text || '---'}</span>,
    },

    {
      title: 'Status',
      dataIndex: 'is_closed',
      render: (text, record) => (
        <span>
          <Badge status={!record.is_closed ? 'success' : 'error'} />
          {!record.is_closed ? 'Operating' : 'Closed'}
        </span>
      ),
    },

    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) =>
        stationsList.length >= 1 ? (
          <Space size="large">
            <Button
              type="link"
              style={{ padding: 0 }}
              onClick={() => {
                setSelectedItem(record);
                showEditModal();
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record._id)}
            >
              <Button type="link" style={{ padding: 0 }}>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        ) : null,
    },
  ];
}
