import{ useState } from 'react';
import { Typography, Box } from '@mui/material';
import { AssigneeAvatarPreview, TaskCard } from '../styles/TaskPreview.styled';
import { TaskModal } from './TaskModal';
import { theme } from '../Theme';
import { Task } from '../model/Task';

type TaskPreviewProps = {
  contents: Task,
  users: string[]
}

export const TaskPreview: React.FC<TaskPreviewProps> = ({ contents, users }) => {

  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <TaskCard onClick={() => setOpen(true)}>
        <Typography sx={{ wordBreak: 'break-word' }} variant='body1'>{ contents.title }</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', mt: 1, width: '100%' }}>
          <Box>
            <Typography sx={{ color: theme.palette.text.secondary }} variant='subtitle2'>0 of 2</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Typography sx={{ color: theme.palette.text.secondary }} variant='subtitle2'>{ contents.tag }</Typography>
            <AssigneeAvatarPreview />
          </Box>
        </Box>
      </TaskCard>
      <TaskModal contents={contents} users={users} open={open} handleOpen={setOpen} />
    </>
  );
}
