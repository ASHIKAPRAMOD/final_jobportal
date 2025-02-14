import React from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const Jobcard = ({ job }) => {
  const handleApplyButton = async () => {
    try {
      const jobId = job?._id;
      const response = await axios.get(
        `http://localhost:3000/api/v0/applications/apply/${jobId}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        alert(response.data.message);
      } else {
        alert('Error applying to the job.');
      }
    } catch (error) {
      console.error("Error applying to the job:", error);
      alert(error.response.data.message);
    }
  };

  const timestampFn = (mongoCreatedAt) => {
    const createdAt = new Date(mongoCreatedAt);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Difference in days
  };

  return (
    <Card
      sx={{
        minWidth: 240,
        position: "relative",
      }}
    >
      <CardContent
        sx={{
          padding: "1rem",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          flexWrap: "nowrap",
        }}
      >
        {/* Job Salary and Job Type */}
        <div
          className="jobcard-footer"
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "space-between",
          }}
        >
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            {job?.salary ? ` Salary = ${job.salary} ` : "Salary not specified"}
          </Typography>
          <Typography variant="subtitle2">{job?.jobType}</Typography>
        </div>





        {/* Job Title */}
        <Typography variant="h5">{job?.title}</Typography>
        <Typography variant="h6">{job?.description || "Remote"}</Typography>

        {/* Location and Requirements */}
        <div
          className="jobcard-footer"
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "space-between",
          }}
        >

          <Typography variant="subtitle2">{job?.location || "Remote"}</Typography>&nbsp;&nbsp;&nbsp;&nbsp;

          <Typography variant="subtitle2">
            {job?.requirements?.length > 0
              ? job.requirements.join(', ')  // Better display for requirements
              : "No specific requirements"}
          </Typography>


        </div>

        {/* Optional: Display how long ago the job was posted */}
        <Typography variant="caption" color="textSecondary">
          Posted {timestampFn(job?.createdAt)} days ago
        </Typography>

        <Typography variant="subtitle2">{job?.vacancy ? ` Vacancy = ${job.vacancy} ` : "Vacancy not specified"}</Typography>
      </CardContent>

      <CardActions>
        <Button
          variant="contained"
          size="small"
          onClick={() => handleApplyButton()}
        >
          Apply Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default Jobcard;



// {/* <div>
//       <h3>{job.title}</h3>
//       {/* Other job details */}
//       <button onClick={handleApplyButton}>Apply</button>
//     </div> */}