import { AppBar, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../Theme";

export const Nav = styled(AppBar)(({ theme }) => ({
  position: 'fixed',
  padding: '1.25rem',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  zIndex: theme.zIndex.drawer + 2,
  [theme.breakpoints.down("sm")]: {
    padding: '1rem'
  }
}));

export const NavbarItem = styled(Box)({
  display: 'flex', 
  flexDirection: 'row',
  alignItems: 'center', 
  gap: '1rem' 
});

export const LogoIcon = styled('svg')(({ theme }) => ({
  height: '1.75rem',
  width: '1.75rem',
  fill: theme.palette.primary.light,
  [theme.breakpoints.down("sm")]: {
    height: '1.5rem',
    width: '1.5rem',
  }
}));

export const LogoText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    fontSize: '1.5rem'
  }
}));