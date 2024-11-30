export enum Statuses {
  all = 'all',
  completed = 'completed',
  incomplete = 'incomplete',
}

export const StatusItems = {
  [Statuses.all]: {
    key: Statuses.all,
    value: 'Все задачи',
  },
  [Statuses.completed]: {
    key: Statuses.completed,
    value: 'Выполненные',
  },
  [Statuses.incomplete]: {
    key: Statuses.incomplete,
    value: 'Невыполненные',
  },
};
