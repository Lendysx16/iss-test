<script setup lang="ts">
import { PxCheck } from 'oh-vue-icons/icons';

import { useMergeClasses } from '../composables/useMergeClasses';

type Emits = {
  (event: 'change', value: boolean): void;
};

defineEmits<Emits>();

const modelValue = defineModel<boolean>('modelValue', {
  default: false,
});

const mergeClasses = useMergeClasses();
</script>

<template>
  <div
    :class="
      mergeClasses.merger(
        'rounded-md border border-border size-5 flex justify-center items-center cursor-pointer',
        modelValue
          ? 'bg-background-accent text-color-text'
          : '!bg-slider-background text-background-accent',
      )
    "
    @click="
      modelValue = !modelValue;
      $emit('change', modelValue);
    "
  >
    <Transition name="fade">
      <v-icon
        v-show="modelValue"
        :name="PxCheck.name"
        class="size-5"
      />
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
  opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
