import { ReactElement } from 'react';

export class BoardModel {
  name: string;
  element: ReactElement;

  constructor(name: string, element: ReactElement) {
    this.name = name;
    this.element = element;
  }
}