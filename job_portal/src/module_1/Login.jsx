import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios'; // Make sure to import axios
import { Message } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setLoading, setUser } from "../redux/userSlice.js";

const USER_API_END_POINT = 'http://localhost:3000/api/v0/user'; // Update with your actual endpoint

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const [passwordError, setPasswordError] = useState({
    state: false,
    message: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const validateInput = () => {
    const { password } = input;
    let isValid = true;

    if (!password || password.length < 8) {
      setPasswordError({
        state: true,
        message: 'Password should be at least 8 characters long.',
      });
      isValid = false;
    } else {
      setPasswordError({
        state: false,
        message: '',
      });
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidEntry = validateInput();

    if (isValidEntry) {
      const { email, password } = input;

      // Check for admin credentials
      if (email === 'admin' && password === 'admin123') {
        navigate('/admindashboard'); // Redirect to admin dashboard
        return; // Prevent further execution
      }

      try {

        dispatch(setLoading(true));
        const loginData = {
          email: email,
          password: password,
          role: 'user', // Adjust role as necessary
        };

        const response = await axios.post(`${USER_API_END_POINT}/login`, loginData, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        if (response.data.success) {
          dispatch(setUser(response.data.user))
          if (response.data.user.role === 'admin') {
            navigate('/admindashboard');
          } else {
            navigate('/userdashboard');
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  return (
    <div className='wrapper'>
      <br /><br />
      <h2>USER LOGIN</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="User name"
          name="email"
          value={input.email}
          onChange={handleChange}
          variant="outlined"
          required
          color='transparent'
        /><br /><br />
        <TextField
          label="Password"
          name="password"
          value={input.password}
          onChange={handleChange}
          type="password"
          variant="outlined"
          required
        /><br />
        {passwordError.state && <p style={{ color: 'red' }}>{passwordError.message}</p>}
        <br /><br />
        <Button variant="contained" type="submit">Log In</Button><br />
      </form>
      <p>Don't have an account? &nbsp;<Link to="/signup">Sign Up</Link></p>
      <Link to='/home'>Back to Home</Link>
      <br /><br />
    </div>
  );
}

export default Login;
