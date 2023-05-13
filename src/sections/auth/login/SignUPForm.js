import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Select, MenuItem, InputLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function SignUPForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [userType, setUserType] = useState('');
  const [userName,setUserName] = useState('');
  const [password,setPassword] = useState('');


  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleClick = () => {
    // sign up data 
    const payload = {
        "username" : userName,
        "userrole" : userType,
        "password" : password
    }
    console.log(payload)

    fetch("http://127.0.0.1:3000/users",{
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
            "Content-Type" : "application/json"
      }
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
      if(response.status === "created"){
        alert("Account Created Successfully")
        navigate('/login', { replace: true });
      } else {
        console.log(response.statusText)
        alert("Fill in all fields to complete account creation.")
      }
    }).catch(error => {
      console.log("error")
    })

  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="username" label="Username" onChange={e => setUserName(e.target.value)} />
        <InputLabel id="user-type-label">User Type</InputLabel>
        <Select
          labelId="user-type-label"
          id="user-type"
          value={userType}
          onChange={handleUserTypeChange}
          label="User Type"
        >
          <MenuItem value={'1'}>Property Owner</MenuItem>
          <MenuItem value={'2'}>Real Estate Agent</MenuItem>
        </Select>
      
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
                <TextField
          name="conPassword"
          label="Confirm Password"
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
        {/* <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Create Account
      </LoadingButton>
    </>
  );
}
