import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '@/components/Layout/Layout';
import { HomePage } from '@/pages/Home.page';
import { NotFoundPage } from '@/pages/NotFound.page';

// Good post: https://www.dhiwise.com/post/the-power-of-createbrowserrouter-optimizing-your-react-app
// [] create form using react form
// [] create pagination with URL
// [] add RTKQuery with API and Store SLICE

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
          path: 'about',
          element: <div>About page</div>,
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
