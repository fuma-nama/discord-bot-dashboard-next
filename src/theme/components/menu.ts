import { menuAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';
import { light, dark } from '../colors';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

export const menuTheme = defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    item: {
      _hover: {
        _light: {
          bg: light.cardBg,
        },
        _dark: {
          bg: dark.cardBg,
        },
      },
      bg: 'transparent',
    },
    list: {
      _light: {
        bg: light.globalBg,
      },
      _dark: {
        bg: dark.globalBg,
      },
    },
  }),
});
