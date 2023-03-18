import {
  Center,
  Circle,
  Flex,
  Grid,
  Heading,
  HStack,
  Text,
  Button,
  Card,
  CardBody,
  CardHeader,
  Icon,
} from '@chakra-ui/react';
import { config } from '@/config/common';
import { StyledChart } from '@/components/chart/StyledChart';
import { dashboard } from '@/config/translations/dashboard';
import Link from 'next/link';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { IoOpen, IoPricetag } from 'react-icons/io5';
import { FaRobot } from 'react-icons/fa';
import { MdVoiceChat } from 'react-icons/md';
import { GuildSelect } from '@/pages/user/home';

export default function HomeView() {
  const t = dashboard.useTranslations();

  return (
    <Flex direction="column" gap={5}>
      <HStack rounded="2xl" bg="Brand" gap={2} p={5}>
        <Circle
          color="white"
          bgGradient="linear(to right bottom, transparent, blackAlpha.600)"
          p={4}
          shadow="2xl"
          display={{ base: 'none', md: 'block' }}
        >
          <Icon as={FaRobot} w="60px" h="60px" />
        </Circle>

        <Flex direction="column" align="start" gap={1}>
          <Text color="white" fontSize="2xl" fontWeight="bold">
            {t.invite.title}
          </Text>
          <Text color="whiteAlpha.800">{t.invite.description}</Text>
          <Button
            mt={3}
            as={Link}
            href={config.inviteUrl}
            color="white"
            bg="whiteAlpha.200"
            _hover={{
              bg: 'whiteAlpha.300',
            }}
            _active={{
              bg: 'whiteAlpha.400',
            }}
            leftIcon={<IoOpen />}
          >
            {t.invite.bn}
          </Button>
        </Flex>
      </HStack>
      <Guilds />
      <Flex direction="column" gap={2}>
        <Heading size="lg">{t.command.title}</Heading>
        <Text color="TextSecondary">{t.command.description}</Text>
        <HStack mt={2}>
          <Button leftIcon={<IoPricetag />} variant="action">
            {t.pricing}
          </Button>
          <Button px={6} rounded="xl" variant="secondary">
            {t.learn_more}
          </Button>
        </HStack>
      </Flex>
      <TestChart />
      <Grid templateColumns={{ base: '1fr', lg: '0.5fr 1fr' }} gap={3}>
        <Card rounded="3xl" variant="primary">
          <CardBody as={Center} p={4} flexDirection="column" gap={3}>
            <Circle p={4} bg="MainBackground">
              <Icon as={BsMusicNoteBeamed} w="80px" h="80px" />
            </Circle>
            <Text fontWeight="600">{t.vc.create}</Text>
          </CardBody>
        </Card>
        <Flex direction="column" gap={3}>
          <Text fontSize="xl" fontWeight="600">
            {t.vc['created channels']}
          </Text>
          <VoiceChannelItem />
          <VoiceChannelItem />
        </Flex>
      </Grid>
    </Flex>
  );
}

function Guilds() {
  const t = dashboard.useTranslations().servers;

  return (
    <>
      <Flex direction="column" gap={2} mt={3}>
        <Heading size="lg">{t.title}</Heading>
        <Text color="TextSecondary">{t.description}</Text>
      </Flex>
      <GuildSelect />
    </>
  );
}

function TestChart() {
  return (
    <StyledChart
      options={{
        colors: ['#4318FF', '#39B8FF'],
        chart: {
          animations: {
            enabled: false,
          },
        },
        xaxis: {
          categories: ['SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB'],
        },
        legend: {
          position: 'right',
        },
        responsive: [
          {
            breakpoint: 650,
            options: {
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      }}
      series={[
        {
          name: 'Paid',
          data: [50, 64, 48, 66, 49, 68],
        },
        {
          name: 'Free Usage',
          data: [30, 50, 13, 46, 26, 16],
        },
      ]}
      height="300"
      type="line"
    />
  );
}

function VoiceChannelItem() {
  return (
    <Card rounded="2xl" variant="primary">
      <CardHeader as={HStack}>
        <Icon as={MdVoiceChat} w="30px" h="30px" color="Brand" />
        <Text>My Channel</Text>
      </CardHeader>
      <CardBody>
        <Text color="TextSecondary">89 Members</Text>
      </CardBody>
    </Card>
  );
}
