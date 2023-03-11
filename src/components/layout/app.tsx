import { Box, Flex } from '@chakra-ui/react';
import items from '@/config/sidebar-items';
import { QueryStatus } from '@/components/panel/QueryPanel';
import { useSelfUserQuery } from '@/api/hooks';
import { LoadingPanel } from '@/components/panel/LoadingPanel';
import { DefaultNavbar } from '@/components/layout/navbar/Navbar';
import { Sidebar, SidebarResponsive } from './sidebar';
import { show } from '@/theme';
import { ReactNode } from 'react';

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
      <Sidebar items={items} sidebar={sidebar} />
      <SidebarResponsive items={items} sidebar={sidebar} />
      <QueryStatus
        query={query}
        loading={<LoadingPanel size="sm" />}
        error="Failed to load user info"
      >
        <Flex
          pos="relative"
          direction="column"
          height="100%"
          overflow="auto"
          w="full"
          maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
          maxHeight="100%"
        >
          <LayoutNavbar navbar={navbar} />
          <Box
            mx="auto"
            w="full"
            maxW="1200px"
            flex={1}
            my={{ base: '30px', [show.sidebar]: '50px' }}
            px={{ base: '10px', '3sm': '30px' }}
          >
            {children}
          </Box>
        </Flex>
      </QueryStatus>
    </Flex>
  );
}

function LayoutNavbar({ navbar }: { navbar: ReactNode }) {
  return (
    <Box
      top={0}
      mx="auto"
      maxW="1200px"
      zIndex="sticky"
      pos="sticky"
      w="full"
      pt={{ [show.navbar]: '16px' }}
      px={{ '3sm': '30px' }}
    >
      {navbar ?? <DefaultNavbar />}
    </Box>
  );
}
