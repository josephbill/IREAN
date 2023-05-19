import { Helmet } from 'react-helmet-async';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Select, MenuItem, InputLabel, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { LoadingButton } from '@mui/lab';
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

  // local storage item 
  const username = localStorage.getItem("username")
  const userid = localStorage.getItem("userid")
  const verification = localStorage.getItem("verification")


 console.log(userid)
 
  const handleClick = () => {
 
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
        alert(response.msg)
    } else {
        alert("process error, kindly check all fields and retry process")
    }
 
  })
  .catch(error => {
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
        <title> Update Profile | IREAN </title>
      </Helmet>

      <Container>
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
        <LoadingButton fullWidth size="medium" type="submit" variant="contained" onClick={handleClick}>
        Update Profile
      </LoadingButton>
      </Container>
    </>
  );
}
