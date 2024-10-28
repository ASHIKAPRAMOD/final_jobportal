import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Typography, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccountCircle from '@mui/icons-material/AccountCircle'; // Admin user icon
import WorkIcon from '@mui/icons-material/Work'; // Job icon
import { Link } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7b6866', // Define your primary color
    },
    sidebar: {
      main: '#ff0000', // Custom sidebar color
    },
    text: {
      primary: '#ffffff',
    },
  },
});


const Nav_admin = () => {

  const handleLogout = () => {
    alert("You have logged out.");
    // Optionally, you can add any logout logic here
  };


  return (

    <ThemeProvider theme={theme}>
      <Drawer variant="permanent" sx={{
        width: 240, flexShrink: 0, '& .MuiDrawer-paper': {
          width: 240, backgroundColor: '#524F81', // Black background
          color: '#ffffff', // White text
        },
      }}>
        <div>
          {/* Admin Icon on top */}
          <IconButton sx={{ justifyContent: 'center', display: 'flex', marginTop: 2 }}>
            <AccountCircle sx={{ fontSize: 60, color: '#ffffff' }} /> {/* Admin user icon */}
          </IconButton>
          <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 1 }}>
            Admin Panel
          </Typography>

          {/* Sidebar Navigation Buttons */}
          <List>
            {/* Admin Dashboard Button */}
            <Link to="/admindashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem>
                <ListItemIcon>
                  <WorkIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Admin Dashboard" />
              </ListItem>
            </Link>

            {/* Manage Jobs Button */}
            <Link to="/managejob" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem>
                <ListItemIcon>
                  <WorkIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Manage Jobs " />
              </ListItem>
            </Link>

            {/* View User */}
            <Link to="/viewuser/:id" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem>
                <ListItemIcon>
                  <WorkIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="View User " />
              </ListItem>
            </Link>


            <Link to='/home'>
              <Button variant="contained" onClick={handleLogout}>Log out</Button>
            </Link>




          </List>
        </div>
      </Drawer>
    </ThemeProvider>



  )
}

export default Nav_admin
