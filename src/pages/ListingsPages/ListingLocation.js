
// @mui
import { Link, Stack , InputAdornment, TextField, Checkbox, Select, MenuItem ,Typography, InputLabel} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
// components

export default function ListingLocation({ values, handleChange, nextStep, prevStep }) {
  const [proptype, setPropType] = useState('');
  const [listingtype, setListingType] = useState('');

  const continueHandler = (e) => {
    e.preventDefault();
    nextStep();
  };

  const backHandler = (e) => {
    e.preventDefault();
    prevStep();
  };

  const handleLocationChange = (e) => {
    handleChange('location')(e);
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
      <Typography variant="h4">Location</Typography>
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
        <TextField label="Location" onChange={handleLocationChange} />
        <TextField label="Street Name" onChange={handleStreetNameChange} />
        <TextField label="Street Number" onChange={handleStreetNumberChange} />

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
