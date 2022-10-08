import { styled, InputBase, Avatar, Box } from '@mui/material';

export const IconBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  }
});

export const TaskStatus = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: 'green',
    fontSize: 16,
    paddingLeft: '10px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
    },
    '&:hover': {
      filter: 'brightness(0.8)'
    }
  },
  '& .MuiSelect-icon': {
    fill: 'white'
  }
}));

export const Assignee = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    border: 'none',
    position: 'relative',
    backgroundColor: 'transparent',
    fontSize: '1rem',
    padding: '2px 10px 2px 10px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '1rem',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
    },
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.2)'
    }
  },
  '& .MuiSelect-icon': {
    display: 'none'
  }
}));

export const AssigneeAvatar = styled(Avatar)({
  width: '1.0rem',
  height: '1.0rem'
});