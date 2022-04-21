import { DeleteButton, EditButton, RowButtonWrapper } from '../buttons';
import identityTypes from '../../utils/identityTypes';
import countries from '../../utils/countries.json';

export default function definePassengerTableColumns(
  passengers,
  showEditModal,
  setSelectedItem,
  handleDelete
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
      title: 'Full Name',
      dataIndex: 'full_name',
      width: 200,
      fixed: 'left',
      filters: passengers.map(({ full_name }) => ({
        text: <span>{full_name}</span>,
        value: full_name,
      })),
      filterSearch: (input, record) =>
        record.value.toLowerCase().indexOf(input.toLowerCase()) > -1,
      onFilter: (value, record) => record.full_name.includes(value),
    },

    {
      title: 'Gender',
      dataIndex: 'gender',
      width: 100,
      filters: [
        { text: <span>M</span>, value: 'M' },
        { text: <span>F</span>, value: 'F' },
      ],
      onFilter: (value, record) => record.gender.includes(value),
    },

    {
      title: 'Birthday',
      dataIndex: 'dOB',
      filters: [...new Set(passengers.map(({ dOB }) => dOB))].map((date) => ({
        text: <span>{date}</span>,
        value: date,
      })),
      filterSearch: (input, record) =>
        record.value.toLowerCase().indexOf(input.toLowerCase()) > -1,
      onFilter: (value, record) => record.dOB.includes(value),
    },

    {
      title: 'Nationality',
      dataIndex: 'nationality',
      filters: countries.map(({ value }) => {
        const [cn, en] = value.split(',');
        return {
          text: <span>{`${en} (${cn})`}</span>,
          value: en,
        };
      }),
      filterSearch: (input, record) =>
        record.value.toLowerCase().indexOf(input.toLowerCase()) > -1,
      onFilter: (value, record) => record.nationality.includes(value),
    },

    {
      title: 'Identity',
      dataIndex: 'identity',
      children: [
        {
          title: 'Type',
          dataIndex: 'ID_type',
          filters: identityTypes.map((type) => ({
            text: <span>{type}</span>,
            value: type.toLowerCase(),
          })),
          filterSearch: (input, record) =>
            record.value.toLowerCase().indexOf(input.toLowerCase()) > -1,
          onFilter: (value, record) => record.ID_type.includes(value),
        },

        {
          title: 'Number',
          dataIndex: 'ID_no',
          filters: passengers.map(({ ID_no }) => ({
            text: <span>{ID_no}</span>,
            value: ID_no,
          })),
          filterSearch: (input, record) =>
            record.value.toLowerCase().indexOf(input.toLowerCase()) > -1,
          onFilter: (value, record) => record.ID_no.includes(value),
        },
        {
          title: 'Expiry Date',
          dataIndex: 'ID_exp_date',
          filters: [
            ...new Set(passengers.map(({ ID_exp_date }) => ID_exp_date)),
          ].map((date) => ({
            text: <span>{date}</span>,
            value: date,
          })),
          filterSearch: (input, record) =>
            record.value.toLowerCase().indexOf(input.toLowerCase()) > -1,
          onFilter: (value, record) => record.ID_exp_date.includes(value),
        },
      ],
    },

    {
      title: 'Phone No.',
      dataIndex: 'phone_no',
    },

    {
      title: 'Action',
      fixed: 'right',
      dataIndex: 'action',
      width: 100,
      render: (_, record) =>
        passengers?.length >= 1 ? (
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
