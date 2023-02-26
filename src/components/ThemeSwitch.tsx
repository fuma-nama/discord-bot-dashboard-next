import { Button, Icon, useColorMode } from '@chakra-ui/react';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';

export function ThemeSwitch(props: { color?: string }) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      variant="no-hover"
      bg="transparent"
      p="0px"
      minW="unset"
      minH="unset"
      h="18px"
      w="max-content"
      onClick={toggleColorMode}
    >
      <Icon
        me="10px"
        h="18px"
        w="18px"
        color={props.color}
        as={colorMode === 'light' ? IoMdMoon : IoMdSunny}
      />
    </Button>
  );
}
