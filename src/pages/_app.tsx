import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { theme } from '@/theme';
import { QueryClientProvider } from '@tanstack/react-query';
import { client, useLoginQuery } from '@/stores';
import { NextPage } from 'next';
import { ReactNode, useEffect } from 'react';
import { QueryStatus } from 'components/panel/QueryPanel';
import { LoadingPanel } from 'components/panel/LoadingPanel';
import Router from 'next/router';

import '@/styles/global.css';
import 'react-calendar/dist/Calendar.css';
import '@/styles/date-picker.css';
import { common } from 'config/translations/common';

export type NextPageWithLayout = NextPage & {
  getLayout?: (children: ReactNode) => ReactNode;
  auth?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App(props: AppPropsWithLayout) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={client}>
        <Content {...props} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

function Content({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((c) => c);
  const t = common.useTranslations();
  const login = useLoginQuery();

  console.log(login.isSuccess);

  if (login.isSuccess) {
    if (login.data == null && Component.auth === true) {
      Router.replace('/auth/signin');
      return <></>;
    }

    if (login.data != null && Component.auth === false) {
      Router.replace('/user/home');
      return <></>;
    }
  }

  return (
    <QueryStatus query={login} error={t.fail.login} loading={<LoadingPanel size="lg" />}>
      {getLayout(<Component {...pageProps} />)}
    </QueryStatus>
  );
}
