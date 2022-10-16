import { Box } from '@mui/material';
import { theme } from '../../Theme';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { BoardMenuList } from './SideMenu.styled';

const drawerWidth = 200;

type SideMenuProps = {
  visible: boolean,
  boards: string[],
  handleSelect: (name: string) => void
}

export const SideMenu: React.FC<SideMenuProps> = ({ visible, boards, handleSelect }) => {

  return (
    <BoardMenuList
      drawerWidth={drawerWidth}
      variant="persistent"
      anchor="left"
      open={visible}
    >
      <Box sx={{ height: '5.5rem' }} />
      <List>
        {boards.map(board => 
          <ListItem key={board} 
            sx={{
              '&:hover': {
                  backgroundColor: '#232c3a'
                }
            }}
            onClick={() => handleSelect(board)}
            >
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
