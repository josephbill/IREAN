
// @mui

import { Link, Stack , InputAdornment, TextField, Checkbox, Select, MenuItem ,Typography, InputLabel} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useState} from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Autocomplete from '../../utils/Autocomplete';

// components

export default function ListingLocation({ values, handleChange, nextStep, prevStep }) {

  const [proptype, setPropType] = useState('');
  const [listingtype, setListingType] = useState('');

  const [location, setLocation] = useState({ label: 'Nairobi' });
  const [streetName,setStreetName] = useState(null)
  const [streetNumber,setStreetNumber] = useState(null)



  const continueHandler = (e) => {
    e.preventDefault();
    nextStep();
  };

  const backHandler = (e) => {
    e.preventDefault();
    prevStep();
  };

  const handleLocationChange = (value) => {
    // Call handleChange with the correct location value
    const locationValue = value ? value.label : ''; // Extract the location label from the selected value
    handleChange('location')(locationValue);
  };

  const handleStreetNameChange = (e) => {
    handleChange('streetname')(e);
  };

  const handleStreetNumberChange = (e) => {
    handleChange('streetnumber')(e);
  };

  const handleListingTypeChange = (e) => {
    setListingType(e.target.value);
    handleChange('listingtype')(e);
  };

  const handlePropertyTypeChange = (e) => {
    setPropType(e.target.value);
    handleChange('proptype')(e);
  };

  

  return (
    <>
      <Typography variant="h6">Location</Typography>
      <Stack spacing={3}>
        <InputLabel>Listing Type</InputLabel>
        <Select
          labelId="listing-type-label"
          id="listing-type"
          value={listingtype}
          onChange={handleListingTypeChange}
          label="Listing Type"
        >
          <MenuItem value="For Sale">For Sale</MenuItem>
          <MenuItem value="For Rent">For Rent</MenuItem>
        </Select>
        <InputLabel>Property Type</InputLabel>
        <Select
          labelId="property-type-label"
          id="property-type"
          value={proptype}
          onChange={handlePropertyTypeChange}
          label="Property Type"
        >
         <MenuItem value=" ">
  <Typography variant="body1" style={{ fontWeight: 'bold' }}>
    Select a House Listing Type
  </Typography>
</MenuItem>
          <MenuItem value="Apartments">Apartments</MenuItem>
          <MenuItem value="Masionnaites">Masionnaites</MenuItem>
          <MenuItem value="Bungalows">Bungalows</MenuItem>
          <MenuItem value="Office Blocks">Office Blocks</MenuItem>
          <MenuItem value=" ">
  <Typography variant="body1" style={{ fontWeight: 'bold' }}>
    Select a Land Listing Type
  </Typography>
</MenuItem>
          <MenuItem value="Commercial">Commercial Land</MenuItem>
          <MenuItem value="Residential">Residential Land</MenuItem>
          <MenuItem value="Agricultural">Agricultural Land</MenuItem>
        </Select>
        {/* <TextField label="Location" onChange={handleLocationChange} /> */}
        {/* <Typography>Location : (Include Street Name and Number)</Typography> */}
        <GooglePlacesAutocomplete selectProps={{
           onChange: handleLocationChange,
           isClearable: true, 
           placeholder: 'Enter Location : (Include Street Name and Street Number)'
        }} apiKey='AIzaSyCcaeipde61-0queqwfcR-KZEKOMu2X1pE'/>
      

   



        <LoadingButton fullWidth size="medium" type="submit" variant="contained" onClick={continueHandler}>
          Listing Details
        </LoadingButton>

        <LoadingButton fullWidth size="medium" type="submit" variant="contained" onClick={backHandler}>
          Back
        </LoadingButton>
      </Stack>
    </>
  );
}
