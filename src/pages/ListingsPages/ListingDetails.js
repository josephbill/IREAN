
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Select, MenuItem ,Typography} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components

export default function ListingDetails({values,handleChange,nextStep,prevStep}){
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
         Details
          </Typography>
                  <Stack spacing={3}>
        <TextField label="Heading" onChange={handleChange('heading')} />
        <TextField label="Brief Desctription" onChange={handleChange('description')} />
        <TextField label="Listing Price" onChange={handleChange('price')} />

        <LoadingButton fullWidth size="medium" type="submit" variant="contained" onClick={continueHandler}>
        Listing Media
      </LoadingButton>

      <LoadingButton fullWidth size="medium" type="submit" variant="contained" onClick={backHandler}>
        Back
      </LoadingButton>

                  </Stack>
          </>  
        )
}