import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import ollirLogo from './ollir-organics.jpg'; // Import the image

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  { text: 'Home', href: '#Handmade' },
];

const DrawerAppBar: React.FC<Props> = (props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              sx={{
                textAlign: 'center',
                color: '#81C408',
                '&:hover': {
                  backgroundColor: '#FFB524',
                  color: '#fff',
                },
              }}
            >
              <ListItemText primary={<a href={item.href} style={{ textDecoration: 'none', color: '#81C408' }}>{item.text}</a>} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" style={{ backgroundColor: 'White' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={ollirLogo} alt="Logo" style={{ height: 40 }} /> {/* Use the imported image */}
            
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                component="a"
                href={item.href}
                sx={{
                  color: '#81C408',
                  '&:hover': {
                    color: '#FFB524',
                    backgroundColor: 'transparent',
                  },
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
          <Button
            component="a"
            href="#Handmade"
            sx={{
              color: '#81C408',
              display: { xs: 'block', sm: 'none' },
              '&:hover': {
                color: '#FFB524',
                backgroundColor: 'transparent',
              },
            }}
          >
            Home
          </Button>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default DrawerAppBar;
