import React, { createContext, Dispatch, SetStateAction, useState } from 'react';
import { Task } from '../model/Task';

export type TaskContextContent = {
  tasks: Task[],
  setTasks: Dispatch<SetStateAction<Task[]>>
}

export const TaskContext = createContext<TaskContextContent>({
  tasks: [] as Task[],
  setTasks: () => {}
});

type TaskProviderProps = {
  children: JSX.Element
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>{ children }</TaskContext.Provider>
  );
}