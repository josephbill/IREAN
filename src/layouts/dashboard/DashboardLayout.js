import { useEffect,useState } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
//
import Header from './header';
import Nav from './nav';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout({prop}) {
  const [open, setOpen] = useState(false);

  const [newUserArray,setNewUserArray] = useState([])



  useEffect(() => {

      // Get the value stored in local storage under the key 'myKey'
const value = localStorage.getItem('user');

// Check if the value is null (which means the key doesn't exist in local storage)
if (value === null) {
  console.log('The value does not exist in local storage.');
} else {
  console.log(`The value in local storage is ${value}`);
  const checkLoginStatus = async () => {
    try {
      fetch("http://127.0.0.1:3000/users",{
        method : "GET",
        credentials : "include"
      }).then(response => response.json())
      .then(response => {
        console.log(response)
      })
    } catch (error) {
      console.log('API error:', error);
    }
  };
  checkLoginStatus();
}
 
  

}, [])


  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />

      <Nav openNav={open} onCloseNav={() => setOpen(false)} />

      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
}
