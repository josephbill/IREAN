import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
// @mui
import { Container, Stack, Typography, Button,  } from '@mui/material';
import Iconify from '../components/iconify';

// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title> Dashboard:Listings | IREAN </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Listings 
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            {/* <ProductSort /> */}
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => navigate('/dashboard/listings')}
          >
            Add Listing
          </Button>
          </Stack>
        </Stack>

        <ProductList products={PRODUCTS} />
        <ProductCartWidget />
      </Container>
    </>
  );
}
