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

  const tempListing = [
    {
			"id": 0,
			"user_id": 1,
			"listingtype": "For Sale",
			"proptype": "Listings Not Posted Yet",
			"location": "Nairobi",
			"streetname": "Moi Avenue 1A",
			"streetnumber": "123A",
			"heading": "Listings Not Posted Yet",
			"description": "IREAN System",
			"price": "00",
			"created_at": "2023-06-25T21:15:52.365Z",
			"updated_at": "2023-06-25T21:15:52.365Z",
			"photos": [
				{
					"url": "http://res.cloudinary.com/dqlqmfjkt/image/upload/v1687727756/vijmhurznjmuu96xf7uq.png"
				},
				{
					"url": "http://res.cloudinary.com/dqlqmfjkt/image/upload/v1687727757/wf4cwdorvmef7dqbhxjr.jpg"
				}
			],
			"plans": [
				{
					"url": "http://res.cloudinary.com/dqlqmfjkt/image/upload/v1687727755/dhsicyugvhqwjyfgmyib.jpg"
				},
				{
					"url": "http://res.cloudinary.com/dqlqmfjkt/image/upload/v1687727755/qxxfix8iegxkpmfb7nzi.jpg"
				}
			],
			"videos": [
				{
					"url": "http://res.cloudinary.com/dqlqmfjkt/video/upload/v1687727753/gkm0wnorkvnxbxeknhqo.mp4"
				}
			],
			"agent_id": null,
			"leadstatus": null,
			"salestatus": null,
			"verifiedstatus": null,
			"agency": null,
			"agent": null,
			"bedrooms": null,
			"washrooms": null,
			"others": null,
			"prospects": null,
			"user": {
				"id": 1,
				"username": "Joseph Admin",
				"userrole": "0",
				"password_digest": "$2a$12$O5b5QpOi1glhzUAC1CrS1OfVQXcHp0CgUtCVC1ojcJON82Bkbj3B6",
				"verification": "1",
				"created_at": "2023-06-25T20:33:41.366Z",
				"updated_at": "2023-06-25T20:35:36.752Z"
			}
		}
  ]


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

    const verification = localStorage.getItem("verification")



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


        {listings.length === 0 ? (
          <Typography variant="body1">No listings available</Typography>
        ) : (
          <ProductList products={listings} />
        )}

        {/* <ProductCartWidget /> */}
      </Container>
    </>
  );
}
