import { Icon } from '@chakra-ui/react';
import { common } from 'config/translations/common';
import { MdPerson, MdDashboard } from 'react-icons/md';
import { SidebarItemInfo } from 'utils/routeUtils';

const items: SidebarItemInfo[] = [
  {
    name: <common.T text="dashboard" />,
    path: '/user/home',
    icon: <Icon as={MdDashboard} width="20px" height="20px" color="inherit" />,
  },
  {
    name: <common.T text="profile" />,
    path: '/user/profile',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  },
];

export default items;
