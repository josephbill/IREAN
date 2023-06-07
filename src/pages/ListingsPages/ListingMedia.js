// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Typography, InputLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export default function ListingMedia({ values, handleChangeMedia, nextStep, prevStep }) {
  const continueHandler = (e) => {
    e.preventDefault();
    nextStep();
  };

  const backHandler = (e) => {
    e.preventDefault();
    prevStep();
  };



  return (
    <>
      <Typography variant="h4">Media</Typography>
      <Stack spacing={3}>
        <InputLabel id="user-type-label">Photos</InputLabel>
        <TextField type="file" name="photos[]" onChange={handleChangeMedia('photos')} inputProps={{ multiple: true }} style={{ marginBottom: 10 }} />
        <InputLabel id="user-type-label">Plans</InputLabel>
        <TextField type="file" name="plans[]" onChange={handleChangeMedia('plans')} inputProps={{ multiple: true }} style={{ marginBottom: 10 }} />
        <InputLabel id="user-type-label">Video</InputLabel>
        <TextField type="file" name="videos[]"  onChange={handleChangeMedia('videos')}
 inputProps={{ multiple: true }} style={{ marginBottom: 10 }} />

        <LoadingButton fullWidth size="medium" type="submit" variant="contained" onClick={continueHandler}>
          Proceed
        </LoadingButton>

        <LoadingButton fullWidth size="medium" type="submit" variant="contained" onClick={backHandler}>
          Back
        </LoadingButton>
      </Stack>
    </>
  );
}
