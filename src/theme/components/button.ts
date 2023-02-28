import { mode } from '@chakra-ui/theme-tools';

export const buttonStyles = {
  components: {
    Button: {
      baseStyle: {
        borderRadius: '16px',
        transition: '.25s all ease',
        boxSizing: 'border-box',
        _focus: {
          boxShadow: 'none',
        },
        _active: {
          boxShadow: 'none',
        },
      },
      variants: {
        danger: () => ({
          color: 'white',
          bg: 'red.500',
          _hover: { bg: 'red.400' },
          _active: { bg: 'red.300' },
        }),
        outline: (props: any) => ({
          borderRadius: '16px',
          color: mode('brand.500', 'gray.200')(props),
          border: '2px',
          borderColor: mode('brand.500', 'gray.200')(props),
        }),
        brand: (props: any) => ({
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
        }),
        light: (props: any) => ({
          bg: mode('secondaryGray.300', 'whiteAlpha.100')(props),
          color: mode('secondaryGray.900', 'white')(props),
          _focus: {
            bg: mode('secondaryGray.300', 'whiteAlpha.100')(props),
          },
          _active: {
            bg: mode('secondaryGray.300', 'whiteAlpha.100')(props),
          },
          _hover: {
            bg: mode('secondaryGray.400', 'whiteAlpha.200')(props),
          },
        }),
        action: (props: any) => ({
          fontWeight: '600',
          borderRadius: '50px',
          bg: mode(
            'linear-gradient(to right bottom, var(--chakra-colors-brand-500), var(--chakra-colors-brand-400))',
            'linear-gradient(to right bottom, var(--chakra-colors-brand-400), var(--chakra-colors-brand-500))'
          )(props),
          color: 'white',
          boxShadow: mode(
            '1px 2px 5px var(--chakra-colors-brand-400)',
            '1px 2px 15px var(--chakra-colors-brand-400)'
          )(props),
        }),
      },
    },
  },
};
