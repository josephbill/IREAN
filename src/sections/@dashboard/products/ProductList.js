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
      const fetchData = async () => {
        try {
            const response = await fetch(`https://irean.onrender.com/listings`); // Append userId to the URL
            const data = await response.json();
          console.log(data); // Do something with the fetched data
          savetoState(data)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    },[])

    const savetoState = (data) => {
      console.log(data);
      if(data.status === 500 ){
        const temp = []
        setProducts(temp); // Update products state with fetched data
      } else {
      setProducts(data.listings); // Update products state with fetched data
      }
    };
  
    return (
      <Grid container spacing={3}>
      {products.length > 0 ? (
        products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={3}>
            <ShopProductCard product={product} />
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography>No Listings found</Typography>
        </Grid>
      )}
    </Grid>
    );
}
