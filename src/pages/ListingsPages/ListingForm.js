import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Container, Typography, List, ListItem, ListItemText , Divider, Alert} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Label } from '@material-ui/icons';

import ListingDetails from "./ListingDetails";
import ListingLocation from "./ListingLocation";
import ListingMedia from "./ListingMedia";
import LoadingSpinner from '../../utils/loadingSpinner';

export default function ListingForm() {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [listingDetails, setListingDetails] = useState({
        listingtype: "",
        proptype: "",
        location: "",
        streetname: "",
        streetnumber: "",
        heading: "",
        description: "",
        price: "",
        bedrooms: "0",
        washrooms: "0",
        others: "IREAN Listing",
        photos: [],
        plans: [],
        videos: [],
    });

   

    const [isLoading, setIsLoading] = useState(false);

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleChange = (input) => (e) => {
      const value = e.target ? e.target.value : e; // Check if e.target exists, otherwise use e directly
      setListingDetails({ ...listingDetails, [input]: value });
    };

    const handleChangeMedia = (input) => (e) => {
        if (input === 'photos' || input === 'plans' || input === 'videos') {
            const files = Array.from(e.target.files);

            setListingDetails((prevState) => {
                if (Array.isArray(prevState[input])) {
                    return {
                        ...prevState,
                        [input]: [...prevState[input], ...files],
                    };
                }
                console.log("in handle change media");
                console.log(listingDetails);

                return {
                    ...prevState,
                    [input]: files,
                };
            });
        } else {
            alert("Media cannot be empty!");
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        await submitDetails(listingDetails);
        setIsLoading(false);
    };

    const submitDetails = async (listingsDetails) => {
        const formData = new FormData();
        formData.append('user_id', localStorage.getItem("userid"));
        formData.append('listingtype', listingsDetails.listingtype);
        formData.append('proptype', listingsDetails.proptype);
        formData.append('location', listingsDetails.location);
        formData.append('streetname', listingsDetails.location);
        formData.append('streetnumber', listingsDetails.location);
        formData.append('heading', listingsDetails.heading);
        formData.append('description', listingsDetails.description);
        formData.append('price', listingsDetails.price);
        formData.append('bedrooms', listingsDetails.bedrooms);
        formData.append('washrooms', listingsDetails.washrooms);
        formData.append('others', listingsDetails.others);


        // Append photos, plans, and videos
        for (let i = 0; i < listingsDetails.photos.length; i += 1) {
            formData.append('photos[]', listingsDetails.photos[i]);
        }
        for (let i = 0; i < listingsDetails.plans.length; i += 1) {
            formData.append('plans[]', listingsDetails.plans[i]);
        }
        for (let i = 0; i < listingsDetails.videos.length; i += 1) {
            formData.append('videos[]', listingsDetails.videos[i]);
        }

        console.log("...........photos length.............");
        console.log(listingsDetails.photos.length);

        console.log("...........plans length.............");
        console.log(listingsDetails.plans.length);

        console.log("...........videos length.............");
        console.log(listingsDetails.videos.length);

        try {
            const response = await fetch('https://irean.onrender.com/listings', {
                method: 'POST',
                body: formData
            });


            console.log(response)
            alert(JSON.stringify(response))

            if (response.status === "created") {
                // Handle success
                console.log('Listing created successfully');
                alert("Listing Created Successfully")
                navigate('/dashboard/products', {
                    replace: true,
                });
            } else {
                // Handle error
                console.log('Listing created in else block');
                navigate('/dashboard/products', {
                    replace: true,
                });
            }
        } catch (error) {
            alert("Network Error");
            navigate('/dashboard/products', {
              replace: true,
          });
            // Handle network error
            console.error('Network error:', error);
        }
    };

    switch (step) {
        case 1:
            return (
                <Container maxWidth="xl">
                    {isLoading ? <LoadingSpinner /> : null}
                    <ListingLocation
                        nextStep={nextStep}
                        handleChange={handleChange}
                        values={listingDetails}
                    />
                </Container>
            );
        case 2:
            return (
                <Container maxWidth="xl">
                    {isLoading ? <LoadingSpinner /> : null}
                    <ListingDetails
                        nextStep={nextStep}
                        prevStep={prevStep}
                        handleChange={handleChange}
                        values={listingDetails}
                    />
                </Container>
            );
        case 3:
            return (
                <Container maxWidth="xl">
                    {isLoading ? <LoadingSpinner /> : null}
                    <ListingMedia
                        nextStep={nextStep}
                        prevStep={prevStep}
                        handleChangeMedia={handleChangeMedia}
                        values={listingDetails}
                    />
                </Container>
            );
        case 4:
            return (
                <Container maxWidth="xl">
                   <div>
                   <LoadingButton  size="large" variant="contained" onClick={handleSubmit}>Submit Details</LoadingButton>
        {isLoading ? <LoadingSpinner /> : null}
        <List>
          <ListItem>
            <ListItemText
              primary={
                <>
                  <Typography variant="subtitle1" component="span" fontWeight="bold">
                    Listing Type:
                  </Typography>
                  <Typography>
                  {listingDetails.listingtype}
                  </Typography>
                </>
              }
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={
                <>
                  <Typography variant="subtitle1" component="span" fontWeight="bold">
                    Property Type:
                  </Typography>
                  <Typography>
                  {listingDetails.proptype}
                  </Typography>
                </>
              }
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={
                <>
                  <Typography variant="subtitle1" component="span" fontWeight="bold">
                    Listing Title:
                  </Typography>
                  <Typography>
                  {listingDetails.heading}
                  </Typography>
                </>
              }
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={
                <>
                  <Typography variant="subtitle1" component="span" fontWeight="bold">
                    Description:
                  </Typography>
                  <Typography>
                  {listingDetails.description}
                  </Typography>
                  <Typography variant="subtitle1" component="span" fontWeight="bold">
                    ...:
                  </Typography>
                  <Typography>
                  {listingDetails.others}
                  </Typography>

                  <Typography style={{marginRight: 5}} variant="subtitle1" component="span" color={'blue'}>
                    Bedrooms: {listingDetails.bedrooms}
                  </Typography>
                  
                  <Typography variant="subtitle1" color={'blue'} component="span">
                    Washrooms:  {listingDetails.washrooms}
                  </Typography>
               
                </>
              }
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={
                <>
                  <Typography variant="subtitle1" component="span" fontWeight="bold">
                    Location:
                  </Typography>
                
                  <Typography>
                  {listingDetails.location}
                  </Typography>
                </>
              }
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={
                <>
                  <Typography variant="subtitle1" component="span" fontWeight="bold">
                    Street Name:
                  </Typography>
                  <Typography> {listingDetails.location}</Typography>
                 
                </>
              }
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={
                <>
                  <Typography variant="subtitle1" component="span" fontWeight="bold">
                    Street Number:
                  </Typography>
                  <Typography>
                  {listingDetails.location}
                  </Typography>
                </>
              }
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={
                <>
                  <Typography variant="subtitle1" component="span" fontWeight="bold">
                    Pricing $ 
                  </Typography>
                  <Typography>
                  {listingDetails.price}

                  </Typography>
                </>
              }
            />
          </ListItem>
          <Divider/>


{/* Photos */}
<ListItem>
  <ListItemText
    primary={
      <>
        <Typography variant="subtitle1" component="span" fontWeight="bold">
          Photos:
        </Typography>
        <Grid container spacing={2}>
          {listingDetails.photos.map((photo, index) => (
            <Grid item key={index}>
              <img style={{
                borderRadius: 20
              }}  src={URL.createObjectURL(photo)} alt={`IREAN ${index}`} width="100" height="100" />
            </Grid>
          ))}
        </Grid>
      </>
    }
  />
</ListItem>
<Divider />

{/* Plans */}
<ListItem>
  <ListItemText
    primary={
      <>
        <Typography variant="subtitle1" component="span" fontWeight="bold">
          Plans:
        </Typography>
        <Grid container spacing={2}>
          {listingDetails.plans.map((plan, index) => (
             <Grid item key={index}>
             <img style={{
               borderRadius: 20
             }}  src={URL.createObjectURL(plan)} alt={`Plan ${index}`} width="100" height="100" />
           </Grid>
          ))}
        </Grid>
      </>
    }
  />
</ListItem>
<Divider />

{/* Videos */}
<ListItem>
  <ListItemText
    primary={
      <>
        <Typography variant="subtitle1" component="span" fontWeight="bold">
          Videos:
        </Typography>
        <Grid container spacing={2}>
          {listingDetails.videos.map((video, index) => (
            <Grid item key={index}>
              <video  style={{width: 550, height: 200, borderRadius: 20}} controls>
                <source src={URL.createObjectURL(video)} type={video.type} />
                {/* Add a track element for captions */}
                <track kind="captions" srcLang="en" label="English" />
              </video>
            </Grid>
          ))}
        </Grid>
      </>
    }
  />
</ListItem>
<Divider />


          
        </List>
      </div>  
  

                </Container>
            );
        default:
            alert("Forms not loading");
    }
}
