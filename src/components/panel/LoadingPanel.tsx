import { Center, CenterProps, Spinner, Text, VStack } from '@chakra-ui/react';
import { common } from '@/config/translations/common';

export function LoadingPanel(props: CenterProps) {
  const t = common.useTranslations();

  return (
    <Center w="full" h="full" {...props}>
      <VStack>
        <Spinner size="lg" />
        <Text color="TextPrimary">{t.loading}</Text>
      </VStack>
    </Center>
  );
}
