import React, { useEffect, useState } from 'react';
import { Box, Grid2, Typography, TextField ,Snackbar,Button} from "@mui/material";
import Nav_user from './Nav_user';
import Jobcard from './Jobcard.jsx';
import useGetJobs from '../hooks/useGetJobs.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice.js';

const Browsejobs = () => {
  const [filter, setFilter] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  useGetJobs();

  const dispatch = useDispatch();
  const { allJobs } = useSelector((store) => store.job);

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  // Filter the job listings based on the filter input
  const filteredJobs = allJobs?.filter(job =>
    job.title.toLowerCase().includes(filter.toLowerCase())
  ) || [];

  const handleApplySuccess = () => {
    setSuccessMessage("Application submitted successfully!");
    // Optionally, clear the message after a timeout
    setTimeout(() => setSuccessMessage(''), 3000); // Clears after 3 seconds
  };

  return (
    <>
      <header>
        <Nav_user />
        <br /><br /><br />
      </header>



      
      <div  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
      
      
      
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
  </Button></Box></div>

      <main style={{ display: "flex", flexDirection: "row" }}>
        {/* <Box
          component="div"
          sx={{
            flexGrow: 1,
            height: "100%",
            padding: "0.75rem",
            margin: "1.25rem 0 1.25rem 1.25rem",
            border: "1px solid black",
            borderRadius: "0.5rem",
            minWidth: "33ch",
            minHeight: "80dvh"
          }}
        >
          <Typography variant="h5">Job filters</Typography>
          <TextField
            variant="outlined"
            label="Filter by job title"
            fullWidth
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{ marginTop: '1rem' }}
          />
        </Box> */}

        <Box
          component="div"
          sx={{
            display: "flex",
            flexGrow: 1,
            height: "100%",
            padding: "1rem",
            textAlign: "center",
            mt: "0.25rem",
          }}
        >
          
          <Grid2 container spacing={2}  justifyContent="flex-end">
            {
              allJobs.length > 0 ? (
                allJobs.map((job) => (
                  <Grid2 key={job._id}>
                    <Jobcard job={job} />
                  </Grid2>
                ))
              ) : (
                <Typography>No jobs found</Typography>
              )
            }
          </Grid2>
        </Box>
        <Snackbar
          open={!!successMessage}
          autoHideDuration={3000}
          onClose={() => setSuccessMessage('')}
          message={successMessage}
        />
      </main>
    </>
  );
};

export default Browsejobs;














