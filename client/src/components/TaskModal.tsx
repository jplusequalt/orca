import React, { Dispatch, SetStateAction, useState } from 'react';
import { Box, Modal, Typography, FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareIcon from '@mui/icons-material/Share';
import ClearIcon from '@mui/icons-material/Clear';
import { Assignee, AssigneeAvatar, IconBox, TaskStatus } from '../styles/TaskModal.styled';
import { theme } from '../Theme';
import { Task } from '../model/Task';
import { useTasks } from '../hooks/useTasks';

type TaskModalProps = {
  contents: Task,
  open: boolean,
  handleOpen: Dispatch<SetStateAction<boolean>>
}

export const TaskModal: React.FC<TaskModalProps> = ({ contents, open, handleOpen }) => {

  const { tasks, setTasks } = useTasks();
  const [taskStatus, setTaskStatus] = useState<string>(contents.status);
  const [assignee, setAssignee] = useState<string>(contents.assignee);

  const handleTaskChange = (event: SelectChangeEvent) => {
    setTaskStatus(event.target.value);

    let temp = new Task(
      contents.title, 
      contents.description, 
      contents.tag, 
      event.target.value, 
      contents.assignee
    );

    setTasks(tasks.filter((task: Task) => task.tag !== contents.tag).concat(temp));
  }

  const handleAssigneeChange = (event: SelectChangeEvent) => {
    setAssignee(event.target.value);

    let temp = new Task(
      contents.title, 
      contents.description, 
      contents.tag, 
      contents.status,
      event.target.value 
    );

    setTasks(tasks.filter((task: Task) => task.tag !== contents.tag).concat(temp));
  }

  return (
    <Modal open={open} onClose={() => handleOpen(false)}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '40%',
          height: '50%',
          bgcolor: 'background.paper',
          borderRadius: '8px',
          boxShadow: 24,
          p: 4,
          display: 'block',
          '@media (max-width: 1200px)': {
            width: '70%'
          }
        }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography sx={{ color: theme.palette.text.secondary }}>Tag</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: '1rem' }}>
              <IconBox>
                <VisibilityIcon />
              </IconBox>
              <IconBox>
                <ShareIcon />
              </IconBox>
              <IconBox>
                <ClearIcon onClick={() => handleOpen(false)} />
              </IconBox>
            </Box>
          </Box>
          <Box>
            <Box sx={{ wordBreak: 'break-word' }}>
              <Typography variant='h5' sx={{ mt: 2, mb: 2 }}>
                { contents.title }
              </Typography>
              <Box sx={{ display: 'flex', gap: '1rem' }}>
                <FormControl sx={{ minWidth: 80, mb: 2 }}>
                  <Select
                    value={taskStatus}
                    onChange={handleTaskChange}
                    displayEmpty
                    autoWidth
                    input={<TaskStatus />}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value='Todo'>Todo</MenuItem>
                    <MenuItem value='In Progress'>In Progress</MenuItem>
                    <MenuItem value='Completed'>Completed</MenuItem>
                    <MenuItem value='Blocked'>Blocked</MenuItem>
                    <MenuItem value='Backlog'>Backlog</MenuItem>
                  </Select>
                </FormControl>
                <Typography sx={{ color: theme.palette.text.secondary }}>Assignee</Typography>
                <FormControl sx={{ minWidth: 100, mb: 2 }}>
                  <Select
                    value={assignee}
                    onChange={handleAssigneeChange}
                    displayEmpty
                    autoWidth
                    input={<Assignee />}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value='Person 1' sx={{ display: 'flex', gap: '1rem' }}>
                      <AssigneeAvatar />
                      Person 1
                    </MenuItem>
                    <MenuItem value='Person 2' sx={{ display: 'flex', gap: '1rem'}}>
                      <AssigneeAvatar />
                      Person 2
                    </MenuItem>
                    <MenuItem value='Person 3' sx={{ display: 'flex', gap: '1rem'}}>
                     <AssigneeAvatar />
                      Person 3
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Typography variant='subtitle1' sx={{ color: theme.palette.text.secondary }}>Description</Typography>
              <Typography variant='body1'>
                { contents.description }
              </Typography>
            </Box>
          </Box>
      </Box>
    </Modal>
  );
}
