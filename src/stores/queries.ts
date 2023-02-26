import useMounted from '@/hooks/use-mounted';
import { CustomFeatures, CustomGuildInfo } from '../config/types';
import { useAPIStore } from './apiStore';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { UserInfo, getGuild, getGuilds, fetchUserInfo } from 'api/discord';
import {
  auth,
  disableFeature,
  enableFeature,
  fetchGuildChannels,
  fetchGuildInfo,
  fetchGuildRoles,
  getFeature,
  logout,
  updateFeature,
} from 'api/bot';
import { GuildInfo } from 'config/types';

export const client = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: 0,
    },
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: 0,
    },
  },
});

export const Keys = {
  login: ['login'],
  guild_info: (guild: string) => ['guild_info', guild],
  features: (guild: string, feature: string) => ['feature', guild, feature],
  guildRoles: (guild: string) => ['gulid_roles', guild],
  guildChannels: (guild: string) => ['gulid_channel', guild],
};

export const Mutations = {
  updateFeature: (guild: string, id: string) => ['feature', guild, id],
};

export function useGuild(id: string) {
  const accessToken = useAPIStore((s) => s.accessToken);

  return useQuery(['guild', id], () => getGuild(accessToken as string, id), {
    enabled: accessToken != null,
  });
}

export function useGuilds() {
  const accessToken = useAPIStore((s) => s.accessToken);

  return useQuery(['user_guilds'], () => getGuilds(accessToken as string), {
    enabled: accessToken != null,
  });
}

export function useLogoutMutation() {
  return useMutation(['logout'], () => logout(), {
    onSuccess() {
      client.setQueryData<string | null>(Keys.login, () => null);
    },
  });
}

/**
 * Get discord oauth2 access token if logged in
 *
 * Then Store the token into api store
 */
export function useLoginQuery() {
  const mounted = useMounted();
  return useQuery(Keys.login, () => auth(), {
    enabled: mounted,
    onSuccess(token) {
      useAPIStore.setState({
        accessToken: token ?? undefined,
      });
    },
  });
}

export function useSelfUserQuery() {
  const accessToken = useAPIStore((s) => s.accessToken);

  return useQuery<UserInfo>(['users', 'me'], () => fetchUserInfo(accessToken!!), {
    enabled: accessToken != null,
    staleTime: Infinity,
  });
}

export function useGuildInfoQuery(guild: string) {
  return useQuery<CustomGuildInfo | null>(Keys.guild_info(guild), () => fetchGuildInfo(guild), {
    refetchOnWindowFocus: true,
    retry: false,
    staleTime: 0,
  });
}

export function useFeatureQuery<K extends keyof CustomFeatures>(guild: string, feature: K) {
  return useQuery(Keys.features(guild, feature), () => getFeature(guild, feature));
}

export type EnableFeatureOptions = { enabled: boolean };
export function useEnableFeatureMutation(guild: string, feature: string) {
  return useMutation(
    Mutations.updateFeature(guild, feature),
    ({ enabled }: EnableFeatureOptions) =>
      enabled ? enableFeature(guild, feature) : disableFeature(guild, feature),
    {
      async onSuccess(_, { enabled }) {
        await client.invalidateQueries(Keys.features(guild, feature));
        await client.setQueryData<GuildInfo | null>(Keys.guild_info(guild), (prev) => {
          if (prev == null) return null;

          if (enabled) {
            return {
              ...prev,
              enabledFeatures: prev.enabledFeatures.includes(feature)
                ? prev.enabledFeatures
                : [...prev.enabledFeatures, feature],
            };
          } else {
            return {
              ...prev,
              enabledFeatures: prev.enabledFeatures.filter((f) => f !== feature),
            };
          }
        });
      },
    }
  );
}

export type UpdateFeatureOptions = {
  guild: string;
  feature: keyof CustomFeatures;
  options: FormData | string;
};
export function useUpdateFeatureMutation() {
  return useMutation(
    (options: UpdateFeatureOptions) =>
      updateFeature(options.guild, options.feature, options.options),
    {
      async onSuccess(updated, options) {
        return await client.setQueryData(Keys.features(options.guild, options.feature), updated);
      },
    }
  );
}

export function useGuildRolesQuery(guild: string) {
  return useQuery(Keys.guildRoles(guild), () => fetchGuildRoles(guild));
}

export function useGuildChannelsQuery(guild: string) {
  return useQuery(Keys.guildChannels(guild), () => fetchGuildChannels(guild));
}
