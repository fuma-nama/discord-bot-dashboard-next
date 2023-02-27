import {
  Center,
  Heading,
  Link,
  Text,
  VStack,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Icon,
} from '@chakra-ui/react';
import { config } from '@/config/common';
import { dashboard } from '@/config/translations/dashboard';
import { FaRobot } from 'react-icons/fa';
import { IoOpen } from 'react-icons/io5';
import { useSelfUser } from '@/stores';
import { useColors } from '@/theme';
import { ExampleDashboardView } from '@/components/example';
import { NextPageWithLayout } from '@/pages/_app';
import AppLayout from '@/components/layouts/app';

const HomePage: NextPageWithLayout = () => {
  const t = dashboard.useTranslations();
  const { brand } = useColors();
  const user = useSelfUser();

  //used for demo, you should remove it
  return <ExampleDashboardView />;

  return (
    <Center h="full" flexDirection="column" textAlign="center" p={3}>
      <Heading size={{ base: 'md', '3sm': 'lg' }}>
        {t.welcome}
        <Text as="span" color={brand}>
          {user.username}
        </Text>
      </Heading>
      <Card rounded="2xl" p={10} pb={5}>
        <CardHeader as={VStack}>
          <Icon as={FaRobot} w="60px" h="60px" />
          <Text>{t.invite.title}</Text>
        </CardHeader>
        <CardFooter>
          <Button
            as={Link}
            href={config.inviteUrl}
            w="full"
            leftIcon={<IoOpen />}
            variant="action"
            target="_blank"
          >
            {t.invite.bn}
          </Button>
        </CardFooter>
      </Card>
    </Center>
  );
};

HomePage.auth = true;
HomePage.getLayout = (c) => <AppLayout>{c}</AppLayout>;
export default HomePage;
