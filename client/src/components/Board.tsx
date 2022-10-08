import { KanbanBoard, KanbanColumn, KanbanHeader, KanbanRowHeader, KanbanWrapper, ToggleSideMenu, ToggleSideMenuIcon } from '../styles/Board.styled';
import React, { SetStateAction, Dispatch, useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { Box, Grid, Typography, Fab, Popover } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import AddIcon from '@mui/icons-material/Add';
import { theme } from '../Theme';
import { TaskPreview } from './TaskPreview';
import { AddTask } from './AddTask';
import { Task } from '../model/Task';
import { useTasks } from '../hooks/useTasks';
import { v4 as uuid } from 'uuid';
import { getColumns, updateTask } from '../services/columns';

export type BoardProps = {
  sideMenuToggle: Dispatch<SetStateAction<boolean>>,
  sideMenuOpen: boolean
}

type ColumnsType = {
  [key: string]: Task[]
}

export const Board: React.FC<BoardProps> = ({ sideMenuToggle, sideMenuOpen }) => {
  
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [newTask, setNewTask] = useState<boolean>(false);
  const open = Boolean(anchorEl);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const { tasks, setTasks } = useTasks();

  const displayTasks = (items: Task[]) => {
    return items.map((task, index) => {
      return <Draggable key={task.id} draggableId={task.id} index={index}>
        {(provided) => {
          return <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <TaskPreview contents={task} />
          </Box>
        }}
      </Draggable>
    });
  }
  
  const handleNewTask = (newTask: Task) => {
    setTasks(tasks.concat(newTask));
  }

  const [columns, setColumns] = useState<ColumnsType>({});

  useEffect(() => {
    getColumns()
      .then(data => {
        setColumns(data);
      });
  }, []);

  useEffect(() => {
    getColumns()
      .then(data => {
        setColumns(data);
      });
  }, [tasks])
  
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const { source, destination } = result;
    
    
    if (source.droppableId !== destination.droppableId) {
      const sourceItems = columns[source.droppableId];
      const destItems = columns[destination.droppableId];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      let updatedTask = {
        ...removed,
        status: destination.droppableId
      } as Task;

      updateTask(updatedTask)
        .then(res => console.log(res));

      setColumns({
        ...columns,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destItems
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = column;
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: copiedItems
      });
    }
  }
  
  return (
    <Box 
      sx={{ 
        width: '100%', 
        display: 'flex'
      }}>
      <KanbanWrapper open={sideMenuOpen}>
        <ToggleSideMenu
          onClick={() => { sideMenuToggle(!sideMenuOpen) }}
          open={sideMenuOpen}
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          >
          <ToggleSideMenuIcon open={sideMenuOpen} />
          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: 'none',
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography sx={{ p: 1 }}>{ sideMenuOpen ? 'Hide' : 'Expand' }</Typography>
          </Popover>
        </ToggleSideMenu>
        <Box>
          <KanbanHeader>
            <Typography variant='h4'>Board name</Typography>
            <Fab 
              variant='extended' 
              sx={{
                backgroundColor: theme.palette.background.paper,
                '&:hover': {
                  backgroundColor: '#848daf',
                },
                color: 'white'
              }}
              onClick={() => setNewTask(true)}
              >
              <AddIcon />
              Add Task
            </Fab>
          </KanbanHeader>
        </Box>
        <KanbanBoard>
        <DragDropContext onDragEnd={result => handleDragEnd(result)}>
          {Object.entries(columns).map(([name, items]) => {
            if (name !== 'Backlog')
              return <KanbanColumn key={name}>
                <Box>
                  <KanbanRowHeader>
                    <CircleIcon sx={{ fill: '#3ecffc', width: '1rem' }} />
                    { name }
                  </KanbanRowHeader>
                </Box>
                <Droppable droppableId={name} key={name}>
                  {(provided) => {
                    return <Box
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    sx={{ height: '60rem', width: '100%' }} 
                    >
                      { displayTasks(items) }
                      { provided.placeholder }
                    </Box>
                  }}
                </Droppable>
              </KanbanColumn>
          })}
        </DragDropContext>
        </KanbanBoard>
      </KanbanWrapper>
      { newTask && <AddTask open={newTask} handleOpen={setNewTask} handleNewTask={handleNewTask} /> }
    </Box>
  );
}
