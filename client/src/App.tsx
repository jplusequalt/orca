import { Box } from '@mui/material';
import React from 'react';
import { Main } from './components/Main';
import { Navbar } from './components/Navbar';
import { SideMenu } from './components/SideMenu';

export const App: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Main />
    </Box>
  );
}
