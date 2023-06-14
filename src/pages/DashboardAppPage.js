import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useState ,useEffect} from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

const roleList = ["0","1","2","3","4","5"]

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [adminCount,setAdminCount] = useState('')
  const [ownerCount,setOwnerCount] = useState('')
  const [salesCount,setSalesCount] = useState('')
  const [mediaCount,setMediaCount] = useState('')
  const [agentCount,setAgentCount] = useState('')
  const [champCount,setChampCount] = useState('')
  const [listingCount,setListingCount] = useState('')
  const [who,setWho] = useState('')



  
  useEffect(() => {
    const userRole = localStorage.getItem("userrole") 
    setWho(userRole)
    getAdminCount();
}, [])


function getAdminCount(){

  for(let i = 0; i < roleList.length; i+= 1) {
    let count = 0;
    const payload = {
      "role" : roleList[i]
    }
    console.log("------------------")
    console.log(payload)
    fetch("https://irean.onrender.com/users/count_by_role",{
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(payload)
    
    }).then(response => response.json())
    .then(response => {
      console.log(response)
      if(roleList[i] === "0"){
        count = response.count
        console.log("----------------")
        console.log(count)
        setAdminCount(response.count)
      } else if(roleList[i] === "1"){
        setOwnerCount(response.count)
      } else if(roleList[i] === "2"){
        setAgentCount(response.count)

      } else if(roleList[i] === "3"){
        setChampCount(response.count)

      } else if(roleList[i] === "4"){
        setSalesCount(response.count)

      } else if(roleList[i] === "5"){
        setMediaCount(response.count)

      } 

      getListingsCount()
      console.log("admin count")
      console.log(adminCount)
      console.log("owner count")
      console.log(ownerCount)
      console.log("agent count")
      console.log(agentCount)
      console.log("champ count")
      console.log(champCount)
      console.log("sales count")
      console.log(salesCount)
      console.log("media count")
      console.log(mediaCount)

    }).catch(error => {
      console.log(error)
    })
  }
 
}


function getListingsCount() {
  fetch("https://irean.onrender.com/listings/count",{
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
        
  }).then(response => response.json())
  .then(response => {
    console.log(response)
    setListingCount(response.count)
  })
}






  return (
    <>
      <Helmet>
        <title> Dashboard | IREAN</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>
        {/* users report  */}
        {who === "0" ? (
          <>
        <Typography variant="h6" sx={{ mb: 5 }}>
          System Users
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="System Admins" total={adminCount} color='secondary' icon={'ant-design:house'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Property Owners" total={ownerCount} color="info" icon={'ant-design:house'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Real Estate Agents" total={agentCount} color="warning" icon={'ant-design:house'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="IREAN Property Champions" total={champCount} color="error" icon={'ant-design:house'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="IREAN Sales Staff" total={salesCount} color="error" icon={'ant-design:house'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="IREAN Media and Marketing Staff"  total={mediaCount} color="error" icon={'ant-design:house'} />
          </Grid>
        </Grid>   
        <Typography variant="h6" style={{marginTop: 10}} sx={{ mb: 5 }}>
          Property Listings
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Uploaded Listings" total={listingCount} color='secondary' icon={'ant-design:house'} />
          </Grid>
      
        </Grid>  
          </>
        ) : 
        who === "1" ? (
          <>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Uploaded Lisitings" total={adminCount} icon={'ant-design:house'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Agents" total={adminCount} icon={'ant-design:house'} />
          </Grid>
        </Grid>
          </>
        ) :  
        who === "2" ? (
          <>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="IREAN Listings" total={listingCount} icon={'ant-design:house'} color='info' />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Assigned Listings" total={adminCount} icon={'ant-design:house'} color='error' />
          </Grid>
        </Grid>
          </>
        )
        
        : null
        }
       
  </Container>
  </>
  );
}
