import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  SwipeableDrawer,
  Button
} from '@mui/material';
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

const Nav_user = () => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };


  const handleLogout = () => {
    alert("You have logged out.");
  };


  return (
    <ThemeProvider theme={theme}>
      <SwipeableDrawer
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        variant="permanent" // Use 'temporary' for swipeable drawer
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            backgroundColor: '#524F81', // Background color
            color: '#ffffff',
          },
        }}
      >
        <div>
          {/* Admin Icon on top */}
          <IconButton sx={{ justifyContent: 'center', display: 'flex', marginTop: 2 }}>
            <AccountCircle sx={{ fontSize: 60, color: '#ffffff' }} />
          </IconButton>
          {/* <Typography variant="h5">{user?.fullname}</Typography> */}
          <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 1 }}>
            User Panel
          </Typography>

          {/* Sidebar Navigation Buttons */}
          <List>
            {/* User Dashboard Button */}
            {/* <Link to="/userdashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem button>
                <ListItemIcon>
                  <WorkIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="User Dashboard" />
              </ListItem>
            </Link> */}

            {/* Browse Job Button */}
            <Link to="/browsejob" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem button>
                <ListItemIcon>
                  <WorkIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Browse Job" />
              </ListItem>
            </Link>

            {/* Update Profile Button */}
            <Link to="/updateprofile" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem button>
                <ListItemIcon>
                  <WorkIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Update Profile" />
              </ListItem>
            </Link>

            {/* View Applied Job Button */}
            <Link to="/viewapplied" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem button>
                <ListItemIcon>
                  <WorkIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="View Applied Job" />
              </ListItem>
            </Link>

            {/* Log Out Button */}
            <Link to ='/home'>
            <Button variant="contained" onClick={handleLogout}>Log out</Button>  <br /></Link>
          </List>
        </div>
      </SwipeableDrawer>

      {/* Button to open drawer only when it is closed, positioned on the left */}
      {!isDrawerOpen && (
        <IconButton 
          
          sx={{ 
            color: '#524F81', 
            position: 'absolute', // Position it absolutely
            left: 10, // Adjust this value as needed
            top: 20 // Adjust this value as needed
          }}>
          <AccountCircle sx={{ fontSize: 40 }} />
        </IconButton>
      )}
    </ThemeProvider>
  );
};

export default Nav_user;
