import Icon, {
  AccountBookOutlined,
  InsertRowRightOutlined,
  LayoutOutlined,
  NodeIndexOutlined,
  ScheduleOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import TrainSvg from '../../public/assets/train-round.svg';

const sideNavMenuItems = [
  {
    key: '1',
    text: 'Dashboard',
    href: '/admin/dashboard',
    icon: <LayoutOutlined />,
  },
  {
    key: '2',
    text: 'Trains',
    // href: '/admin/trains',
    icon: <Icon component={TrainSvg} />,
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
    icon: <ScheduleOutlined />,
  },
  {
    key: '4',
    text: 'Routes',
    href: '/admin/routes',
    icon: <NodeIndexOutlined />,
  },
  {
    key: '5',
    text: 'Stations',
    href: '/admin/stations',
    icon: <InsertRowRightOutlined />,
  },
  {
    key: '6',
    text: 'Bookings',
    href: '/admin/bookings',
    icon: <AccountBookOutlined />,
  },
  {
    key: '7',
    text: 'Passengers',
    href: '/admin/passengers',
    icon: <UsergroupAddOutlined />,
  },
];

export default sideNavMenuItems;
