import { useState } from 'react';
import { Box, Divider } from '@mui/material';
import { theme } from '../../Theme';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { BoardMenuList } from './SideMenu.styled';
import AddBoxSharp from '@mui/icons-material/AddBoxSharp';
import { AddBoard } from '../board/addBoard/AddBoard';
import { BoardModel } from '../../model/BoardModel';

const drawerWidth = 200;

type SideMenuProps = {
  visible: boolean,
  boards: string[],
  selected: string,
  handleNewBoard: (board: BoardModel) => void, 
  handleSelect: (name: string) => void
}

export const SideMenu: React.FC<SideMenuProps> = ({ visible, boards, selected, handleSelect, handleNewBoard }) => {
  
  const [newBoard, setNewBoard] = useState<boolean>(false);

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
              '&:hover': {
                filter: selected === board ? 'brightness(1.1)' : 'none'
              },
              borderRadius: '50px', 
              marginLeft: '-20px', 
              width: '105%' 
            }}>
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
        <Divider sx={{ backgroundColor: theme.palette.text.primary, marginBottom: '1rem', marginTop: '1rem' }} />
        <ListItem
          sx={{
            '&:hover': {
              backgroundColor: '#232c3a'
            },
            padding: 0
            
         }}>
          <Box sx={{ 
              backgroundColor: 'transparent',
              '&:hover': {
                filter: 'none'
              },
              borderRadius: '50px', 
              marginLeft: '-20px', 
              width: '105%' 
            }}>
            <ListItemButton
              sx={{
                '&:hover': {
                  backgroundColor: 'transparent'
                }
              }}
              onClick={() => setNewBoard(true)}
              >
              <ListItemIcon
                sx={{
                    paddingLeft: '20px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem'
                    }} >
                <AddBoxSharp sx={{ fill: theme.palette.text.primary }}/>
                <ListItemText primary={'Add new board'} sx={{ color: theme.palette.text.primary }} />
              </ListItemIcon>
            </ListItemButton>
          </Box>
        </ListItem>
      </List>
      { <AddBoard handleOpen={setNewBoard} open={newBoard} users={['JT', 'Lily', 'Patrick']} handleNewBoard={handleNewBoard} /> }
    </BoardMenuList>
  );
}
