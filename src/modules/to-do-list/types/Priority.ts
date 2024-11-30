export enum Priority {
  HIGH = 4,
  LOW = 3,
  MEDIUM = 2,
  NONE = 1,
}

export const PriorityItems = {
  [Priority.HIGH]: {
    color: 'var(--color-high-priority)',
    label: 'высокий приоритет',
  },
  [Priority.LOW]: {
    color: 'var(--color-low-priority)',
    label: 'низкий приоритет',
  },
  [Priority.MEDIUM]: {
    color: 'var(--color-medium-priority)',
    label: 'средний приоритет',
  },
  [Priority.NONE]: {
    color: 'var(--color-no-priority)',
    label: 'без приоритета',
  },
};
