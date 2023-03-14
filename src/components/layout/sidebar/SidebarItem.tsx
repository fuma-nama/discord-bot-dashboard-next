// chakra imports
import { Box, HStack, Text } from '@chakra-ui/react';
import { SidebarItemInfo } from '@/utils/router';
import Link from 'next/link';

export function SidebarItem({ item, active }: { item: SidebarItemInfo; active: boolean }) {
  return (
    <HStack as={Link} bg="CardBackground" py={2} px={3} rounded="lg" href={item.path}>
      <Box
        color={active ? 'white' : 'Brand'}
        bg={active ? 'Brand' : 'MainBackground'}
        p={1}
        rounded="lg"
      >
        <Box w="20px" h="20px">
          {item.icon}
        </Box>
      </Box>
      <Text
        me="auto"
        color={active ? 'gray.700' : 'secondaryGray.900'}
        _dark={{
          color: active ? 'white' : 'navy.100',
        }}
        fontWeight={active ? 'bold' : 'normal'}
      >
        {item.name}
      </Text>
    </HStack>
  );
}
