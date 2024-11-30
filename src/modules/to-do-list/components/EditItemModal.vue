<script setup lang="ts">
import {
  VButton,
  VDialog,
  VInput,
  VSlider,
  VTooltip,
} from '@/modules/common/components';
import { useToast } from '@/plugins/toasts';
import cloneDeep from 'lodash-es/cloneDeep';
import { ref, toRaw } from 'vue';

import ToDoItem from '../classes/ToDoItem';
import { IToDoItem } from '../types/ToDoItem';

type Emits = {
  (event: 'cancel'): void;
  (event: 'create', item: IToDoItem): void;
  (event: 'delete', item: ToDoItem): void;
  (event: 'edit', item: ToDoItem): void;
};

type Props = { isDialogOpen: boolean } & (
  | { item: ToDoItem; type: 'edit' }
  | { type: 'create' }
);

const toastEmmiter = useToast();

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const itemToEdit = ref<IToDoItem>(
  props.type === 'create'
    ? {
        completed: false,
        daysToComplete: undefined,
        description: '',
        title: '',
      }
    : cloneDeep(toRaw(props.item)),
);

function cancel(deleteItem: boolean = false) {
  emits('cancel');

  if (deleteItem && props.type === 'edit') {
    return;
  }

  if (deleteItem && props.type === 'create') {
    itemToEdit.value = {
      completed: false,
      createdAt: new Date(),
      daysToComplete: undefined,
      description: '',
      title: '',
    };
  }
}

function deleteItem() {
  if (props.type === 'edit') {
    emits('delete', props.item);
    toastEmmiter.error(`ToDo '${props.item.title}' удален(`);
  }
}

function handleSubmit() {
  if (props.type === 'create') {
    emits('create', itemToEdit.value);

    itemToEdit.value = {
      completed: false,
      daysToComplete: undefined,
      description: '',
      title: '',
    };
    toastEmmiter.success('ToDo успешно создан');
  } else {
    emits('edit', itemToEdit.value as ToDoItem);
    toastEmmiter.success('ToDo успешно отредактирован');
  }
}
</script>

<template>
  <v-dialog :open="isDialogOpen" @update:open="cancel(false)">
    <form
      class="flex h-full flex-col justify-between gap-y-10 scroll-smooth"
      @submit.prevent="handleSubmit"
    >
      <div
        class="flex max-h-[calc(90svh-250px)] flex-col gap-y-4 overflow-y-auto md:max-h-[calc(70svh-150px)]"
      >
        <h2 class="text-center text-2xl font-bold">
          <span v-if="type === 'create'"> Создание todo</span>
          <span v-else
            >Редактирование todo с id: {{ itemToEdit.id || 0 }}</span
          >
        </h2>
        <v-input
          v-model="itemToEdit.title"
          label="Title"
          placeholder="Краткое название"
          required
        />

        <v-input
          v-model="itemToEdit.description"
          label="Description"
          placeholder="Что нужно сделать"
          required
        />

        <v-input
          v-if="type === 'create' && !itemToEdit.completed"
          v-model.number="itemToEdit.daysToComplete"
          label="Description"
          placeholder="Сколько дней до дедлайна"
          required
          min="0"
          max="3650"
          type="number"
        />

        <v-tooltip
          placement="top"
          text="Дедлайн нельзя редактировать после создания"
        >
          <template #default="{ listener, attrs }">
            <div v-on="listener" v-bind="attrs" class="w-full">
              <v-input
                v-if="type === 'edit'"
                v-model.number="itemToEdit.daysToComplete"
                class="w-full"
                label="Description"
                placeholder="Сколько дней до дедлайна"
                disabled
                type="number"
              />
            </div>
          </template>
        </v-tooltip>

        <div class="flex flex-col items-start gap-2">
          <label class="select-none" for="completed">
            <span v-if="!itemToEdit.completed" class="text-red-500">
              Не завершено</span
            >
            <span v-else class="text-green-500"> Завершено</span>
          </label>
          <v-slider id="completed" v-model="itemToEdit.completed" />
        </div>
      </div>
      <div
        class="grid w-full grid-rows-2 gap-2 md:grid-cols-2 md:justify-between"
      >
        <v-button
          v-if="type === 'edit'"
          type="button"
          @click="deleteItem"
          class="w-full border-red-500 !text-red-500 hover:bg-red-100 dark:!text-red-100 dark:hover:bg-red-500 md:w-fit md:place-self-start"
        >
          Удалить
        </v-button>
        <div class="flex gap-5 md:col-start-2 md:justify-end">
          <v-button type="submit" class="w-full">
            <span v-if="type === 'create'"> Создать </span>
            <span v-else> Сохранить </span>
          </v-button>
          <v-button
            type="button"
            @click="cancel(true)"
            class="w-full"
          >
            Отмена
          </v-button>
        </div>
      </div>
    </form>
  </v-dialog>
</template>
