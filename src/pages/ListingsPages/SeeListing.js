import { Helmet } from 'react-helmet-async';
// @mui
import { Link, Stack, Box, IconButton,ListItemAvatar, InputAdornment,Grid, Button,ImageList, TextField, Checkbox, Select,Divider, MenuItem, InputLabel,List,ListItem,ListItemText, Container, Typography } from '@mui/material';
import { useState,useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
// @mui
import { LoadingButton } from '@mui/lab';
import { fCurrency } from '../../utils/formatNumber';

// components
import Iconify from '../../components/iconify/Iconify';

// ----------------------------------------------------------------------

export default function SeeListing() {

    const navigate = useNavigate();
    const location = useLocation();


    const products = location.state?.products;

// Now you can access the values in the product object
console.log(products);
 
  // local storage item 
  const username = localStorage.getItem("username")
  const userid = localStorage.getItem("userid")
  const userrole = localStorage.getItem("userrole")
  const verification = localStorage.getItem("verification")


  const date = products.updated_at
  const newDate = new Date(date)
  const formatDate = newDate.toISOString().split('T')[0];


  const RenderOutVideos = () => {
    const array = products.videos;
    return (
      <>
        {array.map((video, index) => (     
          <Grid container spacing={1}>
              <Grid>
              <video  style={{width: 550, height: 200, borderRadius: 20}} controls>
                  <source src={video.url}  />
                  {/* Add a track element for captions */}
                  <track kind="captions" srcLang="en" label="English" />
                </video>
              </Grid>
          </Grid>
       
        ))}
      </>
    );
  };


  const RenderOutPlans = () => {
    const array = products.plans;
  
    const handleImageClick = (url) => {
      window.open(url, '_blank');
    };
  
    return (
      <Box display="flex" flexWrap="wrap" justifyContent="start">
        {array.map((image, index) => (
          <Box key={index} m={1} style={{ width: '150px' }}>
            <div style={{ position: 'relative', paddingTop: '100%' }}>
              <IconButton
                onClick={() => handleImageClick(image.url)}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  padding: 0,
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: '20px',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    src={image.url}
                    alt={products.heading}
                  />
                </div>
             
              </IconButton>
            </div>
          </Box>
        ))}
      </Box>
    );
  };


  const RenderOutImages = () => {
    const array = products.photos;
  
    const handleImageClick = (url) => {
      window.open(url, '_blank');
    };
  
    return (
      <Box display="flex" flexWrap="wrap" justifyContent="start">
        {array.map((image, index) => (
          <Box key={index} m={1} style={{ width: '150px' }}>
            <div style={{ position: 'relative', paddingTop: '100%' }}>
              <IconButton
                onClick={() => handleImageClick(image.url)}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  padding: 0,
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: 10,
                    borderColor: 'orange',
                    borderWidth: 10,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    src={image.url}
                    alt={products.heading}
                  />
                </div>
             
              </IconButton>
            </div>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <>
      <Helmet>
        <title> Listing | IREAN </title>
      </Helmet>


      <Container>

        
      <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => navigate('/dashboard/products')}
          >
            Back to Listings
          </Button>

          {userrole === "0"  &&
            <Button variant="contained" color='orange' startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => navigate(`/modifyproduct/${products.id}`,{state: {products}})}
          >
            Edit Listing
          </Button>
          }

        
        

          </Stack>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {products.heading}
          </Typography>
        </Stack>

        <Stack>
            <List>
 <Stack style={{
            margin: 15, marginBottom: 50
          }} justifyContent={"space-evenly"} direction="row" alignItems="center">
 <RenderOutImages/>
 <RenderOutPlans/>

 </Stack>

 <Stack style={{
            margin: 5
          }} justifyContent={"space-evenly"} direction="row" alignItems="center">
 <RenderOutVideos/>

 </Stack>

                </List>
        </Stack>


        <Stack style={{
            margin: 5
          }} justifyContent={"space-evenly"} direction="row" alignItems="center">


<Stack>
<ListItem>
            <ListItemText
              primary={
                <>
                  <Typography variant="subtitle1" component="span" fontWeight="bold">
                    Listing Type:
                  </Typography>
                
                  <Typography>
                   {products.listingtype}
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
                    Propery Type:
                  </Typography>
                
                  <Typography>
                   {products.proptype}
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
                    Propery Location:
                  </Typography>
                
                  <Typography>
                   {products.location}
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
                    Propery Street Name and Number:
                  </Typography>
                
                  <Typography>
                   {products.streetname}
                  </Typography>
                </>
              }
            />
          </ListItem>
          <Divider />


</Stack>

<Stack>


          <ListItem>
            <ListItemText
              primary={
                <>
                  <Typography variant="subtitle1" component="span" fontWeight="bold">
                    Other:
                  </Typography>
                
                  <Typography>
                   {products.others}
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
                    Description:
                  </Typography>
                
                  <Typography>
                   {products.description}
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
                    Bedrooms:
                  </Typography>
                
                  <Typography>
                  {products.bedrooms}
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
                    Washrooms:
                  </Typography>
                
                  <Typography>
                  {products.washrooms}
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
                    Price:
                  </Typography>
                
                  <Typography>
                  {fCurrency(products.price)}
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
                    Uploaded By:
                  </Typography>
                
                  <Typography>
                  {products.user.username} : Date :  {formatDate}
                  </Typography>
                </>
              }
            />
          </ListItem>
          <Divider /> 

</Stack>

          

            </Stack>

       
    
      </Container>
    </>
  );
}
