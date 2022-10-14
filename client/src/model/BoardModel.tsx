import { ReactElement } from 'react';

export class BoardModel {
  name: string;
  tag: string;
  users: string[];

  constructor(name: string, tag: string, users: string[]) {
    this.name = name;
    this.tag = tag;
    this.users = users;
  }
}