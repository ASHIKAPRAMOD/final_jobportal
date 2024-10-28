import { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    MenuItem,
    Paper,
    Select,
    TableContainer,
    TextField
} from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAllJobs } from "../redux/jobSlice";

const JobsAddForm = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "Full-time",
        vacancy: "",
        companyId: ""
    });

    const dispatch = useDispatch();

    const handlePostSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post(`http://localhost:3000/api/v0/jobs/post`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if (res.data.success) {
                // console.log(res.data);
                dispatch(setAllJobs(res.data.job));
                alert("Job added successfully");
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message)
        }
    };

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
        console.log(input);
    };

    const jobTypeSelectHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    return (
        <>
        <TableContainer component={Paper}>
              <h2 align="center" style={{ fontFamily: "serif", padding: "1rem" }}>
            ADD JOB LISTS
          </h2>
            <form
                method="POST"
                onSubmit={handlePostSubmit}
                style={{
                    display: "contents",
                    flexDirection: "column",
                    flexWrap: "nowrap",
                    gap: "0.5rem",
                    width: "500%",
                    maxWidth: "100%",
                    margin: "0.25rem auto"
                }}
            >
                <FormControl className="form-field">

                    <TextField
                        required
                        onChange={handleChange}
                        value={input.title}
                        name="title"
                        id="title"
                        placeholder="JOB TITLE"
                        variant="filled"
                        size="small"
                        fullWidth
                    />
                </FormControl>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <FormControl className="form-field">
                    
                    <TextField
                        required
                        onChange={handleChange}
                        value={input.description}
                        name="description"
                        id="description"
                        placeholder="Description"
                        variant="filled"
                        size="small"
                        fullWidth
                    />
                </FormControl>
                <br></br><br></br>
                <FormControl className="form-field">
                    
                    <TextField
                        required
                        onChange={handleChange}
                        value={input.requirements}
                        name="requirements"
                        id="requirements"
                        placeholder="Requirements"
                        variant="filled"
                        size="small"
                        fullWidth
                    />
                </FormControl>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <FormControl className="form-field">
                    <TextField
                        required
                        onChange={handleChange}
                        value={input.companyId}
                        name="companyId"
                        id="companyId"
                        placeholder="Company Ref ID"
                        variant="filled"
                        size="small"
                        fullWidth
                    />
                </FormControl>
                <br /><br />
                <FormControl className="form-field">
                    
                    <Select
                        required
                        sx={{ display: "block", width: "200%" }}
                        size="small"
                        id="job-type"
                        name="jobType"
        
                        placeholder="Job Type"
                        variant="filled"
                        onChange={jobTypeSelectHandler}
                        value={
                            input.jobType.length > 0
                                ? input.jobType
                                : input.jobType === "Full-time"
                        }
                    >
                        <MenuItem value="Part-time">Part-time</MenuItem>
                        <MenuItem value="Full-time">Full-time</MenuItem>
                        <MenuItem value="Internship">Both</MenuItem>
                    </Select>
                </FormControl>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;
                <FormControl className="form-field">
                   
                    <TextField
                        required
                        onChange={handleChange}
                        value={input.salary}
                        name="salary"
                        id="salary"
                        placeholder="Salary"
                        variant="filled"
                        size="small"
                        fullWidth
                    />
                </FormControl>
                
               
                <br /><br />
                &nbsp;&nbsp;
                <FormControl className="form-field">
                    
                    <TextField
                        required
                        onChange={handleChange}
                        value={input.location}
                        name="location"
                        id="location"
                        placeholder="Location"
                        variant="filled"
                        size="small"
                        fullWidth
                    />
                </FormControl>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <FormControl className="form-field">
                    
                    <TextField
                        required
                        onChange={handleChange}
                        value={input.vacancy}
                        name="vacancy"
                        id="vacancy"
                        placeholder="Vacancy"
                        variant="filled"
                        size="small"
                        fullWidth
                    />
                </FormControl>&nbsp;&nbsp;
                <br /><br />
                <FormControl className="form-field">
                    <Button variant="contained" type="submit" >
                        Submit
                    </Button>
                </FormControl>
            </form>
            <br /><br /><br />
            </TableContainer>
        </>
    );
};

export default JobsAddForm;