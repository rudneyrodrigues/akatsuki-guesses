import { ColorModeScript } from '@chakra-ui/react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';

import { theme } from '../styles/theme';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-br">
        <Head>
          {/* Importando fontes do Google */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
        </Head>

        <body id="root">
          <Main />
          <NextScript />
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        </body>
      </Html>
    )
  }
};
