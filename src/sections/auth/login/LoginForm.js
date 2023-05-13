import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');


  const handleClick = () => {
    // here navigate to dashboard as per user role.
    // login user here 
      // sign up data 
      const payload = 
        {
          "user": {
            "username": username,
            "password": password
          }
        }
    console.log(payload)

    fetch("http://127.0.0.1:3000/login",{
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
            "Content-Type" : "application/json"
      }
    }).then(response => {
      // Check if a session was created by looking for the Set-Cookie header
      if (response.headers.has("Set-Cookie")) {
        console.log("Session created!");
      }
      return response.json();
    })
    .then(response => {
      console.log(JSON.stringify(response))
      if(response.logged_in){
        if(response.user.userrole === "0") {
          localStorage.setItem("user", null);

         alert("Account Verified Successfully")
          navigate('/dashboard', {
             replace: true,
             state: {
              username : response.user.username,
              userId: response.user.id
             }
            
            });
        } else {
          alert("Dashboard under Development.")
        }
      
      } else {
        console.log(response)
        alert(response.errors[0])
      }
    }).catch(error => {
      console.log(error)
    })
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="username" label="Username / IREAN ID" onChange={e => setUsername(e.target.value)} />

        <TextField
          name="password"
          label="Password"
          onChange={e => setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
