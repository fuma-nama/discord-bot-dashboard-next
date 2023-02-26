import { SimpleGrid } from '@chakra-ui/layout';
import { FormControlCard } from 'components/forms/Form';
import { TextAreaForm } from 'components/forms/TextAreaForm';
import { WelcomeMessageFeature } from 'config/types';
import { useForm } from 'hooks/forms/useForm';
import { ChannelSelect } from './ChannelSelect';

export function useWelcomeMessageFeature(data: WelcomeMessageFeature) {
  const { render, value, update, errors } = useForm<Partial<WelcomeMessageFeature>>({
    defaultValue: data,
    emptyValue: {},
  });

  return render(
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap={3}>
      <FormControlCard label="Channel" description="Where to send the welcome message">
        <ChannelSelect value={value.channel} onChange={(channel) => update({ channel })} />
      </FormControlCard>
      <TextAreaForm
        label="Message"
        description="The message to send"
        placeholder="Type something here..."
        value={value.message ?? ''}
        onChange={(message) => update({ message })}
        error={errors.message}
      />
    </SimpleGrid>
  );
}
