import { mode } from '@chakra-ui/theme-tools';

export const avatarStyles = {
  components: {
    Avatar: {
      baseStyle: (props: any) => ({
        container: {
          bg: 'brand.300',
          color: 'white',
        },
      }),
      variants: {
        border: (props: any) => ({
          container: {
            border: 'auto',
            borderWidth: 10,
            borderColor: mode('#ffffff', 'navy.800')(props),
          },
        }),
        normal: {
          container: {
            border: 0,
          },
        },
      },
    },
  },
};
