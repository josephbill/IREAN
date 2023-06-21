// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfigRoles = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Listings',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Profile',
    path: '/dashboard/viewprofile',
    icon: icon('ic_user'),
  },
];


export default navConfigRoles;
