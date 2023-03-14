import { extendTheme } from '@chakra-ui/react';
import { buttonStyles } from './components/button';
import { badgeStyles } from './components/badge';
import { inputStyles } from './components/input';
import { sliderStyles } from './components/slider';
import { textareaStyles } from './components/textarea';
import { switchStyles } from './components/switch';
import { linkStyles } from './components/link';
import { breakpoints } from './breakpoints';
import { modalStyles } from './components/modal';
import { avatarStyles } from './components/avatar';
import { menuTheme } from './components/menu';
import { skeletonStyles } from './components/skeleton';
import { tabsStyles } from './components/tabs';
import { cardStyles } from './components/card';
import { textStyles } from './components/text';
import { globalStyles } from './styles';
import { colors, dark, light } from './colors';
import { selectStyles } from './components/select';
import { popoverStyles } from './components/popover';

export const theme = extendTheme({
  breakpoints,
  colors,
  styles: {
    global: globalStyles,
  },
  components: {
    Badge: badgeStyles,
    Button: buttonStyles,
    Switch: switchStyles,
    Modal: modalStyles,
    Avatar: avatarStyles,
    Menu: menuTheme,
    RangeSlider: sliderStyles,
    Link: linkStyles,
    Input: inputStyles,
    Textarea: textareaStyles,
    Skeleton: skeletonStyles,
    Tabs: tabsStyles,
    Card: cardStyles,
    Text: textStyles,
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
      globalBg: {
        default: light.globalBg,
        _dark: dark.globalBg,
      },
      inputBackground: {
        default: 'secondaryGray.300',
        _dark: 'blackAlpha.300',
      },
      inputBorder: {
        default: 'blackAlpha.200',
        _dark: 'whiteAlpha.200',
      },
      brand: {
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
