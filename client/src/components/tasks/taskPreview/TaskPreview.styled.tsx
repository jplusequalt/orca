import { styled, Avatar, Box } from '@mui/material';
import { theme } from '../../../Theme';

export const TaskCard = styled(Box)(({ theme }) => ({
  borderRadius: '8px', 
  backgroundColor: theme.palette.background.paper,
  width: '95%',
  padding: '1rem',
  height: 'auto',
  marginBottom: '0.5rem'
}));

export const AssigneeAvatarPreview = styled(Avatar)({
  width: '1rem',
  height: '1rem',
  '@media(max-width: 810px)': {
    width: '0.85rem',
    height: '0.85rem'
  }
})