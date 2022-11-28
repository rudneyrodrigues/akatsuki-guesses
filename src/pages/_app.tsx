import { type AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider, Flex } from '@chakra-ui/react';

import { theme } from '../styles/theme';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
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
          <Header />
          <Flex as="main" flex={1} maxW="container.xl" mx="auto" minH="calc(100vh - 5rem)">
            <Component {...pageProps} />
            <Sidebar />
          </Flex>
        </SidebarDrawProvider>
      </ChakraProvider>
    </SessionProvider>
  )
}
