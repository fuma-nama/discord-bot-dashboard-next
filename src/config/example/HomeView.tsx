import {
  Box,
  Center,
  Circle,
  Flex,
  Grid,
  Heading,
  HStack,
  Text,
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Icon,
  IconButton,
  Image,
  Progress,
} from '@chakra-ui/react';
import { config } from '@/config/common';
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi';
import { StyledChart } from '@/components/chart/StyledChart';
import { dashboard } from '@/config/translations/dashboard';
import Link from 'next/link';
import { BsMusicNoteBeamed, BsPlay, BsPlayBtn } from 'react-icons/bs';
import { IoOpen, IoPricetag } from 'react-icons/io5';
import { FaRobot } from 'react-icons/fa';
import { MdVoiceChat } from 'react-icons/md';
import { GuildSelect } from '@/pages/user/home';

export default function HomeView() {
  const t = dashboard.useTranslations();

  return (
    <Flex direction="column" gap={5}>
      <HStack rounded="2xl" bg="brand" gap={2} p={5}>
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
      <Flex direction="column" p={3}>
        <Box w="fit-content">
          <Heading size="lg">{t.command.title}</Heading>
          <Text color="TextSecondary">{t.command.description}</Text>
          <Button mt={2} leftIcon={<IoPricetag />} variant="action">
            {t.pricing}
          </Button>
        </Box>
        <TestChart />
      </Flex>
      <Flex direction="column" gap={2} mt={3}>
        <Heading size="lg">{t.music.title}</Heading>
        <Text color="TextSecondary">{t.music.description}</Text>
        <MusicPlayer />
      </Flex>
      <Grid templateColumns={{ base: '1fr', lg: '0.5fr 1fr' }} gap={3}>
        <Card rounded="3xl" variant="primary">
          <CardBody as={Center} p={4} flexDirection="column" gap={3}>
            <Circle p={4} bg="globalBg">
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

function MusicPlayer() {
  const t = dashboard.useTranslations().music;

  return (
    <Flex direction="row" gap={3}>
      <Image
        alt="image"
        rounded="xl"
        src="https://cdns-images.dzcdn.net/images/artist/61bcbf8296b1669499064406c534d39d/500x500.jpg"
        bg="brand"
        w="200px"
        h="200px"
        display={{ base: 'none', md: 'block' }}
      />
      <Flex
        direction="column"
        bg="CardBackground"
        rounded="xl"
        gap={3}
        p={3}
        flex={1}
        _light={{ boxShadow: '14px 17px 30px 4px rgb(112 144 176 / 13%)' }}
      >
        <HStack color="brand" display={{ base: 'none', md: 'flex' }} w="fit">
          <BsPlayBtn />
          <Text>{t['now playing']}</Text>
        </HStack>
        <HStack>
          <Avatar name="Stay with me" size="sm" />
          <Text fontSize={{ base: 'lg', md: '2xl' }} fontWeight="bold">
            ZUTOMAYO - Study Me
          </Text>
        </HStack>

        <HStack mt="auto" justify="space-between" fontWeight="bold">
          <IconButton
            fontSize="4xl"
            icon={<Icon as={BiSkipPrevious} />}
            aria-label="previous"
            variant="action"
          />
          <IconButton
            p={1}
            h="fit-content"
            fontSize="4xl"
            icon={<Icon as={BsPlay} />}
            aria-label="pause"
            variant="action"
            rounded="full"
          />
          <IconButton
            fontSize="4xl"
            icon={<Icon as={BiSkipNext} />}
            aria-label="next"
            variant="action"
          />
        </HStack>
        <HStack px={3}>
          <Text>1:28</Text>
          <Progress w="full" value={50} />
        </HStack>
      </Flex>
    </Flex>
  );
}

function VoiceChannelItem() {
  return (
    <Card rounded="2xl" variant="primary">
      <CardHeader as={HStack}>
        <Icon as={MdVoiceChat} w="30px" h="30px" color="brand" />
        <Text>My Channel</Text>
      </CardHeader>
      <CardBody>
        <Text color="TextSecondary">89 Members</Text>
      </CardBody>
    </Card>
  );
}
