import { Box } from '@mui/material';
import React from 'react';
import { Main } from './components/Main';
import { Navbar } from './components/navbar/Navbar';
import { SideMenu } from './components/sidemenu/SideMenu';

export const App: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Main />
    </Box>
  );
}
