import { extendTheme } from '@chakra-ui/react';
import { buttonStyles } from './components/button';
import { inputStyles } from './components/input';
import { sliderStyles } from './components/slider';
import { textareaStyles } from './components/textarea';
import { switchStyles } from './components/switch';
import { breakpoints } from './breakpoints';
import { modalStyles } from './components/modal';
import { avatarStyles } from './components/avatar';
import { menuTheme } from './components/menu';
import { skeletonStyles } from './components/skeleton';
import { tabsStyles } from './components/tabs';
import { cardStyles } from './components/card';
import { globalStyles } from '../styles/global';
import { colors, dark, light } from './colors';
import { selectStyles } from './components/select';
import { popoverStyles } from './components/popover';

export const theme = extendTheme({
  breakpoints,
  colors,
  styles: {
    global: globalStyles,
  },
  fonts: {
    heading: `Inter var,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif`,
    body: `Inter var,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif`,
  },
  components: {
    Button: buttonStyles,
    Switch: switchStyles,
    Modal: modalStyles,
    Avatar: avatarStyles,
    Menu: menuTheme,
    RangeSlider: sliderStyles,
    Input: inputStyles,
    Textarea: textareaStyles,
    Skeleton: skeletonStyles,
    Tabs: tabsStyles,
    Card: cardStyles,
    Select: selectStyles,
    Popover: popoverStyles,
  },
  semanticTokens: {
    shadows: {
      normal: {
        default: light.shadow,
        _dark: dark.shadow,
      },
    },
    colors: {
      TextPrimary: {
        default: light.textColorPrimary,
        _dark: dark.textColorPrimary,
      },
      TextSecondary: {
        default: light.textColorSecondary,
        _dark: dark.textColorSecondary,
      },
      MainBackground: {
        default: light.globalBg,
        _dark: dark.globalBg,
      },
      InputBackground: {
        default: 'secondaryGray.300',
        _dark: 'blackAlpha.300',
      },
      InputBorder: {
        default: 'blackAlpha.200',
        _dark: 'whiteAlpha.200',
      },
      Brand: {
        default: light.brand,
        _dark: dark.brand,
      },
      CardBackground: {
        default: light.cardBg,
        _dark: dark.cardBg,
      },
    },
  },
});
