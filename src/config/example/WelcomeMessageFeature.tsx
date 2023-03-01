import { SimpleGrid } from '@chakra-ui/layout';
import { FormControlCard } from '@/components/forms/Form';
import { TextAreaForm } from '@/components/forms/TextAreaForm';
import { FormRender, WelcomeMessageFeature } from '@/config/types';
import { ChannelSelect } from './ChannelSelect';
import { Controller, useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ColorPickerForm } from '@/components/forms/ColorPicker';
import { DatePickerForm } from '@/components/forms/DatePicker';
import { FilePickerForm } from '@/components/forms/FilePicker';
import { ControlledSwitchForm, SwitchForm } from '@/components/forms/SwitchField';

const schema = z.object({
  message: z.string().min(20),
  channel: z.string(),
  color: z.string().optional(),
  date: z.date().optional(),
  file: z.custom<File[]>().optional(),
  danger: z.boolean(),
});

type Input = z.infer<typeof schema>;

export function useWelcomeMessageFeature(
  data: WelcomeMessageFeature
): FormRender<WelcomeMessageFeature> {
  const { register, reset, handleSubmit, formState, control } = useForm<Input>({
    resolver: zodResolver(schema),
    shouldUnregister: false,
    defaultValues: {
      channel: data.channel,
      message: data.message ?? '',
      color: undefined,
      date: undefined,
      file: [],
      danger: false,
    },
  });
  const errors = formState.errors;

  return {
    component: (
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={3}>
        <FormControlCard
          label="Channel"
          description="Where to send the welcome message"
          error={errors.channel?.message}
        >
          <Controller
            control={control}
            name="channel"
            render={({ field }) => <ChannelSelect {...field} />}
          />
        </FormControlCard>
        <TextAreaForm
          control={{
            label: 'Message',
            description: 'The message to send',
            error: errors.message?.message,
          }}
          placeholder="Type some text here..."
          {...register('message')}
        />
        <Controller
          control={control}
          name="color"
          render={({ field, fieldState }) => (
            <ColorPickerForm
              control={{
                label: 'Color',
                description: 'The color of message',
                error: fieldState.error?.message,
              }}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <DatePickerForm
              control={{
                label: 'Date',
                description: 'The date of today',
              }}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="file"
          render={({ field }) => (
            <FilePickerForm
              control={{ label: 'File', description: 'The file to upload' }}
              options={{ accept: { 'image/*': [] }, multiple: false }}
              {...field}
            />
          )}
        />
        <ControlledSwitchForm
          control={{ label: 'Turn on', description: 'Enable something' }}
          controller={{
            control,
            name: 'danger',
          }}
        />
      </SimpleGrid>
    ),
    onSubmit: (onSubmit) => {
      handleSubmit(async (e) => {
        const data = await onSubmit(
          JSON.stringify({
            message: e.message,
            channel: e.channel,
          })
        );

        reset(data);
      })();
    },
    canSave: formState.isDirty,
    reset: () => reset(control._defaultValues),
  };
}
