import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// @mui
import { Box, Card, Link, Typography, Stack,Button ,IconButton, Image} from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { LoadingButton } from '@mui/lab';

import { fCurrency } from '../../../utils/formatNumber';
import Iconify from '../../../components/iconify/Iconify';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------



export default function AgentsCard({ product }) {
  const {  profileAttachment, username,profile, userphone, useremail, verification ,profileimages,id} = product;
  console.log(product)
  const navigate = useNavigate()
  console.log("SHOP PRODUCT")
  console.log(product)
  const products = product

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
         <StyledProductImg alt={username} src={profile.profileimages.url} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {username}
          </Typography>
        </Link>

        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {profile.userphone}
          </Typography>
        </Link>


        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
          {profile.useremail}
          </Typography>
        </Link>

        <Link color="inherit" underline="hover">
            {verification === "1" && (
   <p style={{color: 'green' , fontWeight: 'bold'}}>
            Verified
          </p>
            )}
             {verification === "0" || null && (
     <p style={{color: 'red' , fontWeight: 'bold'}}>
     Not Verified
   </p>
            )}
        </Link>

      
      </Stack>
    </Card>
  );
}
