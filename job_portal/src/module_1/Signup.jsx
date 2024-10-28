import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { json, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { NoBackpack } from '@mui/icons-material';

const Signup = () => {
  const [emailError, setEmailError] = useState({ state: false, message: "" });
  const [passwordError, setPasswordError] = useState({ state: false, message: "" });
  const [phoneNoError, setPhoneNoError] = useState({ state: false, message: "" });
  const [nameError, setNameError] = useState({ state: false, message: "" });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    phoneNo: "",
    city: "",
    qualification: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
    resetErrors(event.target.name);
  };

  const resetErrors = (field) => {
    switch (field) {
      case 'fullname':
        setNameError({ state: false, message: "" });
        break;
      case 'email':
        setEmailError({ state: false, message: "" });
        break;
      case 'password':
        setPasswordError({ state: false, message: "" });
        break;
      case 'phoneNo':
        setPhoneNoError({ state: false, message: "" });
        break;
      default:
        break;
    }
  };

  const validateInputs = () => {
    const { email, password, fullname, phoneNo } = input;
    let isValid = true;

    if (!fullname) {
      setNameError({ state: true, message: "Name is required." });
      isValid = false;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError({ state: true, message: "Please enter a valid email address." });
      isValid = false;
    }
    if (!password || password.length < 8) {
      setPasswordError({ state: true, message: "Password must be at least 8 characters long." });
      isValid = false;
    }
    if (!phoneNo || !/^\d{10}$/.test(phoneNo)) {
      setPhoneNoError({ state: true, message: "Valid Phone Number is required." });
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValidEntry = validateInputs();

    if (!isValidEntry) return;

    setLoading(true); // Start loading

    try {
      const userData = { ...input };

      const response = await axios.post("http://localhost:3000/api/v0/user/signup", userData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      setLoading(false); // Stop loading

      if (response.data.success) {
        setSuccessMessage("Signup successful! You can now log in."); // Set success message
        setTimeout(() => {
          setSuccessMessage(""); // Clear message after 3 seconds
          navigate("/login");
        }, 3000);
      } else {
        if (response.data.message) {
          alert(response.data.message);
        }
      }
    } catch (err) {
      setLoading(false); // Stop loading on error
      console.error("Error:", err.response ? err.response.data : err.message);
      alert(err.response && err.response.data.message ? err.response.data.message : "An error occurred. Please try again.");
    }
  };


  const handleReset = () => {
    setInput({
      fullname: "",
      email: "",
      password: "",
      phoneNo: "",
      city: "",
      qualification: "",
    });
    setEmailError({ state: false, message: "" });
    setPasswordError({ state: false, message: "" });
    setPhoneNoError({ state: false, message: "" });
    setNameError({ state: false, message: "" });
    setSuccessMessage("");
    
  };

  return (
    <div className='dell'>
      <br />
      <h3>USER SIGN UP</h3>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <TextField
          required
          name="fullname"
          label="Full Name"
          onChange={handleChange}
          value={input.fullname}
          variant="filled"
          error={nameError.state}
          helperText={nameError.state ? nameError.message : ""}
        />
        &nbsp;&nbsp;&nbsp;

        <TextField
          required
          name="email"
          label="Email ID"
          onChange={handleChange}
          value={input.email}
          variant="filled"
          error={emailError.state}
          helperText={emailError.state ? emailError.message : ""}
        />
        <br /><br />

        <TextField
          required
          name="password"
          type="password"
          autoComplete="current-password"
          label="Password"
          onChange={handleChange}
          value={input.password}
          variant="filled"
          error={passwordError.state}
          helperText={passwordError.state ? passwordError.message : ""}
        />
        &nbsp;&nbsp;&nbsp;

        <TextField
          required
          name="phoneNo"
          label="Mobile Number"
          onChange={handleChange}
          value={input.phoneNo}
          variant="filled"
          error={phoneNoError.state}
          helperText={phoneNoError.state ? phoneNoError.message : ""}
        />
        <br /><br />

        <TextField
          name="city"
          label="City"
          onChange={handleChange}
          value={input.city}
          variant="filled"
        />
        &nbsp;&nbsp;

        <TextField
          name="qualification"
          label="Qualification"
          onChange={handleChange}
          value={input.qualification}
          variant="filled"
        />
        <br /><br />

        <Button variant="contained" type="button" onClick={handleReset}>Reset</Button>
        &nbsp;&nbsp;
        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
      <br /><br /><br />
      Login : &nbsp;
      <Link to="/login">Login Here</Link>
      <br /><br />
      <Link to="/home">Back to Home</Link>
      <br /><br />
    </div>
  );
};

export default Signup;
