import { pinInputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  pinInputAnatomy.keys
);

export const pinInputTheme = defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    field: {
      border: '2px solid',
      _placeholder: {
        _light: {
          color: 'secondaryGray.700',
        },
        _dark: {
          color: 'secondaryGray.600',
        },
      },
      _light: {
        bg: 'transparent',
        color: 'secondaryGray.900',
        borderColor: 'secondaryGray.400',
      },
      _dark: {
        bg: 'navy.800',
        color: 'white',
        borderColor: 'navy.600',
      },
    },
  }),
});
