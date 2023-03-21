import { Button, Center, Icon, Text, VStack } from '@chakra-ui/react';
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
