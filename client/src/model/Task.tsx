import { v4 as uuidv4 } from 'uuid';

export class Task {
  board: string;
  title: string;
  description: string;
  tag: string;
  assignee: string;
  status: string;
  id: string;

  constructor(board: string, title: string, description: string, tag: string, status: string, assignee: string) {
    this.board = board;
    this.title = title;
    this.description = description;
    this.tag = tag;
    this.status = status;
    this.assignee = assignee;
    this.id = uuidv4();
  }
}