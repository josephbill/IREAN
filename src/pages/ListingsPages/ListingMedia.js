// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Typography, InputLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export default function ListingMedia({values,handleChange,nextStep,prevStep}){
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
 <Typography variant='h4'>
         Media
        </Typography>
          
                  <Stack spacing={3}>
                  <InputLabel id="user-type-label">Photos</InputLabel>

        <TextField type="file" onChange={handleChange('photos')}   inputProps={{
    multiple: true
  }} style={{
          marginBottom : 10
        }}/>
                           <InputLabel id="user-type-label">Plans</InputLabel>

        <TextField type="file" onChange={handleChange('plans')}   inputProps={{
    multiple: true
  }} style={{
          marginBottom : 10
        }}/>
                         <InputLabel id="user-type-label">Video</InputLabel>

        <TextField type="file" onChange={handleChange('videos')}   inputProps={{
    multiple: true
  }} style={{
          marginBottom : 10
        }}/>

        <LoadingButton fullWidth size="medium" type="submit" variant="contained" onClick={continueHandler}>
        Submit Listing
      </LoadingButton>

      <LoadingButton fullWidth size="medium" type="submit" variant="contained" onClick={backHandler}>
        Back
      </LoadingButton>

                  </Stack>
          </>  
        )
}