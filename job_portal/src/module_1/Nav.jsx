import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div className='jfx'>
      <br /><br />

        <AppBar sx={{backgroundColor:"#524F81", fontStyle:"TimesNewRoman"}}>
            <Toolbar >
                <Typography variant='h4'component="div" color="black" align="left" sx={{flexGrow:1}} >
                    Job Portal
                </Typography>
                {/* <Link to="/home">
                <Button variant="contained" color="secondary">HOME</Button>  </Link> &nbsp; */}
                <Link to="/login">
                <Button variant="contained" color="secondary">LOGIN</Button>  </Link> &nbsp;&nbsp;
                <Link to="/signup">
                <Button variant="contained" color="secondary">SIGNUP</Button>  </Link> &nbsp;
                         </Toolbar>
        </AppBar>
    </div>
  )
}

export default Nav