import { Helmet } from 'react-helmet-async';
// @mui
import { Link, Stack, IconButton, InputAdornment,Grid, Button, TextField, Checkbox, Select,Divider, MenuItem, InputLabel,List,ListItem,ListItemText, Container, Typography } from '@mui/material';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { LoadingButton } from '@mui/lab';
import LoadingSpinner from '../utils/loadingSpinner';
// components
import Iconify from '../components/iconify/Iconify';

// ----------------------------------------------------------------------

export default function ViewProfile() {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
//   my states 
  const [attachmentPath,setAttachmentPath] = useState('');
  const [profileImage,setProfileImage] = useState('');
  const [useremail,setUseremail] = useState('');
  const [userPhone,setUserPhone] = useState('')

  // local storage item 
  const username = localStorage.getItem("username")
  const userid = localStorage.getItem("createdId")
  const verification = localStorage.getItem("verification")
  const userrole = localStorage.getItem("userrole")



  useEffect(() => {

  
    const fetchData = () => {
          fetch(`https://irean.onrender.com/users/${userid}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              // Add any additional headers if required
            },
          }).then(response => response.json()) 
          .then(data => {
            console.log(JSON.stringify(data))

            
      if (data && data.user && data.user.profile) {
        // The data.user.profile exists, save it to the state
        savetoState(data.user.profile);
      } else {
        // The data.user.profile does not exist
        // Handle the absence of the profile data accordingly
        alert("Create Profile First")
        navigate('/dashboard/profilepage')
      }

          
          })
      };
  
      fetchData();
  },[])


  const changeUI = () => {
        alert("You need to update your profile.")
        navigate("/dashboard/profilepage")
  }

  const savetoState = (data) => {
      setAttachmentPath(data.profileattachements.url)
      setProfileImage(data.profileimages.url)
      setUseremail(data.useremail)
      setUserPhone(data.userphone)
      console.log(attachmentPath,profileImage,useremail,userPhone)
  }
 

  return (
    <>
      <Helmet>
        <title> View Profile | IREAN </title>
      </Helmet>

      {isLoading ? <LoadingSpinner /> : null}

      <Container>

        
      <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <Button color='warning' variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => navigate('/dashboard/updateprofile')}
          >
            Update Profile
          </Button>

          {userrole === "0" && 
            <Button color='success' variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => navigate('/dashboard/profilePage')}
          >
            Submit New Profile
          </Button>

          }
        
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => navigate('/dashboard/app')}
          >
            Back to Dashboard
          </Button>
          </Stack>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            My IREAN Profile
          </Typography>
        </Stack>
        <Stack>
           <List>
           <ListItem>
  <ListItemText
    primary={
      <>
        <Grid container spacing={2}>
            <Grid>
              <img src={profileImage} alt={username} width="400" height="400" />
            </Grid>
        </Grid>
      </>
    }
  />
</ListItem>
<Divider />
            
           <ListItem>
            <ListItemText
              primary={
                <>
                  <Typography variant="subtitle1" component="span" fontWeight="bold">
                    Name:
                  </Typography>
                
                  <Typography>
                  {username}
                  </Typography>
                </>
              }
            />
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemText
              primary={
                <>
                  <Typography variant="subtitle1" component="span" fontWeight="bold">
                    Email:
                  </Typography>
                
                  <Typography>
                  {useremail}
                  </Typography>
                </>
              }
            />
          </ListItem>
          <Divider />


          <ListItem>
            <ListItemText
              primary={
                <>
                  <Typography variant="subtitle1" component="span" fontWeight="bold">
                    Phone Contact:
                  </Typography>
                
                  <Typography>
                  {userPhone}
                  </Typography>
                </>
              }
            />
          </ListItem>
          <Divider />


          <ListItem>
            <ListItemText
              primary={
                <>
                  <Typography variant="subtitle1" component="span" fontWeight="bold">
                    Profile Attachment Link:
                  </Typography>
                
                  <Typography>
                  {attachmentPath}
                  </Typography>
                </>
              }
            />
          </ListItem>
          <Divider />



           </List>

        </Stack>
      </Container>
    </>
  );
}
