import { Helmet } from 'react-helmet-async';
// @mui
import { Link, Stack, IconButton, InputAdornment,Grid, Button, TextField, Checkbox, Select,Divider, MenuItem, InputLabel,List,ListItem,ListItemText, Container, Typography } from '@mui/material';
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
                   {products.streetname} : {products.streetnumber}
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
          <Stack style={{
            marginTop: 20
          }} direction="row" alignItems="center" justifyContent="space-between">

 <ListItem>
  <ListItemText
    primary={
      <>
        <Grid container spacing={2}>
            <Grid>
              <img src={products.photos[0].url} alt={products.heading} width="400" height="400" />
            </Grid>
        </Grid>
      </>
    }
  />
</ListItem>

<ListItem>
  <ListItemText
    primary={
      <>
        <Grid container spacing={2}>
            <Grid>
              <img src={products.plans[0].url} alt={products.heading} width="400" height="400" />
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
        <Grid container spacing={2}>
            <Grid>
            <video width="100%" controls>
                <source src={products.videos[0].url}  />
                {/* Add a track element for captions */}
                <track kind="captions" srcLang="en" label="English" />
              </video>
            </Grid>
        </Grid>
      </>
    }
  />
</ListItem>
<Divider />





 </Stack>






                </List>
        </Stack>
    
      </Container>
    </>
  );
}
