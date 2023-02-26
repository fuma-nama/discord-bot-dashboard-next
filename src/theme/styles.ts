import { mode } from '@chakra-ui/theme-tools';
import { dark, light } from './colors';

export const globalStyles = (props: any) => ({
  '::-webkit-scrollbar': {
    w: '5px',
    h: '5px',
    bg: 'transparent',
  },
  '::-webkit-scrollbar-thumb': {
    borderRadius: '10px',
    bg: mode('rgba(0, 0, 0, 0.2)', 'rgba(255, 255, 255, 0.2)')(props),
  },
  '::-webkit-calendar-picker-indicator': {
    filter: mode('none', 'invert(1)')(props),
  },
  body: {
    color: mode(light.textColorPrimary, dark.textColorPrimary)(props),
    bg: mode(light.globalBg, dark.globalBg)(props),
    fontFamily: 'DM Sans',
    letterSpacing: '-0.5px',
  },
  input: {
    color: 'gray.700',
  },
});
