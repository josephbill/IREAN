// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'users',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Listings',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Real Estate Agents',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Property Champions',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Sales Support',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Media and Marketing',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
