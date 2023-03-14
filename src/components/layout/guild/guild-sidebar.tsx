import { FaChevronLeft as ChevronLeftIcon } from 'react-icons/fa';
import { Center, Flex, HStack, StackProps, Text, VStack } from '@chakra-ui/layout';
import { Icon, IconButton } from '@chakra-ui/react';
import { HSeparator } from '@/components/layout/Separator';
import { getFeatures } from '@/config/utils';
import { IoSettings } from 'react-icons/io5';
import { useGuildPreview } from '@/api/hooks';
import { sidebarBreakpoint } from '@/theme/breakpoints';
import { guild as view } from '@/config/translations/guild';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Params } from '@/pages/guilds/[guild]/features/[feature]';
import { ReactNode } from 'react';

export function InGuildSidebar() {
  const router = useRouter();
  const { guild: guildId, feature: activeId } = router.query as Params;
  const { guild } = useGuildPreview(guildId);

  const t = view.useTranslations();

  return (
    <Flex direction="column" gap={2} p={3}>
      <HStack as={Link} cursor="pointer" mb={2} href={`/guilds/${guildId}`}>
        <IconButton
          display={{ base: 'none', [sidebarBreakpoint]: 'block' }}
          icon={<Icon verticalAlign="middle" as={ChevronLeftIcon} />}
          aria-label="back"
        />
        <Text fontSize="lg" fontWeight="600">
          {guild?.name}
        </Text>
      </HStack>
      <VStack align="stretch">
        <SidebarItem
          href={`/guilds/${guildId}/settings`}
          active={router.route === `/guilds/[guild]/settings`}
          icon={<Icon as={IoSettings} />}
          name={t.bn.settings}
        />
        <HSeparator>Features</HSeparator>
        {getFeatures().map((feature) => (
          <SidebarItem
            key={feature.id}
            name={feature.name}
            icon={feature.icon}
            active={activeId === feature.id}
            href={`/guilds/${guildId}/features/${feature.id}`}
          />
        ))}
      </VStack>
    </Flex>
  );
}

function SidebarItem({
  name,
  active,
  icon,
  href,
}: {
  name: ReactNode;
  icon: ReactNode;
  active: boolean;
  href: string;
}) {
  return (
    <CardItem active={active} href={href}>
      <Center
        p={2}
        fontSize="sm"
        bg={active ? 'brand.500' : 'transparent'}
        rounded="xl"
        color={active ? 'white' : 'TextPrimary'}
        border="2px solid"
        borderColor="blackAlpha.200"
        boxShadow={`0px 0px 15px ${
          active ? 'var(--chakra-colors-brandAlpha)' : 'var(--chakra-colors-shadow-darker)'
        }`}
        _dark={{
          bg: active ? 'brand.400' : 'transparent',
          borderColor: 'whiteAlpha.400',
        }}
      >
        {icon}
      </Center>
      <Text fontSize="md" fontWeight={active ? 'bold' : 'normal'}>
        {name}
      </Text>
    </CardItem>
  );
}

function CardItem({ active, href, ...props }: { href: string; active: boolean } & StackProps) {
  return (
    <HStack
      as={Link}
      href={href}
      rounded="xl"
      p={2}
      color={active ? 'TextPrimary' : 'TextSecondary'}
      bg={active ? 'globalBg' : undefined}
      _dark={{
        bg: active ? 'whiteAlpha.100' : undefined,
      }}
      cursor="pointer"
      {...props}
    />
  );
}
