import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'

const Userview = () => {
  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography variant='h4'component="div" color="black" align="left" sx={{flexGrow:1}}></Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Userview