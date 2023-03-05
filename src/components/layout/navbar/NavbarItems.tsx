// Chakra Imports
import { Flex, FlexProps } from '@chakra-ui/react';
import { UserMenu } from '@/components/menu/UserMenu';
import { SidebarTrigger } from '@/components/SidebarTrigger';
import { ThemeSwitch } from '@/components/ThemeSwitch';
import { useColorsExtend } from '@/theme';

export function NavbarDefaultItems() {
  const { iconColor, menuBg, shadow } = useNavbarColors();

  return (
    <>
      <SidebarTrigger />
      <ThemeSwitch color={iconColor} />
      <UserMenu color="TextPrimary" shadow={shadow} bg={menuBg} />
    </>
  );
}

export function NavbarLinksBox(props: FlexProps) {
  const { menuBg, shadow } = useNavbarColors();

  return (
    <Flex
      justify="end"
      align="center"
      direction="row"
      bg={menuBg}
      p="10px"
      borderRadius="30px"
      boxShadow={shadow}
      {...props}
    />
  );
}

export function useNavbarColors() {
  return useColorsExtend(
    {
      iconColor: 'gray.400',
    },
    {
      iconColor: 'white',
    }
  );
}
