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
  const [userPhone,setUserPhone] = useState('');
  const [profileId, setProfileId] = useState('');
  const [agency,setAgency] = useState('IREAN');
  const [bio,setBio] = useState('');
  const [socials,setSocials] = useState('IREAN');

 console.log(userid)


 
 useEffect(() => {
  const fetchData = async () => {
      try {
          const response = await fetch(`https://irean.onrender.com/users/${userid}`); // Append userId to the URL
          const data = await response.json();
          console.log("In update profile.......")
        console.log(data.user.profile.useremail); // Do something with the fetched data
        savetoState(data.user.profile);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
},[])


const savetoState = (data) => {
    setAttachmentPath(data.profileattachements.url)
    setProfileImages(data.profileimages.url)
    setUseremail(data.useremail)
    setUserPhone(data.userphone)
    setProfileId(data.id)
    setBio(data.bio)
    console.log(attachmentPath,profileImages,useremail,userPhone,profileId)
}


const handleUpdateContact = () => {
  setIsLoading(true)
  const formData = new FormData();
  formData.append("id", profileId);
  formData.append("userphone", userPhone);
  formData.append("useremail", useremail);
  formData.append("agency", agency);
  formData.append("bio", bio);
  formData.append("social_handles", socials);

  // console.log(Object.fromEntries(formData));
fetch(`https://irean.onrender.com/profiles/${profileId}`, {
method: "PUT",
body: formData
})
.then(response => response.json())
.then(response => {
  console.log(response);
  setIsLoading(false)
  alert("Contact Updated.")

})
.catch(error => {
  setIsLoading(false)
  console.log(error);
  alert("An error occurred while processing the request.");
});
 };

 const handleUpdate = () => {
  setIsLoading(true)
  const formData = new FormData();

  formData.append("profileimages", profileImages);
  formData.append("profileattachements", attachmentPath);

  // console.log(Object.fromEntries(formData));
fetch(`https://irean.onrender.com/profiles/${profileId}`, {
method: "PUT",
body: formData
})
.then(response => response.json())
.then(response => {
  console.log(response);
  setIsLoading(false)
  alert("Media Update Successful")
})
.catch(error => {
  setIsLoading(false)
  console.log(error);
  alert("An error occurred while processing the request.");
});
 };

  
  const handleFileChange = (e) => {
    if (e.target.files) {
    setProfileImages(e.target.files[0]);
    }
  };
  const handleAttachmentChange = (e) => {
    if (e.target.files) {
    setAttachmentPath(e.target.files[0]);
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

         <span>*</span> <span style={{color: 'black'}}>Email</span>
         </Stack>
        <TextField name="email"  style={{
          marginBottom : 10
        }} onChange={e => setUseremail(e.target.value)} value={useremail} />
          <Stack direction="row" alignItems="center"  mb={1}>

<span>*</span> <span style={{color: 'black'}}>Phone Number</span>
</Stack>
        <TextField name="phonenumber"  style={{
          marginBottom : 10
        }} onChange={e => setUserPhone(e.target.value)} value={userPhone} />

<span style={{color: 'black'}}>*Bio</span>

<TextField name="bio" value={bio}  style={{
          marginBottom : 10
        }} onChange={e => setBio(e.target.value)} />

     <LoadingButton color='warning' size="medium" type="submit" variant="contained" onClick={handleUpdateContact}>
        Update Profile Contact
      </LoadingButton>


      <Typography variant='h6' style={{marginTop: 5}}>
        Profile Image*
        </Typography>
        <TextField type="file" name="profileimage" onChange={handleFileChange} style={{
          marginBottom : 10
        }} />
        <Typography variant='h6'>
         Profile Attachment*
        </Typography>
         <TextField type="file" name="profileattachment" onChange={handleAttachmentChange} style={{
          marginBottom : 10
        }}/>
        </Stack>

      <LoadingButton color='warning' size="medium" type="submit" variant="contained" onClick={handleUpdate}>
        Update Profile Media
      </LoadingButton>
      </Container>
    </>
  );
}
