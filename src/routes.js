import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard/DashboardLayout';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ListingsPages/ListingsPage';
import SignUpage from './pages/SignUpage';
import DashboardAppPage from './pages/DashboardAppPage';
import AddUsersPage from './pages/AddUsersPage';

import ProfilePage from './pages/ProfilePage';
import ListingForm from './pages/ListingsPages/ListingForm';
import ViewProfile from './pages/ViewProfile';
import UpdateProfile from './pages/UpdateProfile';
import SeeListing from './pages/ListingsPages/SeeListing';
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        {path: 'addUsers', element: <AddUsersPage />},
        { path: 'profilepage', element: <ProfilePage /> },
        { path: 'viewprofile', element: <ViewProfile /> },
        { path: 'updateprofile', element: <UpdateProfile /> },
        {path: 'listings' , element: <ListingForm/>}
      ],
    },
    {
       path: '/product/:id', element: <SeeListing /> 

    },
    {
      path: 'signup',
      element: <SignUpage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
