import { TextareaAutosize, styled } from '@mui/material';
import { theme } from '../../../Theme';

export const TaskInput = styled(TextareaAutosize)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid #222631`,
  borderRadius: 4,
  fontSize: '1rem',
  fontFamily: 'Roboto',
  color: 'white',
  pt: 0,
  resize: 'none',
  '&:focus': {
    outline: 'none'
  },
  '&:hover': {
    borderColor: 'white'
  },
  padding: '1rem'
}));