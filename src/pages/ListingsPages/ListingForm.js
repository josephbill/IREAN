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
        videos: [],
    })

        const nextStep = () => {
        setStep(step + 1);
        };
        
        const prevStep = () => {
        setStep(step - 1);
        };

        const handleChange = (input) => (e) => {
          if (input === 'photos' || input === 'plans' || input === 'videos') {
            const files = Array.from(e.target.files);
        
            setListingDetails((prevState) => {
              if (Array.isArray(prevState[input])) {
                return {
                  ...prevState,
                  [input]: [...prevState[input], ...files],
                };
              }
        
              return {
                ...prevState,
                [input]: files,
              };
            });
          } else {
            setListingDetails({ ...listingDetails, [input]: e.target.value });
          }
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

        function submitDetails(listingDetails) {
          const userID = localStorage.getItem("userid");
          const formData = new FormData();
        
          formData.append("user_id", userID);
          formData.append("listingtype", listingDetails.listingtype);
          formData.append("proptype", listingDetails.proptype);
          formData.append("location", listingDetails.location);
          formData.append("streetname", listingDetails.streetname);
          formData.append("streetnumber", listingDetails.streetnumber);
          formData.append("heading", listingDetails.heading);
          formData.append("description", listingDetails.description);
          formData.append("price", listingDetails.price);
        
          listingDetails.videos.forEach((video, index) => {
            formData.append(`videos[${index}]`, video);
          });
        
          listingDetails.photos.forEach((photo, index) => {
            formData.append(`photos[${index}]`, photo);
          });
        
          listingDetails.plans.forEach((plan, index) => {
            formData.append(`plans[${index}]`, plan);
          });
        
          console.log(formData);
        
          fetch("http://localhost:3000/listings", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Server response:");
              console.log(data);
            })
            .catch((error) => {
              console.error("Error submitting listing:", error);
            });
        }
}
