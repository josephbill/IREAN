
// @mui
import { Helmet } from 'react-helmet-async';
import { useState,useRef } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { Link, Stack, IconButton, InputAdornment, Container,TextField, Checkbox, Select,Button, MenuItem ,Typography} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../components/iconify/Iconify';
import LoadingSpinner from '../../utils/loadingSpinner';
// components

export default function AdminEditListing() {

    const navigate = useNavigate()
    const location = useLocation();

    const [verification, setVerification] = useState('');
    const [leadStatus, setLeadStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const products = location.state?.products;

    // console.log(products)

  const handleVerificationChange = (e) => {
    setVerification(e.target.value);
};

const handleleadChange = (e) => {
    setLeadStatus(e.target.value);

};


const updateListing = async (leadStatus,verification,updateproducts) => {
  setIsLoading(true);

  const updateData = {
    leadstatus: leadStatus,
    verifiedstatus: verification,
    agent_id: null
  };

  try {
    const response = await fetch(`http://127.0.0.1:3000/listings/${updateproducts.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (response.ok) {
      // Listing successfully updated
      const updatedListing = await response.json();
      console.log(updatedListing);
      alert("Listing Updated.")
      navigate('/dashboard/products')

    } else {
      // Error occurred during the update
      const errorData = await response.json();
      console.log(errorData);
      alert("Error occurred on update.")
      navigate('/dashboard/products')
    }
  } catch (error) {
    console.log(error);
  }

  setIsLoading(false);
};




  return (
    <>
       <Helmet>
        <title> Edit Listing | IREAN </title>
      </Helmet>

      {isLoading ? <LoadingSpinner /> : null}

      <Container>
      <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
      <Typography variant="h6" style={{
        marginRight: 20
      }}>Edit Listings</Typography>

          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                     <Button variant="contained" color='orange' startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() =>{
                navigate(`/dashboard/products`)
            }}
          >
            Back To Dashboard.
          </Button>
          </Stack>
          </Stack>
       
          <Stack spacing={3}>
            <Typography variant='h6'>Verification Status</Typography>
          <Select
          labelId="listing-type-label"
          id="listing-type"
          label="Verification Status"
          onChange={handleVerificationChange}
          value={verification}
          >
          <MenuItem value="1">True</MenuItem>
          <MenuItem value="0">False</MenuItem>
        </Select>

        <Typography variant='h6'>Lead Status</Typography>
          <Select
          labelId="listing-type-label"
          id="listing-type"
          label="Lead Status"
          onChange={handleleadChange}
          value={leadStatus}
          >
          <MenuItem value="Hot">Hot</MenuItem>
          <MenuItem value="Warm">Warm</MenuItem>
          <MenuItem value="Cold">Cold</MenuItem>
        </Select>

        <LoadingButton fullWidth size="medium" type="submit" variant="contained" onClick={() => {
            // function to update listing based off its id 

            updateListing(leadStatus,verification,products)

        }}>
          Update Listing
        </LoadingButton>
      </Stack>
      </Container>
    </>
  );
}
