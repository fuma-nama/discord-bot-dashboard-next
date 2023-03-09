import { cssVar, defineStyle, defineStyleConfig } from '@chakra-ui/react';

const $startColor = cssVar('skeleton-start-color');
const $endColor = cssVar('skeleton-end-color');

export const skeletonStyles = defineStyleConfig({
  baseStyle: defineStyle({
    [$startColor.variable]: 'colors.navy.600',
    [$endColor.variable]: 'colors.navy.800',
    _light: {
      [$startColor.variable]: 'colors.gray.200',
      [$endColor.variable]: 'colors.gray.300',
    },
  }),
});
