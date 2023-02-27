import { BsChatLeftText as ChatIcon } from 'react-icons/bs';
import { GuildChannel } from '@/api/bot';
import { ChannelTypes } from '@/api/discord';
import { SelectField } from '@/components/forms/SelectField';
import { useMemo } from 'react';
import { MdRecordVoiceOver } from 'react-icons/md';
import { useGuildChannelsQuery } from '@/stores';
import { Icon } from '@chakra-ui/react';
import { useRouter } from 'next/router';

/**
 * Render an options
 */
const render = (channel: GuildChannel) => {
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

export function ChannelSelect({
  value,
  onChange,
}: {
  value?: string;
  onChange: (v: string) => void;
}) {
  const guild = useRouter().query.guild as string;
  const channelsQuery = useGuildChannelsQuery(guild);
  const isLoading = channelsQuery.isLoading;

  const selected = value != null ? channelsQuery.data?.find((c) => c.id === value) : null;
  const options = useMemo(
    () => (channelsQuery.data != null ? mapOptions(channelsQuery.data) : []),
    [channelsQuery.data]
  );

  return (
    <SelectField
      isDisabled={isLoading}
      isLoading={isLoading}
      placeholder="Select a channel"
      value={selected != null && render(selected)}
      options={options}
      onChange={(e) => e && onChange(e.value)}
    />
  );
}
