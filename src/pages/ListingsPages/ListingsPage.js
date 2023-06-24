import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
// @mui
import { Container, Stack, Typography, Button,  } from '@mui/material';
import Iconify from '../../components/iconify';

// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../../sections/@dashboard/products';
// mock
import PRODUCTS from '../../_mock/products';


// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [listings,setListings] = useState([]);

  // console.log("----------------------")
  // console.log(localStorage.getItem('userid'))


  
  let listingArray  = []
  useEffect(() => {
 
    const getListings = async () => {
        try {
          const response = await fetch('https://irean.onrender.com/listings', {
            method: 'GET',
          });
          const data = await response.json();
          populateListingsArrays(data);
    
        } catch (error) {
          console.log('API error:', error);
        }
      };
      getListings();

}, [])

  const populateListingsArrays = (data) => {
    const userid = localStorage.getItem("userid")

    const userrole = localStorage.getItem("userrole")



    if(userrole === 2){
      let agentArray = data
      agentArray = agentArray.filter(obj => obj.agent_id === userid);
      // alert(agentArray)
      setListings(agentArray)
    } else {
      listingArray = data
      console.log(listingArray)
      setListings(listingArray)
     
    }
  }

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const navigate = useNavigate();

  const verificationStatus = localStorage.getItem("verification")


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
            {/* <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            /> */}
            {/* <ProductSort /> */}

            {verificationStatus === "1" && 
            
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => navigate('/dashboard/listings')}
          >
            Add Listing
          </Button>


            }
          
          </Stack>
        </Stack>
        {listings.length > 0 ? 
                <ProductList products={listings} />
          :
          <Typography variant='h6'>No Listing Found</Typography>
      }
        {/* <ProductCartWidget /> */}
      </Container>
    </>
  );
}
