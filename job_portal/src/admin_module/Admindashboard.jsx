import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Stack } from '@mui/material'
import React from 'react'
import Nav_admin from './Nav_admin'
import { useSelector } from "react-redux";
import useGetallAdminJobs from "../hooks/useGetallAdminJobs";
import JobUpdate from "../user_module/JobUpdateModal"
import axios from "axios";
import { setAllAdminJobs } from "../redux/jobSlice.js";
import { JOB_API_END_POINT } from '../utils/constants';

const Admindashboard = () => {
  useGetallAdminJobs();
  const { allAdminJobs } = useSelector((store) => store.job);
  let i = 0;
  const handleDelete = async (itemId) => {
    try {
      const res = await axios.delete(`${JOB_API_END_POINT}/remove/${itemId}`);
      if (res.data.success) {
        console.log(res.data);
        setAllAdminJobs(allAdminJobs.filter((item) => item._id !== itemId));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  return (
    <div>
      <Nav_admin />

      <h1>List of Jobs</h1>
      <TableContainer
        component={Paper}
        sx={{
          display: "flex", // Change display to flex
          justifyContent: "center", // Center horizontally
          alignItems: "flex-end", // Align items to the bottom
          height: "100%",
          width: "100%"
        }}
      >
        {allAdminJobs.length >= 0 && (
          <Table
            sx={{
              margin: "1rem 14rem",
              height: "100%",
              width: "80%",
              maxWidth: "100%",
              fontFamily: "Poppins,Verdana,Arial,sans-serif",
              fontSize: "2.5rem"
            }}
          >
            <TableHead
              sx={{
                fontWeight: "bold"
              }}
            >
              <TableRow>
                <TableCell align="left">
                  <b>S.No</b>
                </TableCell>
                <TableCell>
                  <b>Creation Date</b>
                </TableCell>
                <TableCell>
                  <b>Job Id</b>
                </TableCell>
                <TableCell>
                  <b>Job Position</b>
                </TableCell>
                {/* <TableCell>
                  <b>Company</b>
                </TableCell> */}
                <TableCell>
                  <b>Location</b>
                </TableCell>
                <TableCell>
                  <b>Manage Options</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allAdminJobs.map((allAdminJob) => {
                // console.log(allAdminJob);
                i++;
                return (
                  <TableRow key={i}>
                    <TableCell>{i}</TableCell>
                    <TableCell>
                      {allAdminJob?.createdAt.split("T")[0]}
                    </TableCell>
                    <TableCell>{allAdminJob?._id}</TableCell>
                    <TableCell>{allAdminJob?.title}</TableCell>
                    {/* <TableCell>{allAdminJob?.company?.name}</TableCell> */}
                    <TableCell>{allAdminJob?.location}</TableCell>
                    <TableCell>
                      <Stack spacing={1} direction="row">
                        <JobUpdate job={allAdminJob} />
                        <Button
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this job?"
                              )
                            ) {
                              let jobId = allAdminJob?._id;
                              handleDelete(jobId);
                              if (handleDelete) window.location.reload();
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </div>
  )
}

export default Admindashboard
