
// @mui
import { Helmet } from 'react-helmet-async';
import { useState,useRef, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { ListingItemText, Stack, IconButton, InputAdornment,ListItemText, OutlinedInput, Container,TextField, Checkbox, Select,Button, MenuItem ,Typography} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../components/iconify/Iconify';
import LoadingSpinner from '../../utils/loadingSpinner';
// components


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const paymentLevel = [
  'Diamond',
  'Platinum',
  'Gold'
];



export default function AdminEditListing() {

    const navigate = useNavigate()
    const location = useLocation()

    const [verification, setVerification] = useState(null);
    const [leadStatus, setLeadStatus] = useState(null);
    const [selectedAgents, setSelectedAgents] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [realEstateAgents, setAgents] = useState([]);
    const [agentGroup, setAgentGroup] = useState([]);
    const [paymentGroup, setPaymentGroup] = useState([]);

    const handleChangeGroup = (event) => {
      const {
        target: { value },
      } = event;
      setAgentGroup(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );

    };

    const handleChangePayment = (event) => {
      const {
        target: { value },
      } = event;
      setPaymentGroup(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );

    };

    let userTwo = []
    const products = location.state?.products;

  

    // get agents
    useEffect(() => {
      const payload = {
        role : 2
      }
      fetch("https://irean.onrender.com/users/count_by_role",{
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(payload)
      
      }).then(response => response.json())
      .then(response => {
        console.log(response)
        userTwo = response.records
        const result = userTwo.filter(user => {
         return user.verification === "1"
        })
        setAgents(result)
        console.log(realEstateAgents)
      })
    },[])


    useEffect(() => { 
      const fetchListingsDetails = () => {
        fetch(`https://irean.onrender.com/listings/${products.id}`,{

        }).then(response => response.json())
        .then(response => {
          console.log(response)
          const verify  = response.listing.verifiedstatus
          if(verify === 0){
            setVerification("0")
          } else {
            setVerification("1")
          }
          
          const leadstatus = response.listing.leadstatus
          if(leadstatus === 'hot'){
             setLeadStatus("Hot")
          } else if (leadstatus === 'warm'){
             setLeadStatus("Warm")
          } else {
            setLeadStatus("Cold")
          }
          setSelectedAgents(response.listing.agent_id)

        }).catch(error => {
          alert(error)
        })
      }
      fetchListingsDetails()
    },[])

    const checkverified = (users) => {
       if(users.verification === "1"){
          return users
       }
       return users;
    }

    // console.log(products)

const handleVerificationChange = (e) => {
    setVerification(e.target.value);
};

const handleleadChange = (e) => {
    setLeadStatus(e.target.value);
};

const handleAgentChange = (e) => {
  setSelectedAgents(e.target.value);
};


const updateListing = async (leadStatus,verification,updateproducts) => {
  setIsLoading(true);

  const prospectsArray = []

  const updateData = {
    leadstatus: leadStatus,
    verifiedstatus: verification,
    listing_attachments: agentGroup,
  };

  try {
    const response = await fetch(`https://irean.onrender.com/listings/${updateproducts.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (response.ok) {
      // Listing successfully updated
      const updatedListing = await response.json();
      console.log(updatedListing);
      alert("Listing Updated.")
      navigate('/dashboard/products')

    } else {
      // Error occurred during the update
      const errorData = await response.json();
      console.log(errorData);
      alert("Error occurred on update.")
      navigate('/dashboard/products')
    }
  } catch (error) {
    console.log(error);
  }

  setIsLoading(false);
};



const verifiedUsers = realEstateAgents.filter(user => user.verification === 1);
console.log("VERUIFIED")
console.log(verifiedUsers)
return (
    <>
       <Helmet>
        <title> Edit Listing | IREAN </title>
      </Helmet>

      {isLoading ? <LoadingSpinner /> : null}

      <Container>
      <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
      <Typography variant="h6" style={{
        marginRight: 20
      }}>Edit Listings</Typography>

          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                     <Button variant="contained" color='orange' startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() =>{
                navigate(`/dashboard/products`)
            }}
          >
            Back To Dashboard.
          </Button>
          </Stack>
          </Stack>
       
          <Stack spacing={3}>
            <Typography variant='h6'>Verification Status</Typography>
          <Select
          labelId="listing-type-label"
          id="listing-type"
          label="Verification Status"
          onChange={handleVerificationChange}
          value={verification}
          >
          <MenuItem value="1">True</MenuItem>
          <MenuItem value="0">False</MenuItem>
        </Select>

        <Typography variant='h6'>Lead Status</Typography>
          <Select
          labelId="listing-type-label"
          id="listing-type"
          label="Lead Status"
          onChange={handleleadChange}
          value={leadStatus}
          >
          <MenuItem value="Hot">Hot</MenuItem>
          <MenuItem value="Warm">Warm</MenuItem>
          <MenuItem value="Cold">Cold</MenuItem>
        </Select>


      {realEstateAgents.length > 0 && ( // Render the select component when userTwo has data
      <>
            {/* <Typography>Attach agent to listing</Typography>
        <Select
          labelId="listing-agent-label"
          id="agent-id"
          label="Real Estate Agent"
          onChange={handleAgentChange}
          value={selectedAgents}
        >
          {realEstateAgents.map(user => (
            <MenuItem key={user.id} value={user.id}>{user.username}</MenuItem>
          ))}
          {realEstateAgents === []&& (
             <Typography>Unverified Agents</Typography>
          )} 
        </Select> */}

        <Typography variant='h6'>Attach agent to listing</Typography>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={agentGroup}
          // style={{
          //   color: 'white'
          // }}
          onChange={handleChangeGroup}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >

          {realEstateAgents.map((name) => (
            <MenuItem key={name.id} value={name.id}>
                 <Checkbox checked={agentGroup.indexOf(name.id) > -1}/>
                 <ListItemText primary={name.username}/>
            </MenuItem>
          ))}

          </Select>

          
          {/* <Typography variant='h6'>Attach Agent Group to Listing.</Typography>
        <Select
          labelId="demo-multiple-checkbox-label2"
          id="demo-multiple-checkbox2"
          multiple
          value={paymentGroup}
          // style={{
          //   color: 'white'
          // }}
          onChange={handleChangePayment}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >

          {paymentLevel.map((name) => (
            <MenuItem key={name} value={name}>
                 <Checkbox checked={paymentGroup.indexOf(name) > -1}/>
                 <ListItemText primary={name}/>
            </MenuItem>
          ))}

          </Select> */}
      </>

      
           
      )}

        <LoadingButton fullWidth size="medium" type="submit" variant="contained" onClick={() => {
            // function to update listing based off its id 

            updateListing(leadStatus,verification,products)

        }}>
          Update Listing
        </LoadingButton>
      </Stack>
      </Container>
    </>
  );
}
