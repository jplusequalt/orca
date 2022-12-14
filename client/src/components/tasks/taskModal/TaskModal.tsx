import React, { Dispatch, SetStateAction, useState } from 'react';
import { Box, Stack, Modal, Typography, FormControl, Select, MenuItem, SelectChangeEvent, Dialog, Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ClearIcon from '@mui/icons-material/Clear';
import { Assignee, AssigneeAvatar, IconBox, TaskStatus } from './TaskModal.styled';
import { theme } from '../../../Theme';
import { Task } from '../../../model/Task';
import { useTasks } from '../../../hooks/useTasks';
import { removeTask, updateTask } from '../../../services/columns';

type TaskModalProps = {
  contents: Task,
  open: boolean,
  users: string[],
  handleOpen: Dispatch<SetStateAction<boolean>>
}

type DeleteDialogProps = {
  open: boolean,
  handleClose: () => void,
  handleDelete: () => void
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, handleClose, handleDelete }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <Box sx={{ p: '1rem', display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <Typography>Are you sure you wish to delete this task?</Typography>
        <Stack direction={'row'} spacing={3} justifyContent={'center'}>
          <Button variant='contained' onClick={handleDelete}>Delete</Button>
          <Button variant='contained' onClick={handleClose}>Cancel</Button>
        </Stack>
      </Box>
    </Dialog>
  )
}

export const TaskModal: React.FC<TaskModalProps> = ({ contents, open, users, handleOpen }) => {

  const { tasks, setTasks } = useTasks();
  const [taskStatus, setTaskStatus] = useState<string>(contents.status);
  const [assignee, setAssignee] = useState<string>(contents.assignee);
  const [dialog, setDialog] = useState<boolean>(false);

  const handleTaskChange = (event: SelectChangeEvent) => {
    setTaskStatus(event.target.value);

    let temp = {
      ...contents,
      status: event.target.value
    } as Task;
      
    updateTask(temp)
      .then(res => console.log(res));

    setTasks(tasks.filter((task: Task) => task.tag !== contents.tag).concat(temp));
  }

  const handleAssigneeChange = (event: SelectChangeEvent) => {
    setAssignee(event.target.value);

    let temp = {
      ...contents,
      assignee: event.target.value
    } as Task;

    updateTask(temp)
      .then(res => console.log(res));

    setTasks(tasks.filter((task: Task) => task.tag !== contents.tag).concat(temp));
  }

  const handleCloseDialog = () => {
    setDialog(false);
  }

  const handelDeleteTask = () => {
    removeTask(contents.id)
      .then(() => {
        setDialog(false);
        handleOpen(false);
        setTasks(tasks.filter(task => task.id !== contents.id));
      });
  }

  return (
    <>
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
                  <DeleteOutlineIcon onClick={() => setDialog(true)} />
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
                    <MenuItem value="">
                      <em>Unassigned</em>
                    </MenuItem>
                    {users.map(user => 
                      <MenuItem key={user} value={user} sx={{ display: 'flex', gap: '1rem' }}>
                        <AssigneeAvatar />
                        {user}
                      </MenuItem>
                    )}
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
      <DeleteDialog open={dialog} handleClose={handleCloseDialog} handleDelete={handelDeleteTask} />
    </>
  );
}
