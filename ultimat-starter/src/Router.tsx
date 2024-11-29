import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '@/UI/components/layout/Layout';

const HomePage = lazy(() => import('@/UI/pages/HomePage'));
const WorkPage = lazy(() => import('@/UI/pages/WorkPage'));
const ItemPage = lazy(() => import('@/UI/pages/ItemPage'));
const NotFoundPage = lazy(() => import('@/UI/pages/NotFoundPage'));

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="work">
            <Route index element={<WorkPage />} />
            <Route path=":id" element={<ItemPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
