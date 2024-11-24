import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from '@/pages/Home.page';
import { Layout } from './components/Layout/Layout';

// Good post: https://www.dhiwise.com/post/the-power-of-createbrowserrouter-optimizing-your-react-app
// TODO @ed
// [] create 2 pages and navigate
// [] create form using react form
// [] create pagination with URL
// [] add RTKQuery with API and Store SLICE

const router = createBrowserRouter([
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
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
