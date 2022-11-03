import React, { Dispatch, SetStateAction, FC } from 'react';
import { Modal, Box, Typography, Button, Autocomplete, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { theme } from '../../../Theme';
import { TaskInput } from '../../tasks/addTask/AddTask.styled';
import { AssigneeAvatar } from '../../tasks/taskModal/TaskModal.styled';

type AddBoardProps = {
  open: boolean,
  handleOpen: Dispatch<SetStateAction<boolean>>,
  users: string[]
}

interface BoardInput {
  boardName: string;
  tag: string;
  users: string[];
}

export const AddBoard: FC<AddBoardProps> = ({ open, handleOpen, users }) => {

  const { register, handleSubmit } = useForm<BoardInput>();

  const onSubmit: SubmitHandler<BoardInput> = (data: any) => {
    console.log(data);

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
          <Typography>New board</Typography>
          <Box
            component='form'
            sx={{
              '& > :not(style)': { mt: 3, width: '100%' },
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography variant='h6' sx={{ fontSize: '0.9rem', color: theme.palette.text.secondary, margin: 0 }} marginBottom={0}>Board name</Typography>
            <TaskInput {...register("boardName", { required: true, minLength: 2, maxLength: 64 })} />
            <Typography variant='h6' sx={{ fontSize: '0.9rem', color: theme.palette.text.secondary, margin: 0 }} marginBottom={0}>Board tag</Typography>
            <TaskInput {...register("tag", { required: true, minLength: 3, maxLength: 6 })} />
            <Autocomplete
              multiple
              id="tags-outlined"
              options={users}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Users"
                  placeholder="Favorites"
                />
              )}
            />
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
    </Modal>
  );
}
