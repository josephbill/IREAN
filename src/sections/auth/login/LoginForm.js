import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import LoadingSpinner from '../../../utils/loadingSpinner';
// components
import Iconify from '../../../components/iconify';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleClick = () => {
    // here navigate to dashboard as per user role.
    // login user here 
      // sign up data 
      setIsLoading(true)
      const payload = 
        {
          "user": {
            "username": username,
            "password": password
          }
        }
    console.log(payload)

    fetch("https://irean.onrender.com/login",{
      method: "POST",
      headers: {
            "Content-Type" : "application/json"
      },
      body: JSON.stringify(payload),
    }).then(response =>response.json())
    .then(response => {
      console.log(response)
      console.log("User role is -------------------------")
      console.log(response.user.userrole) 
      if(response.logged_in){
        localStorage.setItem("user", null);
        localStorage.setItem("userid",response.user.id)
        localStorage.setItem("createdId",response.user.id)
        localStorage.setItem("username",response.user.username)
        localStorage.setItem("verification",response.user.verification)
        localStorage.setItem("userrole",response.user.userrole)
        changeUi(response.user.userrole);

      }
    }).catch(error => {
      setIsLoading(false)
      alert("this account cannot be verified.")
    })
  };

  const changeUi = (role) => {
    console.log("role is -----------------")
     console.log(role)
      setIsLoading(false)
        navigate('/dashboard/app ', {
           replace: true,
          });
  }

  return (
    <>
         {isLoading ? <LoadingSpinner /> : null}
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
