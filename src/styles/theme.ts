import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}

export const theme = extendTheme({
  colors: {
    gray: {
      100: "#E1E1E6",
      200: "#C4C4CC",
      300: "#8D8D99",
      400: "#7C7C8A",
      500: "#505059",
      600: "#323238",
      700: "#29292E",
      800: "#202024",
      900: "#121214",
    }
  },
  fonts: {
    heading: "'Rajdhani', sans-serif",
    body: "'Roboto', sans-serif",
  },
  styles: {
    global: (props: any) => ({
      'body': {
        bg: props.colorMode === 'dark' ? "gray.900": "gray.100",
        text: props.colorMode === 'dark' ? "gray.200" : "gray.800",
      }
    }),
  }
});
