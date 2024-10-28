import React,{useEffect,useState} from 'react'
import Nav_user from './Nav_user'
import { Box, Button, TextField } from '@mui/material'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Jobcard from './Jobcard.jsx';
import useGetJobs from '../hooks/useGetJobs.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice.js';


const User_dashboard = () => {

  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    
  });
  
  const [filter, setFilter] = useState('');
  useGetJobs();

  const dispatch = useDispatch();
  const { allJobs } = useSelector((store) => store.job);

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  // Filter the job listings based on the filter input
  // const filteredJobs = allJobs?.filter(job =>
  //   job.title.toLowerCase().includes(filter.toLowerCase())
  // ) || [];

  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
      
      <Nav_user />

 <Box sx={{
          width: 500,
          height: 70,
          borderRadius: 1,
          bgcolor: '#524F81',
          display: 'flex', // Use flexbo
          alignItems: 'center', // Center vertically
          padding: '0 16px', // Add some padding
          '&:hover': {
            bgcolor: '#524F81',
          },
        }}>
          
          
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
         <TextField variant="outlined"
      placeholder="Search Jobs...."
      fullWidth
      InputProps={{
        style: {
          backgroundColor: '#fff', // Set background color for the input
        },
      }}
      sx={{
        borderRadius: 1, // Optional: to match the box's border radius
        width: 300,
        height: 15,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:1,
        marginRight:1,
      }}
      onChange={(e) => setFilter(e.target.value)} 
    ></TextField> &nbsp;&nbsp;<Button 
    variant="contained" 
    color="secondary" 
    onClick={() => dispatch(setSearchedQuery(filter))} // Example action
  >
    Submit
  </Button></Box>
      
      
    </div>
  )
}

export default User_dashboard
