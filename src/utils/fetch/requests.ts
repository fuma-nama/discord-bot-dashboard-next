import { deepmerge } from 'deepmerge-ts';
import { AccessToken } from '@/utils/auth/server';
import { Options } from './core';

const bot_api_endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT ?? 'http://localhost:8080';
const discord_api_endpoint = 'https://discord.com/api/v9';

export function botRequest<T extends Options>(session: AccessToken, options: T): T {
  return {
    ...options,
    origin: bot_api_endpoint,
    request: deepmerge(
      {
        headers: {
          Authorization: `${session.token_type} ${session.access_token}`,
        },
        credentials: 'include',
        mode: 'cors',
      },
      options.request
    ),
  };
}

export function discordRequest<T extends Options>(accessToken: string, options: T): T {
  return {
    ...options,
    origin: discord_api_endpoint,
    request: deepmerge(
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      options.request
    ),
  };
}
