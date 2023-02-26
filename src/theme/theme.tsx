import { extendTheme } from '@chakra-ui/react';
import { buttonStyles } from './components/button';
import { badgeStyles } from './components/badge';
import { inputStyles } from './components/input';
import { progressStyles } from './components/progress';
import { sliderStyles } from './components/slider';
import { textareaStyles } from './components/textarea';
import { switchStyles } from './components/switch';
import { linkStyles } from './components/link';
import { breakpoints } from './breakpoints';
import { modalStyles } from './components/modal';
import { avatarStyles } from './components/avatar';
import { menuTheme } from './components/menu';
import { pinInputTheme } from './components/pin-input';
import { skeletonStyles } from './components/skeleton';
import { tabsStyles } from './components/tabs';
import { cardStyles } from './components/card';
import { textStyles } from './components/text';
import { globalStyles } from './styles';
import { colors } from './colors';
import { selectStyles } from './components/select';

export const theme = extendTheme(
  badgeStyles, // badge styles
  buttonStyles, // button styles
  linkStyles, // link styles
  sliderStyles, // slider styles
  switchStyles, // switch styles
  modalStyles,
  avatarStyles,
  menuTheme,
  {
    breakpoints,
    colors,
    styles: {
      global: globalStyles,
    },
    components: {
      Input: inputStyles,
      PinInput: pinInputTheme,
      Textarea: textareaStyles,
      Skeleton: skeletonStyles,
      Tabs: tabsStyles,
      Card: cardStyles,
      Progress: progressStyles,
      Text: textStyles,
      Select: selectStyles,
    },
  }
);
