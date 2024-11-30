<script setup lang="ts">
import { VCheckBox } from '@/modules/common/components';
import ToDoItem from '@/modules/to-do-list/classes/ToDoItem';

import { PriorityItems } from '../types/Priority';

type Emits = {
  (event: 'select'): void;
};

type Props = {
  isSelected?: boolean;
  item: ToDoItem;
};

defineEmits<Emits>();
defineProps<Props>();
</script>

<template>
  <div
    class="relative w-64 cursor-pointer select-none rounded-md border border-border p-5 md:w-80"
    @dblclick="
      $router.push({
        name: $routes.HOME_EDIT.name,
        params: { id: item.id },
        query: { ...$route.query },
      })
    "
    :style="{
      'background-color': PriorityItems[item.priority].color,
    }"
  >
    <div class="mb-4 flex flex-col items-start gap-2">
      <h3 class="w-full text-clip hyphens-auto text-2xl">
        {{ item.title }}
      </h3>

      <p class="">{{ item.description }}</p>
    </div>

    <div
      class="absolute bottom-0 right-0 p-4"
      @click.stop
      @dblclick.stop
    >
      <v-check-box
        :model-value="isSelected"
        @change="$emit('select')"
      />
    </div>

    <span class="text-sm" v-if="!item.completed">
      Осталось дней: {{ item.daysToComplete }}
    </span>

    <span class="text-sm text-green-500" v-else> Завершено </span>
  </div>
</template>
