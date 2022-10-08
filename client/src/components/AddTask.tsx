import { Dispatch, SetStateAction, useState, ChangeEvent } from 'react';
import { Modal, Box, Select, Button, Typography, MenuItem, SelectChangeEvent } from '@mui/material';
import { theme } from '../Theme';
import { TaskInput } from '../styles/AddTask.styled';
import { Assignee, AssigneeAvatar, TaskStatus } from '../styles/TaskModal.styled';
import { Task } from '../model/Task';
import { addTask } from '../services/columns';

type AddTaskProps = {
  open: boolean,
  handleOpen: Dispatch<SetStateAction<boolean>>,
  handleNewTask: (newTask: Task) => void
}

export const AddTask: React.FC<AddTaskProps> = ({ open, handleOpen, handleNewTask }) => {

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [taskStatus, setTaskStatus] = useState<string>('Backlog');
  const [assignee, setAssignee] = useState<string>('Person 1');

  const handleTitleChange = (event: ChangeEvent<HTMLTextAreaElement>) => setTitle(event.target.value);

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => setDescription(event.target.value);

  const handleTaskChange = (event: SelectChangeEvent) => {
    setTaskStatus(event.target.value);
  }

  const handleAssigneeChange = (event: SelectChangeEvent) => {
    setAssignee(event.target.value);
  }

  const handleSubmit = (event: any) => {
    let newTask = new Task(title, description, '123', taskStatus, assignee);
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
            noValidate
            autoComplete="off"
          >
            <TaskInput maxRows={2} maxLength={250} value={title} onChange={handleTitleChange} />
            <Typography variant='h6' sx={{ fontSize: '0.9rem', color: theme.palette.text.secondary, margin: 0 }} marginBottom={0}>Description</Typography>
            <TaskInput minRows={5} maxRows={10} maxLength={4000} value={description} onChange={handleDescriptionChange} />
            <Box sx={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
              <Box>
                <Select
                  value={taskStatus}
                  onChange={handleTaskChange}
                  displayEmpty
                  autoWidth
                  input={<TaskStatus />}
                  inputProps={{ 'aria-label': 'Without label' }}
                  defaultValue={taskStatus}
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
              </Box>
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
              onClick={handleSubmit}
              >
              Create
            </Button>
          </Box>
      </Box>
    </Modal>
  );
}
