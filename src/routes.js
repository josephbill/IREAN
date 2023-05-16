import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import SignUpage from './pages/SignUpage';
import DashboardAppPage from './pages/DashboardAppPage';
import AddUsersPage from './pages/AddUsersPage';
import RealEstateAgentPage from './pages/RealEstateAgentPage';
import PropOwnerPage from './pages/PropOwnerPage';
import SalesStaffPage from './pages/SalesStaffPage';
import PropChampPage from './pages/PropChampPage';
import MarketingStaffPage from './pages/MarketingStaffPage';

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
        { path: 'realEstateAgents', element: <RealEstateAgentPage /> },
        { path: 'propChampions', element: <PropChampPage /> },
        { path: 'salesSupport', element: <SalesStaffPage /> },
        { path: 'mediaMarketing', element: <MarketingStaffPage /> },
        { path: 'propertyOwners', element: <PropOwnerPage /> },
      ],
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
