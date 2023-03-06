import { useMutation, useQuery } from '@tanstack/react-query';
import { client, Keys } from '@/stores';
import { AccessToken } from './server';
import { callReturn, callDefault } from '@/utils/fetch';

/**
 * Get discord oauth2 access token if logged in, otherwise return null
 */
async function auth() {
  return await callReturn<AccessToken>('/api/auth', {
    method: 'GET',
  });
}

async function logout() {
  await callDefault(`/api/auth/signout`, {
    method: 'POST',
  });
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
  return useMutation(['logout'], () => logout(), {
    onSuccess() {
      return client.invalidateQueries(Keys.login);
    },
  });
}
