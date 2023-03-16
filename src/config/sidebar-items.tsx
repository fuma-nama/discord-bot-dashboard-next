import { Icon } from '@chakra-ui/react';
import { common } from '@/config/translations/common';
import { MdPerson, MdDashboard } from 'react-icons/md';
import { SidebarItemInfo } from '@/utils/router';

const items: SidebarItemInfo[] = [
  {
    name: <common.T text="dashboard" />,
    path: '/user/home',
    icon: <Icon as={MdDashboard} />,
  },
  {
    name: <common.T text="profile" />,
    path: '/user/profile',
    icon: <Icon as={MdPerson} />,
  },
];

export default items;
