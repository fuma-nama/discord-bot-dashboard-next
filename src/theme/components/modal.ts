import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  overlay: {
    backdropFilter: 'auto',
    backdropBlur: 'lg',
  },
  closeButton: {
    _hover: {},
    _focus: {
      boxShadow: 'none',
    },
  },
  dialog: {
    _light: {
      bg: 'secondaryGray.300',
    },
    _dark: {
      bg: 'navy.900',
    },
  },
});

export const modalStyles = {
  components: {
    Modal: defineMultiStyleConfig({
      baseStyle,
    }),
    Popover: {
      baseStyle: (props: any) => ({
        content: {
          bg: mode('secondaryGray.300', 'navy.900')(props),
          rounded: 'xl',
          _focus: {
            boxShadow: 'none',
          },
        },
      }),
    },
  },
};
