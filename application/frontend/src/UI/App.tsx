import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Loader } from '@/UI/components';
import { Navigation } from '@/UI/elements';
import useAutoLogin from '@/hooks/useAutoLogin';

function FallbackLoader() {
  return (
    <div className="page-loader">
      <Loader size={10} />
    </div>
  );
}

export default function App() {
  useAutoLogin();

  return (
    <div className="app">
      <Navigation />
      <Suspense fallback={<FallbackLoader />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
