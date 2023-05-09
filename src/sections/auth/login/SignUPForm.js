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


  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleClick = () => {
    // here navigate to dashboard as per user role.
    //create account 
    
    navigate('/login', { replace: true });

  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="username" label="Username / IREAN ID" />
        <InputLabel id="user-type-label">User Type</InputLabel>
        <Select
          labelId="user-type-label"
          id="user-type"
          value={userType}
          onChange={handleUserTypeChange}
          label="User Type"
        >
          <MenuItem value={'realEstateAgent'}>Real Estate Agent</MenuItem>
          <MenuItem value={'propertyOwner'}>Property Owner</MenuItem>
        </Select>
      
        <TextField
          name="password"
          label="Password"
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
