import { BsChatLeftText as ChatIcon } from 'react-icons/bs';
import { GuildChannel } from '@/api/bot';
import { ChannelTypes } from '@/api/discord';
import { Option, SelectField } from '@/components/forms/SelectField';
import { forwardRef, useMemo } from 'react';
import { MdRecordVoiceOver } from 'react-icons/md';
import { useGuildChannelsQuery } from '@/api/hooks';
import { Icon } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { SelectInstance, Props as SelectProps } from 'chakra-react-select';
import { Override } from '@/utils/types';
import { ControlledInput } from './types';
import { FormCard } from './Form';
import { useController } from 'react-hook-form';
import { common } from '@/config/translations/common';

/**
 * Render an options
 */
const render = (channel: GuildChannel): Option => {
  const icon = () => {
    switch (channel.type) {
      case ChannelTypes.GUILD_STAGE_VOICE:
      case ChannelTypes.GUILD_VOICE: {
        return <Icon as={MdRecordVoiceOver} />;
      }
      default:
        return <ChatIcon />;
    }
  };

  return {
    label: channel.name,
    value: channel.id,
    icon: icon(),
  };
};

function mapOptions(channels: GuildChannel[]) {
  //channels in category
  const categories = new Map<string, GuildChannel[]>();
  //channels with no parent category
  const roots: GuildChannel[] = [];

  //group channels
  for (const channel of channels) {
    if (channel.category == null) roots.push(channel);
    else {
      const category = categories.get(channel.category);

      if (category == null) {
        categories.set(channel.category, [channel]);
      } else {
        category.push(channel);
      }
    }
  }

  //map channels into select menu options
  return roots.map((channel) => {
    if (channel.type === ChannelTypes.GUILD_CATEGORY) {
      return {
        ...render(channel),
        options: categories.get(channel.id)?.map(render) ?? [],
      };
    }

    return render(channel);
  });
}

type Props = Override<
  SelectProps<Option, false>,
  {
    value?: string;
    onChange: (v: string) => void;
  }
>;

export const ChannelSelect = forwardRef<SelectInstance<Option, false>, Props>(
  ({ value, onChange, ...rest }, ref) => {
    const guild = useRouter().query.guild as string;
    const channelsQuery = useGuildChannelsQuery(guild);
    const isLoading = channelsQuery.isLoading;

    const selected = value != null ? channelsQuery.data?.find((c) => c.id === value) : null;
    const options = useMemo(
      () => (channelsQuery.data != null ? mapOptions(channelsQuery.data) : []),
      [channelsQuery.data]
    );

    return (
      <SelectField<Option>
        isDisabled={isLoading}
        isLoading={isLoading}
        placeholder={<common.T text="select channel" />}
        value={selected != null ? render(selected) : null}
        options={options}
        onChange={(e) => e != null && onChange(e.value)}
        ref={ref}
        {...rest}
      />
    );
  }
);

ChannelSelect.displayName = 'ChannelSelect';

export const ChannelSelectForm: ControlledInput<Omit<Props, 'value' | 'onChange'>> = ({
  control,
  controller,
  ...props
}) => {
  const { field, fieldState } = useController(controller);

  return (
    <FormCard {...control} error={fieldState.error?.message}>
      <ChannelSelect {...field} {...props} />
    </FormCard>
  );
};
