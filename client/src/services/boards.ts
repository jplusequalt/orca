import axios from "axios";

const baseURL = 'http://localhost:8080';

export const getBoards = async () => {
  const req = axios.get(`${baseURL}/api/boards`);
  const res = await req;
  return res.data;
}

export const getColumns = async (boardTag: string) => {
  const req = axios.get(`${baseURL}/api/board/${boardTag}`);
  const res = await req;
  return res.data;
}