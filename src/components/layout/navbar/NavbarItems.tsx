// Chakra Imports
import { Flex, FlexProps } from '@chakra-ui/react';
import { UserMenu } from '@/components/menu/UserMenu';
import { SidebarTrigger } from '@/components/SidebarTrigger';
import { ThemeSwitch } from '@/components/ThemeSwitch';

export function NavbarDefaultItems() {
  return (
    <>
      <SidebarTrigger />
      <ThemeSwitch secondary />
      <UserMenu color="TextPrimary" shadow="normal" bg="CardBackground" />
    </>
  );
}

export function NavbarLinksBox(props: FlexProps) {
  return (
    <Flex
      justify="end"
      align="center"
      direction="row"
      bg="CardBackground"
      p="10px"
      borderRadius="30px"
      boxShadow="normal"
      {...props}
    />
  );
}
