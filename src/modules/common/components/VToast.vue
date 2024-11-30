<script setup lang="ts">
import { generateUUID } from '@/utils/generate-uuid';
import { PxRemoveBox } from 'oh-vue-icons/icons';
import { onBeforeUnmount, onMounted, ref } from 'vue';

type Toast = {
  duration: number;
  id: string;
  message: string;
  timer: globalThis.Timer;
  type: 'error' | 'success';
};

const toasts = ref<Toast[]>([]);

function showToast(
  type: Toast['type'],
  message: string,
  duration: number = 3000,
) {
  const toast: Toast = {
    duration: duration,
    id: generateUUID(),
    message,
    timer: setTimeout(() => {
      handleToastClose(toast);
    }, duration),
    type,
  };

  toasts.value = [...toasts.value, toast];
}

const handleToast = (e: Event) => {
  const customEvent = e as CustomEvent<Toast>;
  showToast(
    customEvent.detail.type,
    customEvent.detail.message,
    customEvent.detail.duration,
  );
};

const handleToastClose = (toast: Toast) => {
  clearTimeout(toast.timer);
  toasts.value = toasts.value.filter((t) => t.id !== toast.id);
};

onMounted(() => {
  window.addEventListener('toast', handleToast);
});

onBeforeUnmount(() => {
  window.removeEventListener('toast', handleToast);
});
</script>

<template>
  <Teleport to="body">
    <div class="fixed right-4 top-4 z-50 flex flex-col gap-3">
      <TransitionGroup name="toast">
        <output
          v-for="toast in toasts"
          :key="toast.id"
          class="flex w-52 items-center justify-between gap-2 rounded-md py-4 pl-3 pr-5 text-sm font-bold text-color-text shadow-lg md:w-64"
          :class="{
            'bg-red-300 dark:bg-red-500': toast.type === 'error',
            'bg-green-300  dark:bg-green-500':
              toast.type === 'success',
          }"
        >
          <v-icon
            :name="PxRemoveBox.name"
            class="size-5 cursor-pointer"
            @click="handleToastClose(toast)"
          />
          <span class="w-full hyphens-auto break-words text-end">
            {{ toast.message }}
          </span>
        </output>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-move,
.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.toast-leave-active {
  position: absolute;
}
</style>
