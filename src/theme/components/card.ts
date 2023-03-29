import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';
import { light, dark } from '@/theme/colors';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  cardAnatomy.keys
);

export const cardStyles = defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    container: {
      _light: {
        '--custom-card-bg': `colors.${light.cardBg}`,
        '--card-color': `colors.${light.textColorPrimary}`,
      },
      _dark: {
        '--custom-card-bg': `colors.${dark.cardBg}`,
        '--card-color': `colors.${dark.textColorPrimary}`,
      },
      color: 'var(--card-color)',
      bg: 'var(--custom-card-bg)',
      p: 'var(--card-padding)',
    },
    header: {
      fontSize: { base: '16px', md: 'lg' },
      fontWeight: 'medium',
      p: 0,
    },
    body: {
      fontSize: { base: 'sm', md: 'md' },
      p: 0,
    },
    footer: {
      p: 0,
      mt: 4,
    },
  }),
  variants: {
    primary: definePartsStyle({
      container: {
        rounded: '2xl',
        _light: {
          boxShadow: '14px 17px 30px 4px rgb(112 144 176 / 10%)',
        },
      },
    }),
  },
});
