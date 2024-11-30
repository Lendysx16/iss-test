export interface IToDoItem {
  completed: boolean;
  createdAt?: Date;
  daysToComplete?: number;
  description: string;
  id?: string;
  timeLeft?: number;
  title: string;
}
