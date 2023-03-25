import { SimpleGrid } from '@chakra-ui/layout';
import { TextAreaForm } from '@/components/forms/TextAreaForm';
import { UseFormRender, WelcomeMessageFeature } from '@/config/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ColorPickerForm, SmallColorPickerForm } from '@/components/forms/ColorPicker';
import { DatePickerForm } from '@/components/forms/DatePicker';
import { FilePickerForm } from '@/components/forms/FilePicker';
import { SwitchFieldForm } from '@/components/forms/SwitchField';
import { ChannelSelectForm } from '@/components/forms/ChannelSelect';

const schema = z.object({
  message: z.string().min(20),
  channel: z.string(),
  color: z.string().optional(),
  date: z.date().optional(),
  file: z.custom<File[]>().optional(),
  danger: z.boolean(),
});

type Input = z.infer<typeof schema>;

export const useWelcomeMessageFeature: UseFormRender<WelcomeMessageFeature> = (data, onSubmit) => {
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
        <TextAreaForm
          control={{
            label: 'Message',
            description: 'The message to send',
            error: formState.errors.message?.message,
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
        <FilePickerForm
          control={{
            label: 'File',
            description: 'The file to upload',
          }}
          options={{ accept: { 'image/*': [] }, multiple: false }}
          controller={{ control, name: 'file' }}
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
        <SwitchFieldForm
          control={{ label: 'Turn on', description: 'Enable something' }}
          controller={{
            control,
            name: 'danger',
          }}
        />
      </SimpleGrid>
    ),
    onSubmit: handleSubmit(async (e) => {
      const data = await onSubmit(
        JSON.stringify({
          message: e.message,
          channel: e.channel,
        })
      );

      reset(data);
    }),
    canSave: formState.isDirty,
    reset: () => reset(control._defaultValues),
  };
};
