import { createBrowserRouter } from 'react-router-dom';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import GameDetailPage from './pages/GameDetailPage';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import GuestOnlyRoute from './routes/GuestOnlyRoute';
import ProtectedRoute from './routes/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'games/:slug', element: <GameDetailPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'profile', element: <ProfilePage /> },
          { path: 'change-password', element: <ChangePasswordPage /> },
        ],
      },
    ],
  },
  {
    element: <GuestOnlyRoute />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
    ],
  },
]);

export default router;
