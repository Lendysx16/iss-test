import { generateUUID } from '@/utils/generate-uuid';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { parse, stringify } from 'zipson';

import ToDoItem from '../classes/ToDoItem';
import { IToDoItem } from '../types/ToDoItem';

export const useToDoListStore = defineStore(
  'to-do-list-store',
  () => {
    const items = ref<ToDoItem[]>([]);
    const completedItems = ref<ToDoItem[]>([]);

    const addItem = (item: IToDoItem) => {
      if (item.completed) {
        completedItems.value.push(
          new ToDoItem({
            ...item,
            createdAt: new Date(),
            daysToComplete: 0,
            id: generateUUID(),
          }),
        );
        return;
      }

      items.value.push(
        new ToDoItem({
          ...item,
          createdAt: new Date(),
          daysToComplete: Number(item.daysToComplete) || 0,
          id: generateUUID(),
        }),
      );
    };

    const getItemByID = (id: string) =>
      items.value.find((item) => item.id === id) ||
      completedItems.value.find((item) => item.id === id);

    const updateCompletedItem = (item: ToDoItem) => {
      const existingItem = completedItems.value.findIndex(
        (i) => i.id === item.id,
      );

      if (existingItem !== -1) {
        completedItems.value[existingItem] = new ToDoItem(item);
        return;
      }

      items.value = items.value.filter((i) => i.id !== item.id);
      completedItems.value.push(new ToDoItem(item));
    };

    const updateIncompleteItem = (item: ToDoItem) => {
      const existingItem = items.value.findIndex(
        (i) => i.id === item.id,
      );

      if (existingItem !== -1) {
        items.value[existingItem] = new ToDoItem(item);
        return;
      }

      completedItems.value = completedItems.value.filter(
        (i) => i.id !== item.id,
      );
      items.value.push(new ToDoItem(item));
    };

    const updateItem = (item: ToDoItem) => {
      if (item.completed) {
        updateCompletedItem(item);
        return;
      }

      updateIncompleteItem(item);
    };

    const deleteItem = (item: ToDoItem) => {
      if (item.completed) {
        completedItems.value = completedItems.value.filter(
          (i) => i.id !== item.id,
        );
        return;
      }

      items.value = items.value.filter((i) => i.id !== item.id);
    };

    const deleteBatchCompleted = (ids: string[]) => {
      completedItems.value = completedItems.value.filter(
        (i) => !ids.includes(i.id),
      );
    };

    const deleteBatchIncomplete = (ids: string[]) => {
      items.value = items.value.filter((i) => !ids.includes(i.id));
    };

    return {
      addItem,
      completedItems,
      deleteBatchCompleted,
      deleteBatchIncomplete,
      deleteItem,
      getItemByID,
      items,
      updateItem,
    };
  },
  {
    persist: {
      serializer: {
        deserialize: (value) => {
          const state = parse(value);
          if (Array.isArray(state.items))
            state.items = state.items.map(
              (item: ToDoItem) => new ToDoItem(item),
            );

          return state;
        },
        serialize: stringify,
      },
    },
  },
);
