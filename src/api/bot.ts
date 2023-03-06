import { CustomFeatures, CustomGuildInfo } from '@/config/types/custom-types';
import { AccessToken } from '@/utils/auth/server';
import { callDefault, callReturn } from '@/utils/fetch/core';
import { botRequest } from '@/utils/fetch/requests';
import { ChannelTypes } from './discord';

export type Role = {
  id: string;
  name: string;
  color: number;
  position: number;
  icon?: {
    iconUrl?: string;
    emoji?: string;
  };
};

export type GuildChannel = {
  id: string;
  name: string;
  type: ChannelTypes;
  /**
   * parent category of the channel
   */
  category?: string;
};

/**
 * Get custom guild info on from backend
 *
 * @param guild Guild ID
 * @return Guild info, or null if bot hasn't joined the guild
 */
export async function fetchGuildInfo(
  session: AccessToken,
  guild: string
): Promise<CustomGuildInfo | null> {
  return await callReturn<CustomGuildInfo | null>(
    `/guilds/${guild}`,
    botRequest(session, {
      request: {
        method: 'GET',
      },
      allowed: {
        404: () => null,
      },
    })
  );
}

export async function enableFeature(session: AccessToken, guild: string, feature: string) {
  return await callDefault(
    `/guilds/${guild}/features/${feature}`,
    botRequest(session, {
      request: {
        method: 'POST',
      },
    })
  );
}

export async function disableFeature(session: AccessToken, guild: string, feature: string) {
  return await callDefault(
    `/guilds/${guild}/features/${feature}`,
    botRequest(session, {
      request: {
        method: 'DELETE',
      },
    })
  );
}

export async function getFeature<K extends keyof CustomFeatures>(
  session: AccessToken,
  guild: string,
  feature: K
): Promise<CustomFeatures[K]> {
  return await callReturn<CustomFeatures[K]>(
    `/guilds/${guild}/features/${feature}`,
    botRequest(session, {
      request: {
        method: 'GET',
      },
    })
  );
}

export async function updateFeature<K extends keyof CustomFeatures>(
  session: AccessToken,
  guild: string,
  feature: K,
  options: FormData | string
): Promise<CustomFeatures[K]> {
  const isForm = options instanceof FormData;

  return await callReturn<CustomFeatures[K]>(
    `/guilds/${guild}/features/${feature}`,
    botRequest(session, {
      request: {
        method: 'PATCH',
        headers: isForm
          ? {}
          : {
              'Content-Type': 'application/json',
            },
        body: options,
      },
    })
  );
}

/**
 * Used for custom forms
 *
 * The dashboard itself doesn't use it
 * @returns Guild roles
 */
export async function fetchGuildRoles(session: AccessToken, guild: string) {
  return await callReturn<Role[]>(
    `/guilds/${guild}/roles`,
    botRequest(session, {
      request: {
        method: 'GET',
      },
    })
  );
}

/**
 * @returns Guild channels
 */
export async function fetchGuildChannels(session: AccessToken, guild: string) {
  return await callReturn<GuildChannel[]>(
    `/guilds/${guild}/channels`,
    botRequest(session, {
      request: {
        method: 'GET',
      },
    })
  );
}
