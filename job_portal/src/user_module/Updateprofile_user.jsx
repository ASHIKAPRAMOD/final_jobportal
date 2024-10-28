import React, { useState } from 'react';
import Nav_user from './Nav_user';
import { Button, TextField, Typography } from '@mui/material';

const Updateprofile_user = () => {
  const heading = { fontSize: "2rem", fontWeight: "600" };
  const paperStyle = { padding: "3rem", margin: "50px auto", borderRadius: "1rem", boxShadow: "10px 10px" };

  // State to track if fields are editable
  const [isEditable, setIsEditable] = useState(false);

  // State variables for each input field
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [city, setCity] = useState('');
  const [qualification, setQualification] = useState('');

  const toggleEdit = () => {
    setIsEditable(prev => !prev); // Toggle the editable state
    if (isEditable) {
      // Here you could save the data, e.g., send it to an API
      console.log({ fullName, email, password, mobile, city, qualification });
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Nav_user />
      <br /><br /><br /><br />
      <Typography style={heading}>Profile</Typography>
      <br />
      <form>
        <TextField 
          type="text" 
          label="Full Name" 
          variant="filled" 
          sx={{ width: "300px" }} 
          value={fullName} // Bind to state
          onChange={(e) => setFullName(e.target.value)} // Update state
          disabled={!isEditable} 
        /> 
        <br /> <br />
        <TextField 
          type="text" 
          label="Email ID"   
          variant="filled" 
          sx={{ width: "300px" }} 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={!isEditable} 
        /> 
        <br /> <br />
        <TextField 
          type="password" 
          label="Password" 
          variant="filled" 
          sx={{ width: "300px" }} 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={!isEditable} 
        /> 
        <br /> <br />
        <TextField 
          type="text" 
          label="Mobile Number" 
          variant="filled" 
          sx={{ width: "300px" }} 
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          disabled={!isEditable} 
        /> 
        <br /><br />
        <TextField 
          type="text" 
          label="City" 
          variant="filled" 
          sx={{ width: "300px" }} 
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={!isEditable} 
        /> 
        <br /><br />
        <TextField 
          type="text" 
          label="Qualification" 
          variant="filled" 
          sx={{ width: "300px" }} 
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
          disabled={!isEditable} 
        /> 
        <br /><br />
        <Button 
          variant="contained" 
          onClick={toggleEdit} // Toggle edit mode
          sx={{ marginTop: "1rem" }}
        >
          {isEditable ? 'Save' : 'Edit'}
        </Button>
      </form>
    </div>
  );
};

export default Updateprofile_user;
