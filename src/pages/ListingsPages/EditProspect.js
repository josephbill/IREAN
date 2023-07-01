import { Helmet } from 'react-helmet-async';
// @mui
import { Link, Stack, IconButton, InputAdornment, Button, TextareaAutosize, TextField, Checkbox, Select, MenuItem, InputLabel, Container, Typography } from '@mui/material';
import { useState,useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
// @mui
import { LoadingButton } from '@mui/lab';
import LoadingSpinner from '../../utils/loadingSpinner';
// components
import Iconify from '../../components/iconify/Iconify';

// ----------------------------------------------------------------------

export default function EditProspect() {

  const navigate = useNavigate();
  const location = useLocation();


  const products = location.state?.id;
  const productData = location.state?.products;


  const [isLoading, setIsLoading] = useState('');
  const [prospectName, setProspectName] = useState('');
  const [prospectEmail, setProspectEmail] = useState('');
  const [prospectPhone, setProspectPhone] = useState('');
  const [priority, setPriority] = useState('');
  const [prospectComment, setProspectComment] = useState('');
  const [currentProspect, setCurrentProspect] = useState('');


  // local storage item 
  const username = localStorage.getItem("username")
  const userid = localStorage.getItem("userid")
  const verification = localStorage.getItem("verification")


  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`https://irean.onrender.com/prospects/${products}`); // Append userId to the URL
            const data = await response.json();
     
          savetoState(data.prospect);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
  },[])

  const savetoState = (data) => {

    setProspectName(data.prospectname)
    setProspectEmail(data.prospectemail)
    setProspectPhone(data.prospectphone)
    setProspectComment(data.prospectcomment)
    setPriority(data.prospectpriority)
    setCurrentProspect(data.listing_id)
  }

  const handlePriorityChange = (e) => {
    if (e.target.value) {
    setPriority(e.target.value);
    }
  };

  const handleUpdateProspect = () => {

    const productId = products
    setIsLoading(true)
      const payload = {
        listing_id: currentProspect,
        user_id: userid,
        prospectname: prospectName,
        prospectemail: prospectEmail,
        prospectphone: prospectPhone,
        prospectpriority: priority,
        prospectcomment: prospectComment
        }


    fetch(`https://irean.onrender.com/prospects/${products}`,{
      method: "PUT",
      headers: {
            "Content-Type" : "application/json"
      },
      body: JSON.stringify(payload),
    }).then(response =>response.json())
    .then(response => {
        setIsLoading(false)
        alert(response.msg)
        
    }).catch(error => {
        alert(error)
        console.log(error)
    })

  }

  return (
    <>
      <Helmet>
        <title> Edit Prospects | IREAN </title>
      </Helmet>

      {isLoading ? <LoadingSpinner /> : null}

      <Container>

        
      <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => navigate('/dashboard/app')}
          >
            Back to Dashboard
          </Button>
          </Stack>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Edit Listing's Prospect
          </Typography>
        </Stack>


        <Stack>
        <Stack direction="row" alignItems="center"  mb={2}>

         <span>*</span> <span style={{color: 'black'}}>Client's Name</span>
         </Stack>
        <TextField name="name"  style={{
          marginBottom : 10
        }} onChange={e => setProspectName(e.target.value)} value={prospectName} />
          <Stack direction="row" alignItems="center"  mb={1}>

<span>*</span> <span style={{color: 'black'}}>Client's Email</span>
</Stack>
        <TextField name="email"  style={{
          marginBottom : 10
        }} onChange={e => setProspectEmail(e.target.value)} value={prospectEmail} />

<span>*</span> <span style={{color: 'black'}}>*Client's Phone Number</span>

<TextField name="phone" value={prospectPhone}  style={{
          marginBottom : 10
        }} onChange={e => setProspectPhone(e.target.value)} />
 
 <span>*</span> <span style={{color: 'black'}}>Comments</span>

 <TextareaAutosize
  minRows={10}
  placeholder="Minimum 3 rows"
  onChange={e => setProspectComment(e.target.value)}
  defaultValue={prospectComment}
/>



<span>*</span> <span style={{color: 'black'}}>Sale Priority</span> 
        <Select
          labelId="listing-type-label"
          id="listing-type"
          onChange={handlePriorityChange}
          label="Listing Type"
          style={{
            marginBottom: 20
          }}
        >
          <MenuItem value="Hot">Hot</MenuItem>
          <MenuItem value="Warm">Warm </MenuItem>
          <MenuItem value="Cold">Cold </MenuItem>

        </Select>

     <LoadingButton color='warning' size="medium" type="submit" variant="contained" onClick={handleUpdateProspect}>
        Update Prospect's Listing
      </LoadingButton>


    </Stack>
      </Container>
    </>
  );
}
