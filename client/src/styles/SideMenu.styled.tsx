import { Drawer, styled } from "@mui/material";
import { theme } from "../Theme";

export const BoardMenuList = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'drawerWidth' })<{
  drawerWidth: number
}>(({ drawerWidth, theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    height: '100vh',
    backgroundColor: theme.palette.background.paper
  }
}));