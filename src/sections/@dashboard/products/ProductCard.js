import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// @mui
import { Box, Card, Link, Typography, Stack,Button } from '@mui/material';
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
  const {  description, heading, id, listingtype, location ,price} = product;
  const navigate = useNavigate()
  console.log("SHOP PRODUCT")
  console.log(product)

  const handleSeeMore = () => {
    navigate(`/product/${id}`, { state: { product } }); // Navigate to new route with product details
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
      </Stack>
    </Card>
  );
}
