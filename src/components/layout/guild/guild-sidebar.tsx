import { FaChevronLeft as ChevronLeftIcon } from 'react-icons/fa';
import { Flex, HStack, StackProps, Text, VStack } from '@chakra-ui/layout';
import { Icon, IconButton } from '@chakra-ui/react';
import { HSeparator } from '@/components/layout/Separator';
import { getFeatures, IdFeature } from '@/config/utils';
import { IoSettings } from 'react-icons/io5';
import { useGuildPreview, useSelectedGuild } from '@/stores';
import { show, useColors } from '@/theme';
import { guild as view } from '@/config/translations/guild';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Params } from '@/pages/guilds/[guild]/features/[feature]';

export function InGuildSidebar() {
  const { selected } = useSelectedGuild();
  const { guild } = useGuildPreview(selected);
  const route = useRouter().route;
  const t = view.useTranslations();

  return (
    <Flex direction="column" gap={2} p={3}>
      <HStack as={Link} cursor="pointer" mb={2} href={`/guilds/${selected}`}>
        <IconButton
          display={{ base: 'none', [show.sidebar]: 'block' }}
          icon={<Icon verticalAlign="middle" as={ChevronLeftIcon} />}
          aria-label="back"
        />
        <Text fontSize="lg" fontWeight="600">
          {guild?.name}
        </Text>
      </HStack>
      <CardItem
        as={Link}
        href={`/guilds/${selected}/settings`}
        active={route === `/guilds/[guild]/settings`}
      >
        <IoSettings />
        <Text fontSize="lg" fontWeight="600">
          {t.bn.settings}
        </Text>
      </CardItem>
      <VStack align="stretch">
        <HSeparator>Features</HSeparator>
        {getFeatures().map((feature) => (
          <FeatureItem key={feature.id} feature={feature} />
        ))}
      </VStack>
    </Flex>
  );
}

function CardItem({ active, href, ...props }: { href: string; active: boolean } & StackProps) {
  const { globalBg, brand, textColorPrimary } = useColors();

  return (
    <HStack
      as={Link}
      href={href}
      rounded="xl"
      p={3}
      color={active ? 'white' : textColorPrimary}
      bg={active ? brand : globalBg}
      cursor="pointer"
      {...props}
    />
  );
}

function FeatureItem({ feature }: { feature: IdFeature }) {
  const { guild, feature: activeId } = useRouter().query as Params;
  const active = activeId === feature.id;

  return (
    <CardItem active={active} href={`/guilds/${guild}/features/${feature.id}`}>
      {feature.icon}
      <Text fontSize="lg" fontWeight="600">
        {feature.name}
      </Text>
    </CardItem>
  );
}
