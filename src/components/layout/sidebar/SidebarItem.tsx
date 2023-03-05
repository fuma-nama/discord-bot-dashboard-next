// chakra imports
import { Box, HStack, Text } from '@chakra-ui/react';
import { SidebarItemInfo } from '@/utils/router';
import { useColorsExtend, useItemHoverBg } from '@/theme';
import Link from 'next/link';

export function SidebarItem({ item, active }: { item: SidebarItemInfo; active: boolean }) {
  const { brand, globalBg, cardBg, activeColor, textColor } = useColorsExtend(
    {
      textColor: 'secondaryGray.900',
      activeColor: 'gray.700',
    },
    {
      textColor: 'navy.100',
      activeColor: 'white',
    }
  );

  return (
    <HStack as={Link} bg={cardBg} py={2} px={3} rounded="lg" href={item.path}>
      <Box color={active ? 'white' : brand} bg={active ? brand : globalBg} p={1} rounded="lg">
        <Box w="20px" h="20px">
          {item.icon}
        </Box>
      </Box>
      <Text
        me="auto"
        color={active ? activeColor : textColor}
        fontWeight={active ? 'bold' : 'normal'}
      >
        {item.name}
      </Text>
    </HStack>
  );
}
