import { v4 as uuidv4 } from 'uuid';

export class Task {
  title: string;
  description: string;
  tag: string;
  assignee: string;
  status: string;
  id: string;

  constructor(title: string, description: string, tag: string, status: string, assignee: string) {
    this.title = title;
    this.description = description;
    this.tag = tag;
    this.status = status;
    this.assignee = assignee;
    this.id = uuidv4();
  }
}