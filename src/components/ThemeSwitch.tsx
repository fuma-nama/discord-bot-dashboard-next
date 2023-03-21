import { Button, Icon, useColorMode } from '@chakra-ui/react';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';

export function ThemeSwitch({ secondary }: { secondary?: boolean }) {
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
      aria-label="Toggle color mode"
    >
      <Icon
        me="10px"
        h="18px"
        w="18px"
        color={secondary ? 'gray.400' : 'TextPrimary'}
        _dark={{
          color: 'TextPrimary',
        }}
        as={colorMode === 'light' ? IoMdMoon : IoMdSunny}
      />
    </Button>
  );
}
