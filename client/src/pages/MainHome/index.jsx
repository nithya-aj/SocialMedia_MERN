import React from 'react'
import { Box } from '@mui/material'
import { Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useTheme } from '@emotion/react'
import Navbar from 'components/navbar/Navbar'
import Sidebar from 'components/sidebar/Sidebar'
import RightBar from 'components/rightbar/RightBar'
import NavItems from 'components/MobileSidebar/NavItems'

const MainHome = () => {
  const theme = useTheme()
  const alt = theme.palette.background.alt
  const main = theme.palette.background.main
  return (
    <>
      <Navbar />
      <Grid container sx={{ flexGrow: 1 }} backgroundColor={main} >
        <Grid item lg={2} md={2.5} sm={2.5} sx={{ height: '90vh', display: { xs: 'none', sm: 'block' } }}>
          <Sidebar />
        </Grid>
        <Grid item lg={8} md={7} sm={6.5} xs={12} sx={{ pt: '1rem' }}> 
          <Box sx={{ borderRadius: { sm: '10px 10px 0px 0px' }, height: '90vh', overflow: 'auto', backgroundColor: { sm: alt, xs: main }, border: { sm: `2px solid ${alt}`, xs: `2px solid ${main}` } }}>
            <Outlet />
          </Box>
        </Grid>
        <Grid item lg={2} md={2.5} sm={3} sx={{ height: '90vh', display: { xs: 'none', sm: 'block' } }}>
          <RightBar />
        </Grid>
      </Grid >
      <Box sx={{ display: { xs: 'flex', sm: 'none' }, height: '4rem', backgroundColor: main, width: '100%', position: 'absolute', bottom: 0, alignItems: 'center', justifyContent: 'space-evenly', px: '1rem' }}>
        <NavItems />
      </Box>
    </>

  )
}

export default MainHome