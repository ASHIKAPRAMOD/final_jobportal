import {
    Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../hooks/useGetAppliedJobs";
import Nav_user from "./Nav_user";

const AppliedJobsTable = () => {
  useGetAppliedJobs();

  const { allAppliedJobs } = useSelector((store) => store.job);
  let i = 0;
  return (
      <>
      <Nav_user/>
      <TableContainer>
          <Table component={Paper}
              sx={{
                  margin: "0 auto",
                  width: "100%",
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
                              <TableCell>{appliedJob?.job?.description}</TableCell>
                              <TableCell>{appliedJob?.job?.title}</TableCell>
                              <TableCell>{appliedJob?.job?.location}</TableCell>
                              <TableCell align="center">
                                  <span>{appliedJob?.status}</span>
                              </TableCell>
                          </TableRow>
                      );
                  })}
              </TableBody>
          </Table>
      </TableContainer>
      </>
  );
};

export default AppliedJobsTable;