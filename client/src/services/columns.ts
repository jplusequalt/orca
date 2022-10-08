import axios from 'axios';
import { Task } from '../model/Task';

const baseURL = 'http://localhost:8080';

export const getColumns = async () => {
  const req = axios.get(`${baseURL}/api/columns`);
  const res = await req;
  return res.data;
}

export const updateTask = async (task: Task) => {
  const req = axios.put(`${baseURL}/api/tasks/${task.id}`, task);
  const res = await req;
  return res.status;
}

export const addTask = async (task: Task) => {
  const req = axios.post(`${baseURL}/api/tasks`, task);
  const res = await req;
  return res.status;
}