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

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const {  description, heading, id, listingtype, location ,price,verifiedstatus,leadstatus} = product;
  const navigate = useNavigate()
  console.log("SHOP PRODUCT")
  console.log(product)
  const products = product

  const handleSeeMore = () => {
    navigate(`/product/${id}`, { state: { products } }); // Navigate to new route with product details
  };

  const goToEdits = () => {
    navigate(`/modifyproduct/${id}`, { state: { products } }); // Navigate to new route with product details
  };
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {listingtype && (
          <Label
            variant="filled"
            color={(listingtype === 'For Sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {listingtype}
          </Label>
          
        )}
        
        <StyledProductImg alt={heading} src={product.photos[0].url} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {heading}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {price && fCurrency(price)}
            </Typography>
            &nbsp;
            {fCurrency(price)}
          </Typography>

          {/* add icon stack for bed and baths here */}
         
        </Stack>
        <Stack>
        <Button variant="contained" color='orange' startIcon={<Iconify icon="fa-solid:star" />}
            onClick={handleSeeMore}
          >
            View Listing
          </Button>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
        {verifiedstatus === null && 
              <IconButton
              onClick={goToEdits}
              style={{
               width: 25,
               height: 25,
              }}
              >
         <StyledProductImg src="../../../../assets/images/avatars/notverified.png" alt="notverified" />
            </IconButton>
        }
       {verifiedstatus === "0" && 
           <IconButton
           onClick={goToEdits}
           style={{
            width: 30,
            height: 30,
           }}
           >
      <StyledProductImg src="../../../../assets/images/avatars/notverified.png" alt="notverified" />
         </IconButton>
        }

{verifiedstatus === "1" && 
           <IconButton
           onClick={goToEdits}
           style={{
            width: 30,
            height: 30,
           }}
           >
      <StyledProductImg src="../../../../assets/images/avatars/verified.png" alt="verified" />
         </IconButton>
        }



        {leadstatus === "Hot" &&
             <IconButton
             onClick={goToEdits}  
             >
              <span style={{ fontSize: 20, color: 'red' }}>Hot Listing</span>
           </IconButton>
        }
        {leadstatus === "Warm" && 
           <IconButton
           onClick={goToEdits}
           >
            <span style={{ fontSize: 20, color: '#7E57C2' }}>Warm Listing</span>
         </IconButton>
        }
        {leadstatus === "Cold" && 
           <IconButton
           onClick={goToEdits}
           >
            <span style={{ fontSize: 20, color: '#42A5F5' }}>Cold Listing</span>
         </IconButton>
        }
      

        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
        {product.listing_attachments.length > 0 && 
           <IconButton
           onClick={goToEdits}
           >
      <StyledProductImg src="../../../../assets/images/avatars/realagents.png" alt="verified" />
         </IconButton>
        }
        </Stack>
      </Stack>
    </Card>
  );
}
