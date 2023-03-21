import { Box, Flex, Show } from '@chakra-ui/react';
import { QueryStatus } from '@/components/panel/QueryPanel';
import { useSelfUserQuery } from '@/api/hooks';
import { LoadingPanel } from '@/components/panel/LoadingPanel';
import { Navbar } from '@/components/layout/navbar';
import { Sidebar, SidebarResponsive } from './sidebar';
import { sidebarBreakpoint, navbarBreakpoint } from '@/theme/breakpoints';
import { ReactNode } from 'react';
import { DefaultNavbar } from './navbar/default';

export default function AppLayout({
  navbar,
  children,
  sidebar,
}: {
  navbar?: ReactNode;
  children: ReactNode;
  sidebar?: ReactNode;
}) {
  const query = useSelfUserQuery();

  return (
    <Flex direction="row" h="full">
      <Sidebar sidebar={sidebar} />
      <Show below={sidebarBreakpoint}>
        <SidebarResponsive sidebar={sidebar} />
      </Show>
      <QueryStatus query={query} loading={<LoadingPanel />} error="Failed to load user info">
        <Flex
          pos="relative"
          direction="column"
          height="100%"
          overflow="auto"
          w="full"
          maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
          maxHeight="100%"
        >
          <Box
            top={0}
            mx="auto"
            maxW="1200px"
            zIndex="sticky"
            pos="sticky"
            w="full"
            pt={{ [navbarBreakpoint]: '16px' }}
            px={{ '3sm': '30px' }}
          >
            <Navbar>{navbar ?? <DefaultNavbar />}</Navbar>
          </Box>
          <Box
            mx="auto"
            w="full"
            maxW="1200px"
            flex={1}
            my={{ base: '30px', [sidebarBreakpoint]: '50px' }}
            px={{ base: '24px', '3sm': '30px' }}
          >
            {children}
          </Box>
        </Flex>
      </QueryStatus>
    </Flex>
  );
}
