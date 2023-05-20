import React, { useState } from 'react';
import { Grid, Container, Typography } from '@mui/material';

import ListingDetails from "./ListingDetails";
import ListingLocation from "./ListingLocation";
import ListingMedia from "./ListingMedia";


export default function ListingForm(){
    const [step, setStep] = useState(1);
    const [listingDetails,setListingDetails] = useState({
        listingtype: "",
        proptype: "",
        location: "",
        streetname: "",
        streetnumber: "",
        heading: "",
        description: "",
        price: "",
        photos : [],
        plans : [],
        videos: '',
    })

        const nextStep = () => {
        setStep(step + 1);
        };
        
        const prevStep = () => {
        setStep(step - 1);
        };

        const handleChange = (input) => (e) => {
            setListingDetails({ ...listingDetails, [input]: e.target.value });
            };

        switch(step){
            case 1: 
            return(
                 
      <Container maxWidth="xl">
                <ListingLocation
                 nextStep={nextStep}
                 handleChange={handleChange}
                 values={listingDetails}
                />
                 </Container>
           
            );
            case 2: 
            return(
              <Container maxWidth="xl">

                <ListingDetails
                nextStep={nextStep}
                prevStep={prevStep}
                handleChange={handleChange}
                values={listingDetails}
              />
              </Container>
            );
            case 3: 
            return(
              <Container maxWidth="xl">

                <ListingMedia
                nextStep={nextStep}
                prevStep={prevStep}
                handleChange={handleChange}
                values={listingDetails}
              />
              </Container>
            );
            case 4: 
              submitDetails(listingDetails)
            break;
            default:
                alert("Forms not loading")
        }

        function submitDetails(listingDetails){
            console.log(":;;;;;;;;;;;;;;;;")
            console.log(listingDetails)
        }

}
