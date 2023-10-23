import {
  CSSVariablesResolver,
  MantineProvider,
  MantineTheme,
  createTheme,
  localStorageColorSchemeManager
} from '@mantine/core';
import { PropsWithChildren } from 'react';

const THEME_KEY = 'mantine-color-scheme';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif'
});

const resolver: CSSVariablesResolver = (theme: MantineTheme) => ({
  variables: {
    '--my-primary-color': theme.colors.blue[5]
  },
  light: {
    '--my-primary-color': theme.colors.blue[5]
  },
  dark: {
    '--my-primary-color': theme.colors.blue[5]
  }
});

export default function ThemeProvider({ children }: PropsWithChildren) {
  const colorSchemeManager = localStorageColorSchemeManager({ key: THEME_KEY });

  return (
    <MantineProvider
      colorSchemeManager={colorSchemeManager}
      theme={theme}
      cssVariablesResolver={resolver}
    >
      {children}
    </MantineProvider>
  );
}
