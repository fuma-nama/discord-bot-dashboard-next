import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';

export const badgeStyles = defineStyleConfig({
  baseStyle: defineStyle({
    borderRadius: '10px',
    lineHeight: '100%',
    padding: '7px',
    paddingLeft: '12px',
    paddingRight: '12px',
  }),
  variants: {
    outline: defineStyle({
      borderRadius: '16px',
    }),
    brand: defineStyle((props) => ({
      bg: mode('brand.500', 'brand.400')(props),
      color: 'white',
      _focus: {
        bg: mode('brand.500', 'brand.400')(props),
      },
      _active: {
        bg: mode('brand.500', 'brand.400')(props),
      },
      _hover: {
        bg: mode('brand.600', 'brand.400')(props),
      },
    })),
  },
});
