import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import ollirLogo from './ollir-organics.jpg'; // Import the image

const DrawerAppBar: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" style={{ backgroundColor: 'White' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={ollirLogo} alt="Logo" style={{ height: 40 }} />
          </Box>

          {/* Home Button for Desktop */}
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button
              href="/#Handmade"
              sx={{
                color: '#81C408',
                '&:hover': {
                  color: '#FFB524',
                  backgroundColor: 'transparent',
                },
              }}
            >
              Home
            </Button>
          </Box>

          {/* Home Button for Mobile */}
          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <Button
              href="/#Handmade"
              sx={{
                color: '#81C408',
                '&:hover': {
                  color: '#FFB524',
                  backgroundColor: 'transparent',
                },
              }}
            >
              Home
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default DrawerAppBar;
