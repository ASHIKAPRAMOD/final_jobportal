import {
  Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
  } from "@mui/material";
  import { useSelector } from "react-redux";
  import useGetAppliedJobs from "../hooks/useGetAppliedJobs"
  
  const ApplicantsTable = () => {
    useGetAppliedJobs();
  
    const { allAppliedJobs } = useSelector((store) => store.job);
    let i = 0;
    return (
      <>
        <Table component={Paper}
          sx={{
            margin: " 1rem  14rem ",
            width: "80%",
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
                <b>Apply Date</b>
              </TableCell>
              <TableCell>
                <b>Job Position</b>
              </TableCell>
              <TableCell>
                <b>Company</b>
              </TableCell>
              <TableCell>
                <b>Location</b>
              </TableCell>
              <TableCell align="center">
                <b>Application Status</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allAppliedJobs.map((appliedJob) => {
              i++;
              return (
                <TableRow key={i}>
                  <TableCell>{i}</TableCell>
                  <TableCell>{appliedJob?.createdAt.split("T")[0]}</TableCell>
                  <TableCell>{appliedJob?.job?.title}</TableCell>
                  <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                  <TableCell>{appliedJob?.job?.location}</TableCell>
                  <TableCell align="center">
                    <span>{appliedJob?.status}</span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </>
    );
  };
  
  export default ApplicantsTable;