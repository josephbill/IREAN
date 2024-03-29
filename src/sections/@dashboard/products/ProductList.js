import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
// @mui
import { Grid,Typography } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------



export default function ProductList({other}) {
    // local storage item 
    const username = localStorage.getItem("username")
    const userid = localStorage.getItem("userid")
    const verification = localStorage.getItem("verification")

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);


  
    useEffect(() => {
   
      const getListings = async () => {
          try {
            const response = await fetch('https://irean.onrender.com/listings', {
              method: 'GET',
            });
            const data = await response.json();
            // populateListingsArrays(data.lisitings);
           populateListingsArrays(data.listings)
      
          } catch (error) {
            console.log('API error:', error);
          }
        };
        getListings();
  
  }, [])
  
  const populateListingsArrays = (data) => {
    const userrole = localStorage.getItem("userrole");
    const userid = localStorage.getItem("userid");
    if (userrole === "2") {
      const x = parseInt(userid, 10);
      const agentArray = data.filter(obj => obj.listing_attachments.includes(x));   
      console.log(JSON.stringify(agentArray));
      setProducts(agentArray);
    } else {
      setProducts(data);
    }
  }


  
    return (
      <Grid container spacing={3}>
      {products.length === 0 ? 
      (
        <Grid item xs={12}>
          <Typography>No Listings found</Typography>
        </Grid>
      )
      :
      (
        products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={3}>
            <ShopProductCard product={product} />
          </Grid>
        ))
      ) }
    </Grid>
    );
}
