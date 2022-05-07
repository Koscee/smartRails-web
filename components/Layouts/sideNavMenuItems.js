import Icon, {
  AccountBookOutlined,
  InsertRowRightOutlined,
  LayoutOutlined,
  NodeIndexOutlined,
  ScheduleOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import TrainSvg from '../../public/assets/train-round.svg';

const iconStyle = { fontSize: '1.2em' };

const sideNavMenuItems = [
  {
    key: '1',
    text: 'Dashboard',
    href: '/admin/dashboard',
    icon: <LayoutOutlined style={iconStyle} />,
  },
  {
    key: '2',
    text: 'Trains',
    // href: '/admin/trains',
    icon: <Icon component={TrainSvg} style={iconStyle} />,
    children: [
      {
        key: '2.1',
        text: 'Manage Trains',
        href: '/admin/trains',
        icon: '',
      },
      {
        key: '2.2',
        text: 'Service Class',
        href: '/admin/trains/types',
      },
    ],
  },
  {
    key: '3',
    text: 'Schedules',
    href: '/admin/schedules',
    icon: <ScheduleOutlined style={iconStyle} />,
  },
  {
    key: '4',
    text: 'Routes',
    href: '/admin/routes',
    icon: <NodeIndexOutlined style={iconStyle} />,
  },
  {
    key: '5',
    text: 'Stations',
    href: '/admin/stations',
    icon: <InsertRowRightOutlined style={iconStyle} />,
  },
  {
    key: '6',
    text: 'Bookings',
    // href: '/admin/bookings',
    icon: <AccountBookOutlined style={iconStyle} />,
    children: [
      {
        key: '6.1',
        text: 'Manage Bookings',
        href: '/admin/bookings',
      },
      {
        key: '6.2',
        text: 'Purchase Ticket',
        href: '/admin/bookings/available-tickets',
      },
    ],
  },
  {
    key: '7',
    text: 'Passengers',
    href: '/admin/passengers',
    icon: <UsergroupAddOutlined style={iconStyle} />,
  },
];

export default sideNavMenuItems;
