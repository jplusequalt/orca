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
  selected: string,
  handleSelect: (name: string) => void
}

export const SideMenu: React.FC<SideMenuProps> = ({ visible, boards, selected, handleSelect }) => {

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
                backgroundColor: selected !== board ? '#232c3a' : theme.palette.background.paper
              },
              paddingLeft: 0
            }}
            onClick={() => handleSelect(board)}
            >
            <Box sx={{ 
              backgroundColor: selected === board ? '#701b92' : 'transparent', 
              borderRadius: '50px', 
              marginLeft: '-20px', 
              width: '105%' }}>
              <ListItemButton
                disableRipple
                sx={{
                  '&:hover': {
                    backgroundColor: 'transparent'
                  }
                }}>
                <ListItemIcon 
                  sx={{
                    paddingLeft: '20px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem'
                    }} >
                  <ViewColumnIcon sx={{ fill: theme.palette.text.primary }} />
                  <ListItemText primary={board} sx={{ color: theme.palette.text.primary }} />
                </ListItemIcon>
              </ListItemButton>
            </Box>
          </ListItem>
        )}
      </List>
    </BoardMenuList>
  );
}
