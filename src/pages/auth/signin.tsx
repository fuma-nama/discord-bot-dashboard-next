import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { BsDiscord } from 'react-icons/bs';
import { Center } from '@chakra-ui/react';
import { auth } from '@/config/translations/auth';
import { NextPageWithLayout } from '@/pages/_app';
import AuthLayout from '@/components/layout/auth';
import { useRouter } from 'next/router';

const LoginPage: NextPageWithLayout = () => {
  const t = auth.useTranslations();
  const locale = useRouter().locale;

  return (
    <Center w="full" h="full">
      <Flex w="fit-content" direction="column" align="center" textAlign="center" gap={3}>
        <Heading size="2xl" whiteSpace="pre-wrap" fontWeight="600">
          {t.login}
        </Heading>
        <Text color="TextSecondary" fontSize="lg">
          {t['login description']}
        </Text>
        <Button
          mt={3}
          leftIcon={<BsDiscord />}
          variant="action"
          size="lg"
          width="300px"
          as="a"
          href={`/api/auth/login?locale=${locale}`}
        >
          {t.login_bn}
        </Button>
      </Flex>
    </Center>
  );
};

LoginPage.auth = false;
LoginPage.getLayout = (c) => <AuthLayout>{c}</AuthLayout>;
export default LoginPage;
