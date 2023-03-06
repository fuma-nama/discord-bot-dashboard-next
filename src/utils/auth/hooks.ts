import { useMutation, useQuery } from '@tanstack/react-query';
import { client, Keys } from '@/api/hooks';
import { AccessToken } from './server';
import { callReturn, callDefault } from '@/utils/fetch/core';
import Router from 'next/router';

/**
 * Get discord oauth2 access token if logged in, otherwise return null
 */
async function auth() {
  return await callReturn<AccessToken>('/api/auth', {
    request: {
      method: 'GET',
    },
  });
}

export async function logout() {
  await callDefault(`/api/auth/signout`, {
    request: {
      method: 'POST',
    },
  });

  await client.invalidateQueries(Keys.login);
  await Router.push('/auth/signin');
}

type SessionResult =
  | {
      status: 'authenticated';
      session: AccessToken;
    }
  | {
      status: 'loading' | 'unauthenticated';
      session: null;
    };

export function useSession(): SessionResult {
  const { isError, isLoading, data } = useQuery(Keys.login, () => auth());

  if (isError)
    return {
      status: 'unauthenticated',
      session: null,
    };

  if (isLoading)
    return {
      status: 'loading',
      session: null,
    };

  return {
    status: 'authenticated',
    session: data,
  };
}

export function useAccessToken() {
  const { session } = useSession();

  return session?.access_token;
}

export function useLogoutMutation() {
  return useMutation(['logout'], () => logout());
}
