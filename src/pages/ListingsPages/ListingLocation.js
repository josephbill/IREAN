import React from 'react';
import GooglePlacesAutocomplete from 'react-google-autocomplete';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox , Select , MenuItem, Typography, InputLabel} from '@mui/material';
import { LoadingButton } from '@mui/lab';


// components

export default function ListingLocation({values,handleChange,nextStep}){
    const continueHandler = (e) => {
        e.preventDefault();
        nextStep();
        };

        return (
          <>
           <Typography variant='h4'>
         Location
        </Typography>
                  <Stack spacing={3}>
                  <InputLabel id="user-type-label">Listing Type</InputLabel>
        <Select
          labelId="user-type-label"
          id="user-type"
          value={values.listingtype}
          onChange={handleChange('listingtype')}
          label="Listing Type"
        >
          <MenuItem value={'For Sale'}>For Sale</MenuItem>
          <MenuItem value={'For Rent'}>For Rent</MenuItem>
        </Select>
        <InputLabel id="user-type-label">Property Type</InputLabel>

        <Select
          labelId="user-type-label"
          id="user-type"
          value={values.proptype}
          onChange={handleChange('proptype')}
          label="Property Type"
        >
          <MenuItem value={'Villas'}>Villas</MenuItem>
          <MenuItem value={'Office Blocks'}>Office Blocks</MenuItem>
        </Select>

        <TextField label="Location" onChange={handleChange('location')}/>

        {/* <GooglePlacesAutocomplete style={{
          width : 100,
          height: 100
        }} apiKey='AIzaSyDAh0JBsZYaoONsW6f5eopD-SPsgxFYDjQ'/> */}
      
      
        <TextField label="Street Name" onChange={handleChange('streetname')} />
        <TextField label="Street Number" onChange={handleChange('streetnumber')} />

        <LoadingButton fullWidth size="medium" type="submit" variant="contained" onClick={continueHandler}>
        Listing Details
      </LoadingButton>

                  </Stack>
          </>  
        )
}