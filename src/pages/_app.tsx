import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { theme } from '@/theme/config';
import { QueryClientProvider } from '@tanstack/react-query';
import { client } from '@/api/hooks';
import { NextPage } from 'next';
import { ReactNode } from 'react';
import Router from 'next/router';
import Head from 'next/head';

import '@/styles/global.css';
import 'react-calendar/dist/Calendar.css';
import '@/styles/date-picker.css';
import { useSession } from '@/utils/auth/hooks';

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
        <Head>
          <title>Demo Bot</title>
        </Head>
        <Content {...props} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

function Content({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((c) => c);
  const { status } = useSession();

  if (status === 'unauthenticated' && Component.auth === true) {
    Router.replace('/auth/signin');
    return <></>;
  }

  if (status === 'authenticated' && Component.auth === false) {
    Router.replace('/user/home');
    return <></>;
  }

  return <>{getLayout(<Component {...pageProps} />)}</>;
}
