import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Button } from '@chakra-ui/react';
import { BsDiscord } from 'react-icons/bs';
import { Box, Center, Flex, Grid, Heading } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useColors } from '@/theme';
import { HomeView } from '@/components/HomeView';
import { auth } from '@/config/translations/auth';
import { NextPageWithLayout } from '@/pages/_app';
import AuthLayout from '@/components/layout/auth';

const LoginPage: NextPageWithLayout = () => {
  const t = auth.useTranslations();

  return (
    <Container>
      <FormControl>
        <FormLabel>{t['login description']}</FormLabel>
        <a href={`/api/auth/login`} target="_self">
          <Button leftIcon={<BsDiscord />}>{t.login}</Button>
        </a>
      </FormControl>
    </Container>
  );
};

function Container({ children }: { children: ReactNode }) {
  const t = auth.useTranslations();
  const { globalBg, brand } = useColors();

  return (
    <Grid
      position="relative"
      templateColumns={{ base: '1fr', lg: '1fr 1fr', xl: '1fr 1.2fr' }}
      h="full"
    >
      <Center
        pos="relative"
        bg={brand}
        bgImg="/Cloud.svg"
        bgRepeat="no-repeat"
        bgPosition="bottom"
        flexDirection="column"
        gap={4}
        py={10}
      >
        <Heading color="white" fontSize="8xl">
          {t.login}
        </Heading>
        <Box pos="relative" p={10} bg={globalBg} rounded="lg">
          {children}
        </Box>
      </Center>
      <Flex direction="column" bg={globalBg} p={30}>
        <HomeView />
      </Flex>
    </Grid>
  );
}

LoginPage.auth = false;
LoginPage.getLayout = (c) => <AuthLayout>{c}</AuthLayout>;
export default LoginPage;
