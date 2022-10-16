import { Dispatch, SetStateAction, useState, ChangeEvent } from 'react';
import { Modal, Box, Select, Button, Typography, MenuItem, SelectChangeEvent } from '@mui/material';
import { theme } from '../../../Theme';
import { TaskInput } from './AddTask.styled';
import { Assignee, AssigneeAvatar, TaskStatus } from '../taskModal/TaskModal.styled';
import { Task } from '../../../model/Task';
import { addTask } from '../../../services/columns';
import { SubmitHandler, useForm } from 'react-hook-form';

type AddTaskProps = {
  open: boolean,
  users: string[],
  boardTag: string,
  handleOpen: Dispatch<SetStateAction<boolean>>,
  handleNewTask: (newTask: Task) => void
}

interface FormInput {
  title: string;
  description: string;
  status: string;
  assignee: string[]
}

export const AddTask: React.FC<AddTaskProps> = ({ open, users, boardTag, handleOpen, handleNewTask }) => {

  const { register, handleSubmit } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = (data: any) => {
    console.log(data);
    
    let newTask = new Task(boardTag, data.title, data.description, '123', data.status, data.assignee);
    addTask(newTask)
      .then(res => {
        console.log(res)
        handleNewTask(newTask);
        handleOpen(false);
      });
  }

  return (
    <Modal open={open}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '75%',
          height: '75%',
          bgcolor: 'background.paper',
          borderRadius: '8px',
          boxShadow: 24,
          p: 4,
          display: 'block'
        }}>
          <Typography>New task</Typography>
          <Box
            component='form'
            sx={{
              '& > :not(style)': { mt: 3, width: '100%' },
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography variant='h6' sx={{ fontSize: '0.9rem', color: theme.palette.text.secondary, margin: 0 }} marginBottom={0}>Title</Typography>
            <TaskInput {...register("title", { required: true, minLength: 2, maxLength: 250 })} />
            <Typography variant='h6' sx={{ fontSize: '0.9rem', color: theme.palette.text.secondary, margin: 0 }} marginBottom={0}>Description</Typography>
            <TaskInput {...register("description", { required: true, min: 5, max: 10, maxLength: 4000 })} />
            <Box sx={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
              <Box>
                <Select
                  displayEmpty
                  autoWidth
                  input={<TaskStatus />}
                  inputProps={{ 'aria-label': 'Without label' }}
                  defaultValue={'Todo'}
                  {...register("status")}
                  >
                  <MenuItem value='Todo'>Todo</MenuItem>
                  <MenuItem value='In Progress'>In Progress</MenuItem>
                  <MenuItem value='Completed'>Completed</MenuItem>
                  <MenuItem value='Blocked'>Blocked</MenuItem>
                  <MenuItem value='Backlog'>Backlog</MenuItem>
                </Select>
              </Box>
              <Box sx={{ display: 'flex', gap: '1rem' }}>
                Assignee
                <Select
                  displayEmpty
                  autoWidth
                  input={<Assignee />}
                  inputProps={{ 'aria-label': 'Without label' }}
                  {...register("assignee")}
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
              </Box>
            </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', mt: 3 }}>
            <Button 
              variant='text' 
              sx={{ 
                color: theme.palette.text.primary 
              }}
              onClick={() => handleOpen(false)}
              >
              Cancel
            </Button>
            <Button 
              variant='contained' 
              sx={{
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.secondary,
                fontVariant: ''
              }}
              type="submit"
              >
              Create
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
