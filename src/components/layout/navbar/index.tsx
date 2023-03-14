import { Flex, useColorModeValue } from '@chakra-ui/react';
import { navbarBreakpoint } from '@/theme/breakpoints';
import { ReactNode } from 'react';

import { UserMenu } from '@/components/menu/UserMenu';
import { SidebarTrigger } from '@/components/SidebarTrigger';
import { ThemeSwitch } from '@/components/ThemeSwitch';

export function Navbar({ links, children }: { links?: ReactNode; children: ReactNode }) {
  const navbarBg = useColorModeValue('rgba(244, 247, 254, 0.2)', 'rgba(8, 8, 28, 0.5)');

  return (
    <Flex
      direction="row"
      mx="auto"
      bg={navbarBg}
      backdropFilter="blur(20px)"
      borderRadius={{ [navbarBreakpoint]: '16px' }}
      lineHeight="25.6px"
      px={{ base: '24px', [navbarBreakpoint]: 5 }}
      py={{ base: '3px', [navbarBreakpoint]: '8px' }}
      gap={2}
      justify="space-between"
      alignItems="stretch"
    >
      {children}
      <NavbarLinksBox>{links}</NavbarLinksBox>
    </Flex>
  );
}

function NavbarLinksBox({ children }: { children?: ReactNode }) {
  return (
    <Flex
      justify="end"
      align="center"
      direction="row"
      bg="CardBackground"
      p="10px"
      borderRadius="30px"
      boxShadow="normal"
    >
      {children ?? (
        <>
          <SidebarTrigger />
          <ThemeSwitch secondary />
          <UserMenu color="TextPrimary" shadow="normal" bg="CardBackground" />
        </>
      )}
    </Flex>
  );
}
