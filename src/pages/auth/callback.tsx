import { IOSTokenStorage } from 'api/core/plugins';
import Router from 'next/router';
import { useEffect } from 'react';
import { client, Keys } from 'stores';

export default function CallbackPage() {
  useEffect(() => {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const params = new URLSearchParams(fragment);
    const token = params.get('token');

    if (token != null) {
      localStorage.setItem(IOSTokenStorage, token);
      client.invalidateQueries(Keys.login);
    }

    Router.replace('/user/home');
  }, []);

  return <></>;
}
