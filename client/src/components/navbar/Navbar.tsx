import React, { useState } from 'react';
import { Nav, NavbarItem, LogoText, LogoIcon } from './Navbar.styled';
import { Avatar, Typography, Menu, MenuItem } from '@mui/material';
import { ReactComponent as Orca } from '../svg/orca.svg';

export const Navbar = () => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Nav>
      <NavbarItem>
        <LogoIcon>
          <Orca />
        </LogoIcon>
        <LogoText variant='h4'>orca</LogoText>
      </NavbarItem>
      <NavbarItem onClick={handleClick}>
        <Avatar 
          sx={{
            width: '1.75rem',
            height: '1.75rem',
          }}
        />
        <Typography variant='h6'>User</Typography>
      </NavbarItem>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
      </Menu>
    </Nav>
  );
}
