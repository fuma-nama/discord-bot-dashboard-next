import { SimpleGrid } from '@chakra-ui/layout';
import { FormCard, FormCardController } from '@/components/forms/Form';
import { TextAreaForm } from '@/components/forms/TextAreaForm';
import { FormRender, WelcomeMessageFeature } from '@/config/types';
import { ChannelSelect } from './ChannelSelect';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ColorPickerForm, SmallColorPickerForm } from '@/components/forms/ColorPicker';
import { DatePickerForm } from '@/components/forms/DatePicker';
import { FilePickerForm } from '@/components/forms/FilePicker';
import { SwitchForm } from '@/components/forms/SwitchField';

const schema = z.object({
  message: z.string().min(20),
  channel: z.string().refine((e) => e === '1', { message: 'No' }),
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
        <FormCardController
          control={{
            label: 'Channel',
            description: 'Where to send the welcome message',
          }}
          controller={{ control, name: 'channel' }}
          render={({ field }) => <ChannelSelect {...field} />}
        />
        <TextAreaForm
          control={{
            label: 'Message',
            description: 'The message to send',
            error: errors.message?.message,
          }}
          placeholder="Type some text here..."
          {...register('message')}
        />
        <SmallColorPickerForm
          control={{
            label: 'Color',
            description: 'The color of message',
          }}
          supportAlpha
          controller={{ control, name: 'color' }}
        />
        <ColorPickerForm
          control={{
            label: 'Color',
            description: 'The color of message',
          }}
          controller={{ control, name: 'color' }}
        />
        <DatePickerForm
          control={{
            label: 'Date',
            description: 'The date of today',
          }}
          controller={{ control, name: 'date' }}
        />
        <FilePickerForm
          control={{ label: 'File', description: 'The file to upload' }}
          options={{ accept: { 'image/*': [] }, multiple: false }}
          controller={{ control, name: 'file' }}
        />
        <SwitchForm
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
