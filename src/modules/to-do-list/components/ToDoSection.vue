<script setup lang="ts">
import { computed, ref } from 'vue';

import { useToDoListStore } from '../stores/toDoListStore';
import ToDoCard from './ToDoCard.vue';

type Props = {
  type: 'completed' | 'incomplete';
};

const props = defineProps<Props>();

const modelValue = defineModel<string[]>('modelValue', {
  default: () => [],
});

const toDoListStore = useToDoListStore();
const scrollContainer = ref<HTMLElement | null>(null);

const items = computed(() =>
  props.type === 'completed'
    ? toDoListStore.completedItems
    : toDoListStore.items,
);

let isDragging = false;
let startX = 0;
let scrollLeft = 0;
let velocity = 0;
const friction = 0.9;
const minVelocity = 0.5;

function handleMouseDown(event: MouseEvent) {
  if (!scrollContainer.value) return;
  isDragging = true;
  startX = event.pageX - scrollContainer.value.offsetLeft;
  scrollLeft = scrollContainer.value.scrollLeft;
  velocity = 0;
}

function handleMouseMove(event: MouseEvent) {
  if (!isDragging || !scrollContainer.value) return;
  const x = event.pageX - scrollContainer.value.offsetLeft;
  const walk = x - startX;
  scrollContainer.value.scrollLeft = scrollLeft - walk;
  velocity = walk;
}

function handleMouseUp() {
  if (!isDragging) return;
  isDragging = false;
  startInertiaScroll();
}

function selectItemId(id: string) {
  if (modelValue.value.includes(id)) {
    modelValue.value = modelValue.value.filter((i) => i !== id);
  } else {
    modelValue.value.push(id);
  }
}

function startInertiaScroll() {
  if (!scrollContainer.value) return;

  function inertia() {
    if (Math.abs(velocity) > minVelocity) {
      scrollContainer.value!.scrollLeft -= velocity;
      velocity *= friction;
      requestAnimationFrame(inertia);
    } else {
      velocity = 0;
    }
  }
  inertia();
}
</script>

<template>
  <div class="w-full">
    <h3
      class="mb-2 scroll-smooth text-end text-xl font-bold underline md:text-3xl"
    >
      <p v-if="type === 'completed'">Завершенные задачи</p>
      <p v-else>Ожидают выполнения</p>
    </h3>

    <div
      ref="scrollContainer"
      class="container-snap w-full snap-x snap-mandatory overflow-x-scroll scroll-smooth"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @mouseleave="handleMouseUp"
    >
      <div class="flex gap-x-3">
        <div
          v-for="item in items"
          :key="item.id"
          class="flex justify-end"
        >
          <to-do-card
            :item="item"
            @select="selectItemId(item.id)"
            :is-selected="modelValue.includes(item.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
