import { IToDoItem } from '@/modules/to-do-list/types/ToDoItem';
import dayjs from 'dayjs';

import { Priority } from '../types/Priority';

export default class ToDoItem implements IToDoItem {
  completed: boolean;
  createdAt: Date;
  daysToComplete: number;
  description: string;
  id: string;
  priority: Priority;
  timeLeft: number;
  title: string;

  constructor(
    data: IToDoItem & {
      createdAt: Date;
      daysToComplete: number;
      id: string;
    },
  ) {
    this.completed = data.completed;
    this.createdAt = data.createdAt;
    this.description = data.description;
    this.id = data.id;
    this.daysToComplete =
      data.daysToComplete > 3650 ? 3650 : data.daysToComplete;

    this.timeLeft = Math.ceil(
      dayjs(data.createdAt)
        .add(this.daysToComplete, 'h')
        .diff(dayjs(), 'h') / 24,
    );

    this.title = data.title;
    if (this.completed) {
      this.priority = Priority.NONE;
    } else if (this.daysToComplete < 2) {
      this.priority = Priority.HIGH;
    } else if (this.daysToComplete < 7) {
      this.priority = Priority.MEDIUM;
    } else {
      this.priority = Priority.LOW;
    }
  }
}
