import { Flex, Heading, SimpleGrid, Text } from '@chakra-ui/layout';
import { ChannelSelect } from 'config/example/ChannelSelect';
import { RolesSelect } from 'config/example/RolesSelect';
import { useFormRender } from '@/utils/forms/useForm';
import getGuildLayout from '@/components/layouts/guild/get-guild-layout';
import { NextPageWithLayout } from 'pages/_app';

/**
 * Used for demo only
 */
type ExampleSettings = {
  beta: boolean;
  role?: string;
  prefix: string;
  channel?: string;
};

/**
 * Exmaple for built-in use form hook
 */
const GuildSettingsPage: NextPageWithLayout = () => {
  const form = useFormRender<Partial<ExampleSettings>>({
    defaultValue: {
      beta: true,
      prefix: '/',
    },
    render: ({ value, update }) => [
      {
        defaultMemorize: ['value'],
      },
      {
        type: 'switch',
        label: 'Beta Features',
        description: 'Use beta features before releasing',
        value: value.beta,
        onChange: (beta) => update({ beta }),
      },
      {
        type: 'custom-form',
        label: 'Admin Role',
        description: 'Roles that able to configure the discord bot',
        component: <RolesSelect value={value.role} onChange={(role) => update({ role })} />,
        memorize: [value.role],
      },
      {
        type: 'input',
        label: 'Command prefix',
        description: 'Change the default command prefix',
        value: value.prefix,
        onChange: (prefix) => update({ prefix }),
        placeholder: '/',
        input: {
          maxLength: 1,
        },
      },
      {
        type: 'custom-form',
        label: 'Logs',
        description: 'The channel to log bot states',
        component: (
          <ChannelSelect value={value.channel} onChange={(channel) => update({ channel })} />
        ),
        memorize: [value.channel],
      },
    ],
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
      >
        {form.serialize() as string}
      </Text>

      <SimpleGrid mt={5} columns={{ base: 1, md: 2 }} gap={3}>
        {form.component}
      </SimpleGrid>
    </Flex>
  );
};

GuildSettingsPage.auth = true;
GuildSettingsPage.getLayout = (c) => getGuildLayout({ children: c, back: true });
export default GuildSettingsPage;
