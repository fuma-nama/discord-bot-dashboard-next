import { mode } from '@chakra-ui/theme-tools';
import { defineStyle, defineStyleConfig } from '@chakra-ui/react';
import { light, dark } from '../colors';

export const textareaStyles = defineStyleConfig({
  baseStyle: defineStyle((props) => ({
    fontWeight: 400,
    borderRadius: '8px',
    fontSize: 'md',
    bg: mode(light.globalBg, dark.globalBg)(props),
    rounded: 'lg',
    border: 0,
    _focus: { boxShadow: 'none' },
  })),
  defaultProps: {
    variant: null,
  },
  variants: {
    main: defineStyle((props: any) => ({
      bg: mode('transparent', 'navy.800')(props),
      border: '2px solid',
      color: mode('secondaryGray.900', 'white')(props),
      borderColor: mode('secondaryGray.400', 'navy.600')(props),
      borderRadius: '16px',
      fontSize: 'sm',
      p: '20px',
      _placeholder: {
        color: mode('secondaryGray.700', 'secondaryGray.600')(props),
      },
    })),
    glass: {
      borderColor: 'var(--border-color)',
      border: '1px solid',
      _light: {
        bg: 'blackApha.100',
        borderColor: 'blackAlpha.200',
        _invalid: {
          borderColor: 'red.300',
        },
      },
      _dark: {
        bg: 'blackAlpha.300',
        borderColor: 'whiteAlpha.200',
        _invalid: {
          borderColor: 'red.400',
        },
      },
    },
  },
});
