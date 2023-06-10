import { Helmet } from 'react-helmet-async';
// @mui
import { Link, Stack, IconButton, InputAdornment, Button, TextField, Checkbox, Select, MenuItem, InputLabel, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { LoadingButton } from '@mui/lab';
import LoadingSpinner from '../utils/loadingSpinner';
// components
import Iconify from '../components/iconify/Iconify';

// ----------------------------------------------------------------------

export default function ProfilePage() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [phonenumber, setPhoneNumber] = useState('');
  const [profileImage,setProfileImage] = useState('');
  const [profileAttachment,setProfileAttachment] = useState('');
  const [memberid, setMemberId] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  // local storage item 
  const username = localStorage.getItem("username")
  const userid = localStorage.getItem("userid")
  const verification = localStorage.getItem("verification")


 console.log(userid)



  const handleClick = () => {
    setIsLoading(true)
    const formData = new FormData();
    formData.append("user_id", userid);
    formData.append("userphone", phonenumber);
    formData.append("useremail", email);
    formData.append("profileimages", profileImage);
    formData.append("profileattachements", profileAttachment);
  
    // console.log(Object.fromEntries(formData));
fetch("http://127.0.0.1:3000/profiles", {
  method: "POST",
  body: formData
})
  .then(response => response.json())
  .then(response => {
    console.log(response);
    if(response.result){
       // alert(response.msg)
       setIsLoading(false)
       alert(response.msg)
       navigate('/dashboard/viewProfile')
    } else {
      setIsLoading(false)
      alert("process error, kindly check all fields and retry process")
    }
 
  })
  .catch(error => {
    setIsLoading(false)
    console.log(error);
    alert("An error occurred while processing the request.");
  });
};


  
  const handleFileChange = (e) => {
    if (e.target.files) {
    setProfileImage(e.target.files[0]);
    }
  };
  const handleAttachmentChange = (e) => {
    if (e.target.files) {
    setProfileAttachment(e.target.files[0]);
    }
  };

  return (
    <>
      <Helmet>
        <title> Submit Profile | IREAN </title>
      </Helmet>

      {isLoading ? <LoadingSpinner /> : null}

      <Container>

        
      <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => navigate('/dashboard/viewProfile')}
          >
            View Profile
          </Button>
          <Button variant="contained" color='warning' startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => navigate('/dashboard/updateprofile')}
          >
            Update Profile
          </Button>
          </Stack>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Update Profile
          </Typography>
        </Stack>


        <Stack>
        <TextField name="email" label="Email Address" style={{
          marginBottom : 10
        }} onChange={e => setEmail(e.target.value)} />
        <TextField name="phonenumber" label="Phone Number" style={{
          marginBottom : 10
        }} onChange={e => setPhoneNumber(e.target.value)} />
        <Typography variant='h6'>
         Profile Image
        </Typography>
        <TextField type="file" name="profileimage" onChange={handleFileChange} style={{
          marginBottom : 10
        }}/>
        <Typography variant='h6'>
         Profile Attachment 
        </Typography>
         <TextField type="file" name="profileattachment" onChange={handleAttachmentChange} style={{
          marginBottom : 10
        }}/>
        </Stack>
        <LoadingButton fullWidth size="medium" type="submit" variant="contained" style={{
          marginBottom : 10}} onClick={handleClick}>
        Submit Profile
      </LoadingButton>

  
      </Container>
    </>
  );
}
