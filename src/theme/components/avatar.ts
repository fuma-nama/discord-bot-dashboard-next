import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { avatarAnatomy } from '@chakra-ui/anatomy';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  avatarAnatomy.keys
);

export const avatarStyles = defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    container: {
      bg: 'brand.300',
      color: 'white',
    },
  }),
  variants: {
    border: definePartsStyle({
      container: {
        border: 'auto',
        borderWidth: 10,
        borderColor: '#ffffff',
        _dark: {
          borderColor: 'navy.800',
        },
      },
    }),
    normal: definePartsStyle({
      container: {
        border: 0,
      },
    }),
  },
});
