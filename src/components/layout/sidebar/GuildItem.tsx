import { Avatar, Card, CardBody, Flex, Skeleton, Text } from '@chakra-ui/react';
import { Guild, iconUrl } from '@/api/discord';
import Link from 'next/link';

export function GuildItem({
  guild,
  active,
  href,
}: {
  guild: Guild;
  active: boolean;
  href: string;
}) {
  return (
    <Card
      bg={active ? 'Brand' : 'MainBackground'}
      color={active ? 'white' : undefined}
      cursor="pointer"
      as={Link}
      href={href}
      rounded="xl"
    >
      <CardBody as={Flex} direction="column" gap={3}>
        <Avatar name={guild.name} src={iconUrl(guild)} />
        <Text fontWeight="600">{guild.name}</Text>
      </CardBody>
    </Card>
  );
}

export function GuildItemsSkeleton() {
  return (
    <>
      <Skeleton h="124px" rounded="xl" />
      <Skeleton h="124px" rounded="xl" />
      <Skeleton h="124px" rounded="xl" />
      <Skeleton h="124px" rounded="xl" />
      <Skeleton h="124px" rounded="xl" />
    </>
  );
}
