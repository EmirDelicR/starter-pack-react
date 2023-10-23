import React from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/components/App';

import './index.scss';

const REACT_VERSION = React.version;
const container = document.getElementById('root') as HTMLElement;

const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <div className="version">React version `${REACT_VERSION}`</div>
    <App />
  </React.StrictMode>
);
