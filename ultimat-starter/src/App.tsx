import '@mantine/core/styles.css';

import React from 'react';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { Router } from '@/Router';
import { createStore } from '@/store';
import { theme } from '@/theme';

export default function App() {
  return (
    <React.StrictMode>
      <MantineProvider theme={theme}>
        <Provider store={createStore()}>
          <Router />
        </Provider>
      </MantineProvider>
    </React.StrictMode>
  );
}
