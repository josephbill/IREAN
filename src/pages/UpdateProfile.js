import { Helmet } from 'react-helmet-async';
// @mui
import { Link, Stack, IconButton, InputAdornment, Button, TextField, Checkbox, Select, MenuItem, InputLabel, Container, Typography } from '@mui/material';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { LoadingButton } from '@mui/lab';
import LoadingSpinner from '../utils/loadingSpinner';
// components
import Iconify from '../components/iconify/Iconify';

// ----------------------------------------------------------------------

export default function UpdateProfile() {

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


  const [attachmentPath,setAttachmentPath] = useState('');
  const [profileImages,setProfileImages] = useState('');
  const [useremail,setUseremail] = useState('');
  const [userPhone,setUserPhone] = useState('')


 console.log(userid)


 
 useEffect(() => {
  const fetchData = async () => {
      try {
          const response = await fetch(`https://irean.onrender.com/profiles/${userid}`); // Append userId to the URL
          const data = await response.json();
          console.log("In update profile.......")
        console.log(data.user.useremail); // Do something with the fetched data
        savetoState(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
},[])


const savetoState = (data) => {
    setAttachmentPath(data.user.profileattachements.url)
    setProfileImages(data.user.profileimages.url)
    setUseremail(data.user.useremail)
    setUserPhone(data.user.userphone)
    console.log(attachmentPath,profileImages,useremail,userPhone)
}


 const handleUpdate = () => {
  setIsLoading(true)
  const formData = new FormData();
  formData.append("user_id", userid);
  formData.append("userphone", phonenumber);
  formData.append("useremail", email);
  formData.append("profileimages", profileImage);
  formData.append("profileattachements", profileAttachment);

  // console.log(Object.fromEntries(formData));
fetch("https://irean.onrender.com/profiles/1", {
method: "PUT",
body: formData
})
.then(response => response.json())
.then(response => {
  console.log(response);
  if(response.result){
     // alert(response.msg)
     setIsLoading(false)
     alert(response.msg)
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
        <title> Update Profile | IREAN </title>
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
          </Stack>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Update Profile
          </Typography>
        </Stack>


        <Stack>
        <Stack direction="row" alignItems="center"  mb={2}>

         <span>*</span> <span style={{color: 'black'}}>{useremail}</span>
         </Stack>
        <TextField name="email" label="New Email Address" style={{
          marginBottom : 10
        }} onChange={e => setEmail(e.target.value)} />
          <Stack direction="row" alignItems="center"  mb={1}>

<span>*</span> <span style={{color: 'black'}}>{userPhone}</span>
</Stack>
        <TextField name="phonenumber" label="New Phone Number" style={{
          marginBottom : 10
        }} onChange={e => setPhoneNumber(e.target.value)} />
        <Typography variant='h6'>
        Profile Images : <span style={{fontWeight: 'lighter', color: 'blue'}}>*{profileImages}</span>
        </Typography>
        <TextField type="file" name="profileimage" onChange={handleFileChange} style={{
          marginBottom : 10
        }}/>
        <Typography variant='h6'>
         Profile Attachment : <span style={{fontWeight: 'lighter', color: 'blue'}}>*{attachmentPath}</span>
        </Typography>
         <TextField type="file" name="profileattachment" onChange={handleAttachmentChange} style={{
          marginBottom : 10
        }}/>
        </Stack>

      <LoadingButton fullWidth color='warning' size="medium" type="submit" variant="contained" onClick={handleUpdate}>
        Update Profile
      </LoadingButton>
      </Container>
    </>
  );
}
