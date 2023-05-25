// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Typography, InputLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export default function ListingMedia({ values, handleChange, nextStep, prevStep }) {
  const continueHandler = (e) => {
    e.preventDefault();
    nextStep();
  };

  const backHandler = (e) => {
    e.preventDefault();
    prevStep();
  };

  const handlePhotosChange = (e) => {
    handleChange('photos')(e);
  };

  const handlePlansChange = (e) => {
    handleChange('plans')(e);
  };

  const handleVideosChange = (e) => {
    handleChange('videos')(e);
  };

  return (
    <>
      <Typography variant="h4">Media</Typography>
      <Stack spacing={3}>
        <InputLabel id="user-type-label">Photos</InputLabel>
        <TextField type="file" onChange={handlePhotosChange} inputProps={{ multiple: true }} style={{ marginBottom: 10 }} />
        <InputLabel id="user-type-label">Plans</InputLabel>
        <TextField type="file" onChange={handlePlansChange} inputProps={{ multiple: true }} style={{ marginBottom: 10 }} />
        <InputLabel id="user-type-label">Video</InputLabel>
        <TextField type="file" onChange={handleVideosChange} inputProps={{ multiple: true }} style={{ marginBottom: 10 }} />

        <LoadingButton fullWidth size="medium" type="submit" variant="contained" onClick={continueHandler}>
          Submit Listing
        </LoadingButton>

        <LoadingButton fullWidth size="medium" type="submit" variant="contained" onClick={backHandler}>
          Back
        </LoadingButton>
      </Stack>
    </>
  );
}
