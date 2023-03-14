import { defineStyleConfig } from '@chakra-ui/react';

export const linkStyles = defineStyleConfig({
  baseStyle: {
    textDecoration: 'none',
    boxShadow: 'none',
    _focus: {
      boxShadow: 'none',
    },
    _active: {
      boxShadow: 'none',
    },
    _hover: {
      textDecoration: 'none',
      border: 'none',
    },
  },
});
