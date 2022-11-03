import axios from "axios";
import { BoardModel } from "../model/BoardModel";

const baseURL = 'http://localhost:8080';

export const getBoards = async () => {
  const req = axios.get(`${baseURL}/api/boards`);
  const res = await req;
  return res.data;
}

export const getColumns = async (boardTag: string) => {
  const req = axios.get(`${baseURL}/api/boards/${boardTag}`);
  const res = await req;
  return res.data;
}

export const newBoard = async (board: BoardModel) => {
  const req = axios.post(`${baseURL}/api/boards`, board);
  const res = await req;
  return res.data;
}