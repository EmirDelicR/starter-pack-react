import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from '@/UI/App';

const AuthPage = lazy(() => import('@/features/auth/Auth'));
const HomePage = lazy(() => import('@/UI/pages/home/HomePage'));
const ProfilePage = lazy(() => import('@/UI/pages/profile/ProfilePage'));
const WorkPage = lazy(() => import('@/UI/pages/work/WorkPage'));
const EmailPage = lazy(() => import('@/UI/pages/email/EmailPage'));
const NotFoundPage = lazy(() => import('@/UI/pages/404/NotFoundPage'));

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="work" element={<WorkPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="emails" element={<EmailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
