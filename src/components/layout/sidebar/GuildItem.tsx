import { Avatar, Card, CardBody, Flex, Text } from '@chakra-ui/react';
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
      bg={active ? 'brand' : 'globalBg'}
      color={active ? 'white' : undefined}
      cursor="pointer"
      as={Link}
      href={href}
    >
      <CardBody as={Flex} direction="column" gap={3}>
        <Avatar name={guild.name} src={iconUrl(guild)} />
        <Text fontWeight="600">{guild.name}</Text>
      </CardBody>
    </Card>
  );
}
