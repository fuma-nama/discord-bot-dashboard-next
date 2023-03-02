import { Flex, Heading, SimpleGrid, Text } from '@chakra-ui/layout';
import { ChannelSelect } from '@/config/example/ChannelSelect';
import { RolesSelect } from '@/config/example/RolesSelect';
import getGuildLayout from '@/components/layout/guild/get-guild-layout';
import { NextPageWithLayout } from '@/pages/_app';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SwitchForm } from '@/components/forms/SwitchField';
import { FormControlCard } from '@/components/forms/Form';
import { InputForm } from '@/components/forms/InputForm';

const schema = z.object({
  beta: z.boolean(),
  role: z.string().optional(),
  prefix: z.string().min(1).max(1),
  channel: z.string().optional(),
});

/**
 * Used for demo only
 */
type ExampleSettings = z.infer<typeof schema>;

/**
 * Exmaple for built-in use form hook
 */
const GuildSettingsPage: NextPageWithLayout = () => {
  const { watch, register, control, handleSubmit } = useForm<ExampleSettings>({
    resolver: zodResolver(schema),
    defaultValues: {
      beta: true,
      prefix: '/',
      role: undefined,
      channel: undefined,
    },
  });

  return (
    <Flex direction="column">
      <Heading>Guild Settings</Heading>
      <Text
        fontSize="lg"
        fontWeight="500"
        as="code"
        _light={{ color: 'cyan.500' }}
        _dark={{ color: 'cyan.400' }}
        cursor="pointer"
        onClick={handleSubmit(() => console.log('submit'))}
      >
        {JSON.stringify(watch())}
      </Text>

      <SimpleGrid mt={5} columns={{ base: 1, md: 2 }} gap={3}>
        <SwitchForm
          control={{
            label: 'Beta Features',
            description: 'Use beta features before releasing',
          }}
          controller={{ control, name: 'beta' }}
        />
        <Controller
          control={control}
          name="role"
          render={({ field, fieldState }) => (
            <FormControlCard
              label="Admin Role"
              description="Roles that able to configure the discord bot"
              error={fieldState.error?.message}
            >
              <RolesSelect {...field} />
            </FormControlCard>
          )}
        />
        <InputForm
          control={{ label: 'Command prefix', description: 'Change the default command prefix' }}
          placeholder="/"
          {...register('prefix')}
        />
        <Controller
          control={control}
          name="channel"
          render={({ field, fieldState }) => (
            <FormControlCard
              label="Logs"
              description="The channel to log bot states"
              error={fieldState.error?.message}
            >
              <ChannelSelect {...field} />
            </FormControlCard>
          )}
        />
      </SimpleGrid>
    </Flex>
  );
};

GuildSettingsPage.auth = true;
GuildSettingsPage.getLayout = (c) => getGuildLayout({ children: c, back: true });
export default GuildSettingsPage;
