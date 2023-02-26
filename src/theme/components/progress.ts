import { mode } from '@chakra-ui/theme-tools';
import { progressAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';
import { dark, light } from '@/theme/colors';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

export const progressStyles = defineMultiStyleConfig({
  baseStyle: definePartsStyle((props) => ({
    track: {
      w: '40px',
      h: '20px',
      bg: mode('blue.50', 'whiteAlpha.50')(props),
      borderRadius: '20px',
    },
    filledTrack: {
      bg: mode(light.brand, dark.brand)(props),
      _checked: { transform: 'translate(20px, 0px)' },
    },
  })),
});
