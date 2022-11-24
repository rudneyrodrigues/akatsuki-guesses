import { type AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';

import { theme } from '../styles/theme';
import { SidebarDrawProvider } from '../contexts/SidebarDrawerContext';

export default function App({
  Component,
  pageProps: {
    session,
    ...pageProps
  }
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <SidebarDrawProvider>
          <NextNProgress height={2} color="#F7DD43" />
          <Component {...pageProps} />
        </SidebarDrawProvider>
      </ChakraProvider>
    </SessionProvider>
  )
}
