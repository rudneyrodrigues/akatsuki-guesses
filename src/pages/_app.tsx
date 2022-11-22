import { type AppProps } from 'next/app';

import "../styles/global.css";

export default function App({
  Component,
  pageProps: {
    session,
    ...pageProps
  }
}: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}
