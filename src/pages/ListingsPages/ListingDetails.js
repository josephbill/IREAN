
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Select, MenuItem ,Typography} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components

export default function ListingDetails({ values, handleChange, nextStep, prevStep }) {
  const continueHandler = (e) => {
    e.preventDefault();
    nextStep();
  };

  const backHandler = (e) => {
    e.preventDefault();
    prevStep();
  };

  const handleHeadingChange = (e) => {
    handleChange('heading')(e);
  };

  const handleDescriptionChange = (e) => {
    handleChange('description')(e);
  };

  const handlePriceChange = (e) => {
    handleChange('price')(e);
  };

  const handleBedroomChange = (e) => {
    handleChange('bedrooms')(e);
  };

  const handleWashChange = (e) => {
    handleChange('washrooms')(e);
  };

  const handleOtherChange = (e) => {
    handleChange('others')(e);
  };

  return (
    <>
      <Typography variant="h6">Details</Typography>
      <Stack spacing={3}>
        <TextField label="Heading" onChange={handleHeadingChange} />
        <TextField label="Brief Description" onChange={handleDescriptionChange} />
        <TextField label="Listing Price" onChange={handlePriceChange} />

        <Typography variant='h6'>Presets (If Applicable)</Typography>

        <Stack direction="row" alignItems="end" justifyContent="space-evenly" mb={2}>
        <TextField label="Number of bedrooms" onChange={handleBedroomChange} />
        <TextField label="Number of Washrooms" onChange={handleWashChange} />

        </Stack>

        <Stack>
        <TextField label="Other Descriptions i.e. square feet , playground , garage etc." onChange={handleOtherChange} />
        </Stack>

        <LoadingButton fullWidth size="medium" type="submit" variant="contained" onClick={continueHandler}>
          Listing Media
        </LoadingButton>

        <LoadingButton fullWidth size="medium" type="submit" variant="contained" onClick={backHandler}>
          Back
        </LoadingButton>
      </Stack>
    </>
  );
}
