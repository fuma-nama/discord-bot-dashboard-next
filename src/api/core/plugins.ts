import { AccessToken } from '@/utils/auth/server';
import { bot } from '@/api/bot';
import { discord } from '@/api/discord';
import { Options } from './core';

export function withBot<T extends Options>(session: AccessToken, options?: T): T {
  return {
    ...options,
    origin: bot,
    init: {
      ...options?.init,
      headers: {
        Authorization: `${session.token_type} ${session.access_token}`,
        ...options?.init?.headers,
      },
      credentials: 'include',
      mode: 'cors',
    },
  } as T;
}

export function withDiscord<T extends Options>(accessToken: string, options?: T): T {
  const init = options?.init;

  return {
    ...options,
    origin: discord,
    init: {
      ...init,
      headers: {
        ...init?.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    },
  } as T;
}
