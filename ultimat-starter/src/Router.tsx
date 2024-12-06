import { lazy } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router';
import { Layout } from '@/UI/components/layout/Layout';
import { itemLoader } from '@/UI/pages/work/ItemPage';
import { itemsLoader } from '@/UI/pages/work/WorkPage';
import { itemApiLoader } from '@/UI/pages/workApi/ItemApiPage';
import { itemsApiLoader } from '@/UI/pages/workApi/WorkApiPage';
import ErrorPage from './UI/pages/ErrorPage';

const HomePage = lazy(() => import('@/UI/pages/HomePage'));
const WorkPage = lazy(() => import('@/UI/pages/work/WorkPage'));
const ItemPage = lazy(() => import('@/UI/pages/work/ItemPage'));
const WorkApiPage = lazy(() => import('@/UI/pages/workApi/WorkApiPage'));
const ItemApiPage = lazy(() => import('@/UI/pages/workApi/ItemApiPage'));
const NotFoundPage = lazy(() => import('@/UI/pages/NotFoundPage'));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="work">
        <Route index element={<WorkPage />} loader={itemsLoader} />
        <Route path=":id" element={<ItemPage />} loader={itemLoader} />
      </Route>
      <Route path="work-api" errorElement={<ErrorPage />}>
        <Route index element={<WorkApiPage />} loader={itemsApiLoader} />
        <Route path=":id" element={<ItemApiPage />} loader={itemApiLoader} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);
