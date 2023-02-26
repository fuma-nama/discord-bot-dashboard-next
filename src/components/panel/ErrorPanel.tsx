import { Button, Center, Icon, Text, VStack, Box, Heading, Image } from '@chakra-ui/react';
import { MdOutlineError } from 'react-icons/md';

export function ErrorPanel({ children, retry }: { children: string; retry: () => void }) {
  const red = 'red.400';

  return (
    <Center w="full" h="full">
      <VStack>
        <Icon color={red} as={MdOutlineError} w="100px" h="100px" />
        <Text color={red} fontWeight="bold">
          {children}
        </Text>
        <Button variant="danger" onClick={retry}>
          Try Again
        </Button>
      </VStack>
    </Center>
  );
}

export function SmallErrorPanel(props: { error?: any; retry: () => void }) {
  return (
    <Center w="full" h="full" flexDirection="column" overflow="hidden" gap={5}>
      <Box pos="relative">
        <Heading fontSize={{ base: '50px', md: '130px' }} letterSpacing={8}>
          Error
        </Heading>
      </Box>
      <Text>{props.error}</Text>
      <Button variant="action" onClick={props.retry}>
        Retry
      </Button>
    </Center>
  );
}
