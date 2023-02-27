import { useMutation, useQuery } from '@tanstack/react-query';
import { auth, logout } from 'api/bot';
import { client, Keys } from 'stores';
import { AccessToken } from './server';

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
