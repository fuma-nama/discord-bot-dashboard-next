import { RiErrorWarningFill as WarningIcon } from 'react-icons/ri';
import { Box, Flex, Heading, Spacer, Text } from '@chakra-ui/layout';
import { ButtonGroup, Button, Icon } from '@chakra-ui/react';
import { SlideFade } from '@chakra-ui/react';
import { FeatureConfig, UseFormRenderResult, CustomFeatures } from '@/config/types';
import { IoSave } from 'react-icons/io5';
import { useEnableFeatureMutation, useUpdateFeatureMutation } from '@/api/hooks';
import { Params } from '@/pages/guilds/[guild]/features/[feature]';
import { feature as view } from '@/config/translations/feature';
import { useRouter } from 'next/router';

export function UpdateFeaturePanel({
  feature,
  config,
}: {
  feature: CustomFeatures[keyof CustomFeatures];
  config: FeatureConfig<keyof CustomFeatures>;
}) {
  const { guild, feature: featureId } = useRouter().query as Params;
  const mutation = useUpdateFeatureMutation();
  const enableMutation = useEnableFeatureMutation();
  const result = config.useRender(feature, (data) => {
    return mutation.mutateAsync({
      guild,
      feature: featureId,
      options: data,
    });
  });

  const onDisable = () => {
    enableMutation.mutate({ enabled: false, guild, feature: featureId });
  };

  return (
    <Flex as="form" direction="column" gap={5} w="full" h="full">
      <Flex direction={{ base: 'column', md: 'row' }} mx={{ '3sm': 5 }} justify="space-between">
        <Box>
          <Heading fontSize="2xl" fontWeight="600">
            {config.name}
          </Heading>
          <Text color="TextSecondary">{config.description}</Text>
        </Box>
        <ButtonGroup mt={3}>
          <Button variant="danger" isLoading={enableMutation.isLoading} onClick={onDisable}>
            <view.T text={(e) => e.bn.disable} />
          </Button>
        </ButtonGroup>
      </Flex>

      {result.component}
      <Savebar isLoading={mutation.isLoading} result={result} />
    </Flex>
  );
}

function Savebar({
  result: { canSave, onSubmit, reset },
  isLoading,
}: {
  result: UseFormRenderResult;
  isLoading: boolean;
}) {
  const t = view.useTranslations();
  const breakpoint = '3sm';

  return (
    <Flex
      as={SlideFade}
      in={canSave}
      bg="CardBackground"
      rounded="3xl"
      zIndex="sticky"
      pos="sticky"
      bottom={{ base: 2, [breakpoint]: '10px' }}
      w="full"
      p={{ base: 1, [breakpoint]: '15px' }}
      shadow="normal"
      alignItems="center"
      flexDirection={{ base: 'column', [breakpoint]: 'row' }}
      gap={{ base: 1, [breakpoint]: 2 }}
      mt="auto"
    >
      <Icon
        display={{ base: 'none', [breakpoint]: 'block' }}
        as={WarningIcon}
        _light={{ color: 'orange.400' }}
        _dark={{ color: 'orange.300' }}
        w="30px"
        h="30px"
      />
      <Text fontSize={{ base: 'md', [breakpoint]: 'lg' }} fontWeight="600">
        {t.unsaved}
      </Text>
      <Spacer />
      <ButtonGroup isDisabled={isLoading} size={{ base: 'sm', [breakpoint]: 'md' }}>
        <Button
          type="submit"
          variant="action"
          rounded="full"
          leftIcon={<IoSave />}
          isLoading={isLoading}
          onClick={onSubmit}
        >
          {t.bn.save}
        </Button>
        <Button rounded="full" onClick={reset}>
          {t.bn.discard}
        </Button>
      </ButtonGroup>
    </Flex>
  );
}
