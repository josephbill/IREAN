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
import AgentsList from '../../sections/@dashboard/agents/AgentsList';


// ----------------------------------------------------------------------

export default function AgentsProfiles() {
  const [openFilter, setOpenFilter] = useState(false);
  const [agentProfiles,setAgentProfiles] = useState([]);
  
  let agentsArray  = []
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
      agentsArray = response.records
      setAgentProfiles(agentsArray)
    })
  },[])

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
        <title> Agent Profiles | IREAN </title>
      </Helmet>
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
         Real Estate Agent Profiles 
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            {/* <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            /> */}
            {/* <ProductSort /> */}
            {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => navigate('/dashboard/listings')}
          >
            Add Listing
          </Button> */}
          </Stack>
        </Stack>

        {agentProfiles.length > 0 ? 
                <AgentsList agents={agentProfiles} />
          :
          <Typography variant='h6'>No Agents Found</Typography>
      }
      </Container>
    </>
  );
}
