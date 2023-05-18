import { SimpleGrid } from '@chakra-ui/layout';
import { MemeFeature, UseFormRender, memeFeatureSchema } from '@/config/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChannelSelectForm } from '@/components/forms/ChannelSelect';
import { FormCardController } from '@/components/forms/Form';
import { SelectField } from '@/components/forms/SelectField';
import type { OptionBase } from 'chakra-react-select';

type Option = OptionBase & {
  label: string;
  value: Exclude<MemeFeature['source'], undefined>;
};

const sources: Option[] = [
  { label: 'youtube', value: 'youtube' },
  { label: 'twitter', value: 'twitter' },
  { label: 'discord', value: 'discord' },
];

export const useMemeFeature: UseFormRender<MemeFeature> = (data, onSubmit) => {
  const { reset, handleSubmit, formState, control } = useForm<MemeFeature>({
    resolver: zodResolver(memeFeatureSchema),
    shouldUnregister: false,
    defaultValues: {
      channel: data.channel,
      source: data.source,
    },
  });

  return {
    component: (
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={3}>
        <ChannelSelectForm
          control={{
            label: 'Channel',
            description: 'Where to send the welcome message',
          }}
          controller={{ control, name: 'channel' }}
        />
        <FormCardController
          control={{ label: 'Source', description: 'The source of the meme' }}
          controller={{ control, name: 'source' }}
          render={({ field }) => (
            <SelectField<Option>
              {...field}
              value={field.value != null ? sources.find((v) => v.value === field.value) : undefined}
              onChange={(v) => v && field.onChange(v.value)}
              options={sources}
            />
          )}
        />
      </SimpleGrid>
    ),
    onSubmit: handleSubmit(async (e) => {
      const data = await onSubmit(
        JSON.stringify({
          channel: e.channel,
          source: e.source,
        })
      );

      reset(data);
    }),
    canSave: formState.isDirty,
    reset: () => reset(control._defaultValues),
  };
};
