import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
// @mui
import { Grid,Typography } from '@mui/material';
import AgentsCard from './agentsCard';

// ----------------------------------------------------------------------



export default function AgentsList({agents}) {
    // local storage item 
    const username = localStorage.getItem("username")
    const userid = localStorage.getItem("userid")
    const verification = localStorage.getItem("verification")

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);


    console.log("In Agent list")
    console.log(agents)



  
    return (
      <Grid container spacing={3}>
      {agents.length > 0 ? (
        agents.map((agent) => (
          <Grid key={agent.id} item xs={12} sm={6} md={3}>
            <AgentsCard agent={agent} />
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography>No Agent found</Typography>
        </Grid>
      )}
    </Grid>
    );
}
