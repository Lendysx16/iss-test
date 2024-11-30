<script setup lang="ts">
import { VButton, VSelect } from '@/modules/common/components';
import VTooltip from '@/modules/common/components/VTooltip.vue';
import EditItemModal from '@/modules/to-do-list/components/EditItemModal.vue';
import { useToDoListStore } from '@/modules/to-do-list/stores/toDoListStore';
import { routes } from '@/plugins/router';
import { useToast } from '@/plugins/toasts';
import { PxEdit } from 'oh-vue-icons/icons';
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import ToDoItem from '../classes/ToDoItem';
import ToDoSection from '../components/ToDoSection.vue';
import { Statuses, StatusItems } from '../types/FilterByStatus';

type Props = {
  create: boolean;
  idToEdit?: string;
  show?: (typeof StatusItems)['all'];
};

const props = withDefaults(defineProps<Props>(), {
  show: () => StatusItems[Statuses.all],
});

const router = useRouter();
const route = useRoute();

const toastEmmiter = useToast();

const toDoListStore = useToDoListStore();

const itemToEdit = ref<ToDoItem | undefined>(
  props.idToEdit
    ? toDoListStore.getItemByID(props.idToEdit)
    : undefined,
);

const itemsToDelete = ref<
  Record<'completed' | 'incomplete', string[]>
>({
  completed: [],
  incomplete: [],
});

const itemsToDeleteLength = computed(() => {
  return (
    itemsToDelete.value.completed.length +
    itemsToDelete.value.incomplete.length
  );
});

watch(
  () => props.idToEdit,
  (idToEdit) => {
    itemToEdit.value = idToEdit
      ? toDoListStore.getItemByID(idToEdit)
      : undefined;
  },
);

function handleDelete() {
  toDoListStore.deleteBatchCompleted(itemsToDelete.value.completed);
  toDoListStore.deleteBatchIncomplete(itemsToDelete.value.incomplete);

  toastEmmiter.success('Задачи удалены');

  itemsToDelete.value.completed = [];
  itemsToDelete.value.incomplete = [];
}

function navigateHome() {
  router.push({ path: routes.HOME.path, query: { ...route.query } });
}

function navigateToCreate() {
  router.push({
    path: routes.HOME_CREATE.path,
    query: { ...route.query },
  });
}
</script>

<template>
  <div>
    <h3
      class="flex cursor-pointer items-center gap-4 pb-5 pt-14 text-2xl font-bold underline md:text-4xl"
      @click="navigateToCreate"
    >
      Создать задачу
      <v-icon :name="PxEdit.name" class="size-4 md:size-6" />
    </h3>

    <div class="mb-2 flex max-w-[270px] flex-col gap-2">
      <span> Показывать только </span>
      <v-select
        :model-value="show"
        :items="Object.values(StatusItems)"
        key-prop="key"
        class="text-sm"
        value-prop="value"
        @change="$router.push({ query: { show: $event?.key } })"
      />

      <v-tooltip
        text="Выберите задачи на удаление"
        :show="itemsToDeleteLength === 0"
      >
        <template #default="{ listener }">
          <v-button
            :disabled="itemsToDeleteLength === 0"
            class="mb-2 text-sm"
            v-on="listener"
            @click="handleDelete"
          >
            Удалить задачи
          </v-button>
        </template>
      </v-tooltip>
    </div>

    <div class="flex flex-col items-end justify-start gap-20">
      <to-do-section
        v-model="itemsToDelete.incomplete"
        v-if="show.key !== 'completed'"
        type="incomplete"
      />

      <to-do-section
        v-model="itemsToDelete.completed"
        v-if="show.key !== 'incomplete'"
        type="completed"
      />
    </div>
  </div>

  <EditItemModal
    type="create"
    :is-dialog-open="create"
    @cancel="navigateHome"
    @create="
      (newItem) => {
        toDoListStore.addItem(newItem);
        navigateHome();
      }
    "
  />

  <EditItemModal
    v-if="itemToEdit"
    :item="itemToEdit"
    type="edit"
    :is-dialog-open="!!idToEdit"
    @delete="
      (itemToDelete) => {
        toDoListStore.deleteItem(itemToDelete);
        navigateHome();
      }
    "
    @edit="
      (editedItem) => {
        toDoListStore.updateItem(editedItem);
        navigateHome();
      }
    "
    @cancel="navigateHome"
  />
</template>
