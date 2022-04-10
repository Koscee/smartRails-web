const sideNavMenuItems = [
  {
    key: '1',
    text: 'Dashboard',
    href: '/admin/dashboard',
    icon: '',
  },
  {
    key: '2',
    text: 'Trains',
    // href: '/admin/trains',
    icon: '',
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
    icon: '',
  },
  {
    key: '4',
    text: 'Routes',
    href: '/admin/routes',
    icon: '',
  },
  {
    key: '5',
    text: 'Stations',
    href: '/admin/stations',
    icon: '',
  },
  {
    key: '6',
    text: 'Bookings',
    href: '/admin/bookings',
    icon: '',
  },
  {
    key: '7',
    text: 'Passengers',
    href: '/admin/passengers',
    icon: '',
  },
];

export default sideNavMenuItems;
