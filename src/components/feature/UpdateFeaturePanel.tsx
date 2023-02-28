import { RiErrorWarningFill as WarningIcon } from 'react-icons/ri';
import { Flex, Heading, HStack, Spacer, Text } from '@chakra-ui/layout';
import { ButtonGroup, Button, Icon } from '@chakra-ui/react';
import { SlideFade } from '@chakra-ui/react';
import { FeatureConfig, FormRender, CustomFeatures } from '@/config/types';
import { IoSave } from 'react-icons/io5';
import { useUpdateFeatureMutation } from '@/stores';
import { useColors } from '@/theme';
import { Params } from '../../pages/guilds/[guild]/features/[feature]';
import { feature as view } from '@/config/translations/feature';
import { useRouter } from 'next/router';

export function UpdateFeaturePanel<K extends keyof CustomFeatures>({
  feature,
  config,
}: {
  id: K;
  feature: CustomFeatures[K];
  config: FeatureConfig<K>;
}) {
  const result = config.useRender(feature);

  return (
    <>
      <Flex direction="column" gap={5} w="full" h="full">
        <Heading ml={4}>{config.name}</Heading>
        {result.component}
      </Flex>
      <Savebar result={result} />
    </>
  );
}

function Savebar({ result: { serialize, canSave, reset, onSubmit } }: { result: FormRender }) {
  const { guild, feature } = useRouter().query as Params;
  const { cardBg, shadow } = useColors();
  const mutation = useUpdateFeatureMutation();
  const t = view.useTranslations();

  const breakpoint = '3sm';
  const onSave = () => {
    //prevent submit if returns true
    if (onSubmit?.() === true) return;

    mutation.mutate(
      {
        guild,
        feature,
        options: serialize(),
      },
      {
        onSuccess: reset,
      }
    );
  };

  return (
    <HStack
      as={SlideFade}
      in={canSave}
      bg={cardBg}
      rounded="3xl"
      zIndex="sticky"
      pos="sticky"
      bottom={{ base: 2, [breakpoint]: '10px' }}
      w="full"
      p={{ base: 1, [breakpoint]: '15px' }}
      boxShadow={shadow}
      mt={2}
    >
      <Icon
        as={WarningIcon}
        _light={{ color: 'orange.400' }}
        _dark={{ color: 'orange.300' }}
        w="30px"
        h="30px"
      />
      <Text fontSize={{ base: 'md', [breakpoint]: 'lg' }} fontWeight="500">
        {t.unsaved}
      </Text>
      <Spacer />
      <ButtonGroup isDisabled={mutation.isLoading} size={{ base: 'sm', [breakpoint]: 'md' }}>
        <Button
          variant="action"
          leftIcon={<IoSave />}
          isLoading={mutation.isLoading}
          onClick={onSave}
        >
          {t.bn.save}
        </Button>
        <Button onClick={reset}>{t.bn.discard}</Button>
      </ButtonGroup>
    </HStack>
  );
}
