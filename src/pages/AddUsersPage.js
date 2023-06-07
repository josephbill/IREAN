import { Helmet } from 'react-helmet-async';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Select, MenuItem, InputLabel, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// @mui
import { LoadingButton } from '@mui/lab';
import LoadingSpinner from '../utils/loadingSpinner';

// components
import Iconify from '../components/iconify/Iconify';

// ----------------------------------------------------------------------

export default function AddUsersPage() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [userType, setUserType] = useState('');
  const [userName,setUserName] = useState('');
  const [password,setPassword] = useState('');
  const [memberid, setMemberId] = useState('');
  const [email, setEmail] = useState('');

  const [isLoading, setIsLoading] = useState(false);


  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleClick = () => {

  setIsLoading(true)
   const newPass = memberid + email;
   console.log(newPass)

    // sign up data 
    const payload = {
        "username" : userName,
        "userrole" : userType,
        "password" : newPass
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
        setIsLoading(false)
       // alert("Account Created Successfully")
        navigate('/dashboard/user', { replace: true });
      } else {
        setIsLoading(false)
        console.log(response.statusText)
        alert("Fill in all fields to complete account creation.")
      }
    }).catch(error => {
      setIsLoading(false)
      console.log("error")
    })

  };


  return (
    <>
      <Helmet>
        <title> Add Users | IREAN </title>
      </Helmet>

      {isLoading ? <LoadingSpinner /> : null}


      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Add Users
          </Typography>
        </Stack>

        <Stack>
        <TextField name="username" label="Username" style={{
          marginBottom : 10
        }} onChange={e => setUserName(e.target.value)} />
        <TextField name="memberid" label="Irean Member ID" style={{
          marginBottom : 10
        }} onChange={e => setMemberId(e.target.value)} />
        <InputLabel id="user-type-label">Members Role</InputLabel>
        <Select
          labelId="user-type-label"
          id="user-type"
          label="User Type"
          value={userType}
          onChange={handleUserTypeChange}
          style={{
            marginBottom : 10
          }}
        >
          <MenuItem value={'3'}>Property Champion</MenuItem>
          <MenuItem value={'4'}>Sales Support</MenuItem>
          <MenuItem value={'5'}>Media and Marketing</MenuItem>
        </Select>
        <TextField name="memberemail" label="IREAN Email" style={{
          marginBottom : 10
        }} onChange={e => setEmail(e.target.value)}/>
        </Stack>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Create Account For User
      </LoadingButton>
      </Container>
    </>
  );
}
