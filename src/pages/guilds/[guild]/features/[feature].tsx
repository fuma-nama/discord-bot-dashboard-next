import { Icon } from '@chakra-ui/react';
import { Center, Heading, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { LoadingPanel } from '@/components/panel/LoadingPanel';
import { features } from '@/config/features';
import { CustomFeatures, FeatureConfig } from '@/config/types';
import { BsSearch } from 'react-icons/bs';
import { useEnableFeatureMutation, useFeatureQuery } from '@/api/hooks';
import { UpdateFeaturePanel } from '@/components/feature/UpdateFeaturePanel';
import { feature as view } from '@/config/translations/feature';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '@/pages/_app';
import getGuildLayout from '@/components/layout/guild/get-guild-layout';

export type Params = {
  guild: string;
  feature: keyof CustomFeatures;
};

export type UpdateFeatureValue<K extends keyof CustomFeatures> = Partial<CustomFeatures[K]>;

const FeaturePage: NextPageWithLayout = () => {
  const { feature, guild } = useRouter().query as Params;

  const query = useFeatureQuery(guild, feature);
  const featureConfig = features[feature] as FeatureConfig<typeof feature>;
  const skeleton = featureConfig?.useSkeleton?.();

  if (featureConfig == null) return <NotFound />;
  if (query.isError) return <NotEnabled />;
  if (query.isLoading) return skeleton != null ? <>{skeleton}</> : <LoadingPanel />;
  return <UpdateFeaturePanel key={feature} feature={query.data} config={featureConfig} />;
};

function NotEnabled() {
  const t = view.useTranslations();
  const { guild, feature } = useRouter().query as Params;
  const enable = useEnableFeatureMutation();

  return (
    <Center flexDirection="column" h="full" gap={1}>
      <Text fontSize="xl" fontWeight="600">
        {t.error['not enabled']}
      </Text>
      <Text color="TextSecondary">{t.error['not enabled description']}</Text>
      <Button
        mt={3}
        isLoading={enable.isLoading}
        onClick={() => enable.mutate({ enabled: true, guild, feature })}
        variant="action"
        px={6}
      >
        {t.bn.enable}
      </Button>
    </Center>
  );
}

function NotFound() {
  const t = view.useTranslations();

  return (
    <Center flexDirection="column" gap={2} h="full">
      <Icon as={BsSearch} w="50px" h="50px" />
      <Heading size="lg">{t.error['not found']}</Heading>
      <Text color="TextSecondary">{t.error['not found description']}</Text>
    </Center>
  );
}

FeaturePage.getLayout = (c) => getGuildLayout({ children: c, back: true });
export default FeaturePage;
