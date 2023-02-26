import { FiSettings as SettingsIcon } from 'react-icons/fi';
import { Flex, Heading, Text } from '@chakra-ui/layout';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { useColors } from '@/theme';
import { guild as view } from 'config/translations/guild';
import { useRouter } from 'next/router';
import Link from 'next/link';

export function Banner() {
  const { brand } = useColors();
  const { guild } = useRouter().query as { guild: string };
  const t = view.useTranslations();

  return (
    <Flex
      direction="column"
      p={{ base: 5, lg: 8 }}
      rounded="2xl"
      color="white"
      bgColor={brand}
      bgImg={{ base: null, '3sm': '/Banner1.png' } as any}
      bgSize="cover"
      gap={3}
    >
      <Heading>{t.banner.title}</Heading>
      <Text fontWeight="400" color="gray.300">
        {t.banner.description}
      </Text>
      <ButtonGroup>
        <Button
          leftIcon={<SettingsIcon />}
          color="white"
          bg="whiteAlpha.200"
          _hover={{
            bg: 'whiteAlpha.300',
          }}
          _active={{
            bg: 'whiteAlpha.400',
          }}
          as={Link}
          href={`/guilds/${guild}/settings`}
        >
          {t.bn.settings}
        </Button>
      </ButtonGroup>
    </Flex>
  );
}
