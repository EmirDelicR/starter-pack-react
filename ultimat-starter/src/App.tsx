import '@mantine/core/styles.css';

import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { MantineProvider } from '@mantine/core';
import { router } from '@/Router';
import { createStore } from '@/store';
import { theme } from '@/theme';

export default function App() {
  return (
    <React.StrictMode>
      <MantineProvider theme={theme}>
        <Provider store={createStore()}>
          <RouterProvider router={router} />
        </Provider>
      </MantineProvider>
    </React.StrictMode>
  );
}
