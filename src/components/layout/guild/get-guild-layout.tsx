import { Box, Center } from '@chakra-ui/layout';
import AppLayout from '../app';
import { ReactNode } from 'react';
import GuildNavbar from './guild-navbar';
import { InGuildSidebar } from './guild-sidebar';

export default function getGuildLayout({
  back,
  children,
}: {
  back?: boolean;
  children: ReactNode;
}) {
  return (
    <AppLayout navbar={<GuildNavbar back={back} />} sidebar={back ? <InGuildSidebar /> : undefined}>
      {children}
    </AppLayout>
  );
}
