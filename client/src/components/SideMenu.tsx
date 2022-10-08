import { Box } from '@mui/material';
import { theme } from '../Theme';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { BoardMenuList } from '../styles/SideMenu.styled';

const drawerWidth = 200;

type SideMenuProps = {
  visible: boolean
}

export const SideMenu: React.FC<SideMenuProps> = ({ visible }) => {

  return (
    <BoardMenuList
      drawerWidth={drawerWidth}
      variant="persistent"
      anchor="left"
      open={visible}
    >
      <Box sx={{ height: '5.5rem' }} />
      <List>
        {['Board 1', 'Board 2', 'Board 3'].map(board => 
          <ListItem key={board} 
            sx={{
              '&:hover': {
                  backgroundColor: '#232c3a'
                }
            }}>
            <ListItemButton
              sx={{
                '&:hover': {
                  backgroundColor: 'transparent'
                }
              }}>
              <ListItemIcon 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem'
                  }} >
                <ViewColumnIcon sx={{ fill: theme.palette.text.primary }} />
                <ListItemText primary={board} sx={{ color: theme.palette.text.primary }} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </BoardMenuList>
  );
}
