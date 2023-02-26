import { dark } from './../colors';
import { defineStyle, defineStyleConfig } from '@chakra-ui/react';
import { light } from '@/theme/colors';

const secondary = defineStyle({
  fontSize: 'md',
  _light: {
    color: light.textColorSecondary,
  },
  _dark: {
    color: dark.textColorSecondary,
  },
});

export const textStyles = defineStyleConfig({
  variants: {
    secondary,
  },
});
