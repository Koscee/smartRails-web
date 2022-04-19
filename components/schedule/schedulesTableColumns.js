import formatTimeDuration from '../../utils/duration';

export default function defineSchedulesTableColumns() {
  return [
    {
      title: '#',
      dataIndex: 'sno',
      width: 60,
      align: 'center',
      render: (_, __, index) => <span>{index + 1}</span>,
    },

    {
      title: 'Train',
      dataIndex: 'train_no',
    },

    {
      title: 'From',
      dataIndex: 'from',
    },

    {
      title: 'To',
      dataIndex: 'to',
    },

    {
      title: 'Depature date',
      dataIndex: 'dep_date',
      render: (dep_date, { dep_time }) => (
        <span>{`${dep_date} ${dep_time}`}</span>
      ),
    },

    {
      title: 'Arrival date',
      dataIndex: 'arr_date',
      render: (arr_date, { arr_time }) => (
        <span>{`${arr_date} ${arr_time}`}</span>
      ),
    },

    {
      title: 'Wait time',
      dataIndex: 'wait_time',
      render: (waitTimeString) => {
        const waitTime = Number(waitTimeString);
        if (waitTime) {
          return <span>{formatTimeDuration(waitTime)}</span>;
        }
        return <span>{waitTimeString}</span>;
      },
      sorter: (a, b) => Number(a.wait_time) - Number(b.wait_time),
    },

    {
      title: 'Total time',
      dataIndex: 'total_time',
      render: (totalTimeString) => {
        const totalTime = Number(totalTimeString);
        if (totalTime) {
          return <span>{formatTimeDuration(totalTime)}</span>;
        }
        return <span>{totalTimeString}</span>;
      },
      sorter: (a, b) => a.total_time - b.total_time,
    },
  ];
}
