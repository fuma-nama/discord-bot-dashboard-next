import { HStack, Box, Text } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';

export function HSeparator({ children }: { children: ReactNode }) {
  const bg = useColorModeValue('gray.300', 'gray.600');

  return (
    <HStack>
      <Box w="full" h="1px" bg={bg} />
      <Text color="secondaryGray.600">{children}</Text>
      <Box w="full" h="1px" bg={bg} />
    </HStack>
  );
}
