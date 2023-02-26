import { switchAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';
import { light, dark } from '../colors';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

export const switchStyles = {
  components: {
    Checkbox: {
      baseStyle: {
        control: {
          _focus: {
            boxShadow: 'none',
          },
        },
      },
    },
    Switch: defineMultiStyleConfig({
      baseStyle: definePartsStyle({
        thumb: {
          fontWeight: 400,
          borderRadius: '50%',
          w: '16px',
          h: '16px',
          _checked: { transform: 'translate(20px, 0px)' },
        },
        track: {
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box',
          w: '40px',
          h: '20px',
          p: '2px',
          ps: '2px',
          _focus: {
            boxShadow: 'none',
          },
          _light: {
            bg: 'gray.300',
          },
          _dark: {
            bg: 'navy.700',
          },
          _checked: {
            _light: {
              bg: light.brand,
            },
            _dark: {
              bg: dark.brand,
            },
          },
        },
      }),
    }),
  },
};
