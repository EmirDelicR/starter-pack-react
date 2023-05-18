import React from 'react';
import ReactDOM from 'react-dom/client';

import '@plugins/i18n/i18n.ts';

import App from './UI/App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
