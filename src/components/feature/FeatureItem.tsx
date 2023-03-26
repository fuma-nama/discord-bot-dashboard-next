import { Box, Center, Flex, Text } from '@chakra-ui/layout';
import { Button, ButtonGroup, Card, CardBody, CardFooter } from '@chakra-ui/react';
import { IdFeature } from '@/utils/common';
import { IoOpen, IoOptions } from 'react-icons/io5';
import { useEnableFeatureMutation } from '@/api/hooks';
import { guild as view } from '@/config/translations/guild';
import Router from 'next/router';

export function FeatureItem({
  guild,
  feature,
  enabled,
}: {
  guild: string;
  feature: IdFeature;
  enabled: boolean;
}) {
  const t = view.useTranslations();
  const mutation = useEnableFeatureMutation();

  return (
    <Card variant="primary">
      <CardBody as={Flex} direction="column" gap={3}>
        <Center
          p={5}
          bg={enabled ? 'Brand' : 'brandAlpha.100'}
          color={enabled ? 'white' : 'brand.500'}
          rounded="xl"
          w="50px"
          h="50px"
          fontSize="2xl"
          _dark={{
            color: enabled ? 'white' : 'brand.200',
          }}
        >
          {feature.icon}
        </Center>
        <Box>
          <Text fontSize="xl" fontWeight="medium">
            {feature.name}
          </Text>
          <Text color="TextSecondary">{feature.description}</Text>
        </Box>
      </CardBody>
      <CardFooter as={ButtonGroup} mt={3}>
        <Button
          disabled={mutation.isLoading}
          {...(enabled
            ? {
                variant: 'action',
                rounded: '2xl',
                leftIcon: <IoOptions />,
                onClick: () => Router.push(`/guilds/${guild}/features/${feature.id}`),
                children: t.bn['config feature'],
              }
            : {
                leftIcon: <IoOpen />,
                onClick: () => mutation.mutate({ enabled: true, guild, feature: feature.id }),
                children: t.bn['enable feature'],
              })}
        />
      </CardFooter>
    </Card>
  );
}
