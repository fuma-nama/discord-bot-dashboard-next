import { discord } from 'api/discord';
import { bot } from 'api/bot';
import { Options } from './core';

/**
 * CORS cookies are not working on IOS
 */
export const IOSTokenStorage = 'ios-session-token';

export function withBot<T extends Options>(init?: T): T {
  const token = localStorage.getItem(IOSTokenStorage);

  return {
    ...init,
    origin: bot,
    init: {
      ...init?.init,
      headers: {
        Authorization: token != null ? `Bearer ${token}` : undefined,
      },
      credentials: 'include',
      mode: 'cors',
    },
  };
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
        authorization: `Bearer ${accessToken}`,
      },
    },
  };
}
