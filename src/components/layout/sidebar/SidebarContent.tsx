import {
  Avatar,
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useActiveSidebarItem, SidebarItemInfo } from '@/utils/router';
import { useGuilds, useSelfUserQuery } from '@/api/hooks';
import { SearchBar } from '@/components/forms/SearchBar';
import { useMemo, useState } from 'react';
import { config } from '@/config/common';
import { FiSettings as SettingsIcon } from 'react-icons/fi';
import { avatarUrl } from '@/api/discord';
import { GuildItem } from './GuildItem';
import { SidebarItem } from './SidebarItem';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function SidebarContent({ items }: { items: SidebarItemInfo[] }) {
  const [filter, setFilter] = useState('');
  const guilds = useGuilds();
  const { guild: selectedGroup } = useRouter().query as {
    guild: string;
  };

  const filteredGuilds = useMemo(
    () =>
      guilds.data?.filter((guild) => {
        const contains = guild.name.toLowerCase().includes(filter.toLowerCase());

        return config.guild.filter(guild) && contains;
      }),
    [guilds.data, filter]
  );

  // SIDEBAR
  return (
    <>
      <Flex alignItems="center" flexDirection="column" bg="brand.500" _dark={{ bg: 'brand.400' }}>
        <VStack align="center" my="32px" color="white">
          <Heading m={0}>{config.name}</Heading>
        </VStack>
      </Flex>
      <Stack direction="column" mt="18px" mb="auto">
        <Flex direction="column" px="10px" gap={1}>
          <Items items={items} />
        </Flex>
        <Box px="10px">
          <SearchBar
            w="full"
            input={{
              value: filter,
              onChange: (e) => setFilter(e.target.value),
            }}
          />
        </Box>
        <Flex direction="column" px="10px" gap={3}>
          {filteredGuilds?.map((guild) => (
            <GuildItem
              key={guild.id}
              guild={guild}
              active={selectedGroup === guild.id}
              href={`/guilds/${guild.id}`}
            />
          ))}
        </Flex>
      </Stack>
    </>
  );
}

export function BottomCard() {
  const user = useSelfUserQuery().data;
  if (user == null) return <></>;

  return (
    <Card pos="sticky" left={0} bottom={0} w="full" py={2}>
      <CardBody as={HStack}>
        <Avatar src={avatarUrl(user)} name={user.username} size="sm" />
        <Text fontWeight="600">{user.username}</Text>
        <Spacer />
        <Link href="/user/profile">
          <IconButton icon={<SettingsIcon />} aria-label="settings" />
        </Link>
      </CardBody>
    </Card>
  );
}

function Items({ items }: { items: SidebarItemInfo[] }) {
  const active = useActiveSidebarItem();

  return (
    <>
      {items
        .filter((item) => !item.hidden)
        .map((route: SidebarItemInfo, index: number) => (
          <SidebarItem key={index} item={route} active={active === route} />
        ))}
    </>
  );
}
