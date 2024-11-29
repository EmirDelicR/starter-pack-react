import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '@/UI/components/layout/Layout';

const HomePage = lazy(() => import('@/UI/pages/HomePage'));
const WorkPage = lazy(() => import('@/UI/pages/WorkPage'));
const NotFoundPage = lazy(() => import('@/UI/pages/NotFoundPage'));

// Good post: https://www.dhiwise.com/post/the-power-of-createbrowserrouter-optimizing-your-react-app
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: 'work',
          element: <WorkPage />,
        },
        {
          path: '*',
          element: <NotFoundPage />,
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export function Router() {
  return <RouterProvider router={router} />;
}
