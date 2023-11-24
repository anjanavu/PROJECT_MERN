import React, { useState } from 'react';
import {AppBar,Box,Button,Container,  Dialog,
  DialogContent,IconButton,Menu,MenuItem,Toolbar,Typography,} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoImage from '../ict_academy (1).png';
import Login from './Login';
const Navbar = () => {
  
const [openLogin, setOpenLogin] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleOpenLogin = () => {
    setOpenLogin(true);
    handleCloseNavMenu(); // Close the menu when login is opened
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };
  return (
    <AppBar position="static"sx={{ backgroundColor: 'white' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              style={{ color: 'black' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                <MenuItem  onClick={handleOpenLogin}>
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
            </Menu>
          </Box>

          <img
            src={LogoImage}
            alt="Logo"
            style={{
              display: { xs: 'none', md: 'flex' },
              marginRight: 1,
              height: '30px', // Adjust the height as needed
            }}
          />

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                Home
              </Button>
              <Button
                onClick={handleOpenLogin}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                Login
              </Button>
              <Dialog open={openLogin} onClose={handleCloseLogin}>
        <DialogContent           sx={{
            width: '100%', // Set the initial width
            maxHeight: '100%', // Set the initial maxHeight
            overflowY: 'auto', // Enable vertical scrolling if content overflows
            '@media (min-width: 600px)': {
              width: '600px', // Adjust width for larger screens
              maxHeight: '80vh', // Adjust maxHeight for larger screens
            },
          }}>
          <Login />
        </DialogContent>
      </Dialog>
          </Box>
        </Toolbar>
      </Container>

    </AppBar>
  );
};

export default Navbar;
