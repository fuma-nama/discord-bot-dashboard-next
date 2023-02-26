import { IOSTokenStorage } from 'api/core/plugins';
import { CustomFeatures, CustomGuildInfo } from 'config/types/custom-types';
import { withBot, callDefault, callReturn } from './core';
import { ChannelTypes } from './discord';

export const bot = process.env.NEXT_PUBLIC_API_ENDPOINT ?? 'http://localhost:8080';

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
 * Get discord oauth2 access token if logged in, otherwise return null
 */
export async function auth() {
  return await callReturn<string | null>(
    '/auth',
    withBot({
      method: 'GET',
      allowed: {
        401: () => null,
      },
    })
  );
}

export async function logout() {
  await callDefault(
    `/auth/signout`,
    withBot({
      method: 'POST',
    })
  );

  localStorage.removeItem(IOSTokenStorage);
}

/**
 * Get custom guild info on from backend
 *
 * @param guild Guild ID
 * @return Guild info, or null if bot hasn't joined the guild
 */
export async function fetchGuildInfo(guild: string): Promise<CustomGuildInfo | null> {
  return await callReturn<CustomGuildInfo | null>(
    `/guilds/${guild}`,
    withBot({
      method: 'GET',
      allowed: {
        404: () => null,
      },
    })
  );
}

export async function enableFeature(guild: string, feature: string) {
  return await callDefault(
    `/guilds/${guild}/features/${feature}`,
    withBot({
      method: 'POST',
    })
  );
}

export async function disableFeature(guild: string, feature: string) {
  return await callDefault(
    `/guilds/${guild}/features/${feature}`,
    withBot({
      method: 'DELETE',
    })
  );
}

export async function getFeature<K extends keyof CustomFeatures>(
  guild: string,
  feature: K
): Promise<CustomFeatures[K]> {
  return await callReturn<CustomFeatures[K]>(
    `/guilds/${guild}/features/${feature}`,
    withBot({
      method: 'GET',
    })
  );
}

export async function updateFeature<K extends keyof CustomFeatures>(
  guild: string,
  feature: K,
  options: FormData | string
): Promise<CustomFeatures[K]> {
  return await callReturn<CustomFeatures[K]>(
    `/guilds/${guild}/features/${feature}`,
    withBot({
      method: 'PATCH',
      body: options,
    })
  );
}

/**
 * Used for custom forms
 *
 * The dashboard itself doesn't use it
 * @returns Guild roles
 */
export async function fetchGuildRoles(guild: string) {
  return await callReturn<Role[]>(
    `/guilds/${guild}/roles`,
    withBot({
      method: 'GET',
    })
  );
}

/**
 * @returns Guild channels
 */
export async function fetchGuildChannels(guild: string) {
  return await callReturn<GuildChannel[]>(
    `/guilds/${guild}/channels`,
    withBot({
      method: 'GET',
    })
  );
}
