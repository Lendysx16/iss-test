<script setup lang="ts">
import { useMergeClasses } from '@/modules/common/composables/useMergeClasses';

type Emits = {
  (event: 'click'): void;
};

defineEmits<Emits>();

const mergeClasses = useMergeClasses();
</script>
<template>
  <button
    v-bind="$attrs"
    :class="
      mergeClasses.merger(
        'rounded-md border border-border bg-background-accent px-4 py-2 hover:bg-accent dark:disabled:text-accent disabled:bg-background',
      )
    "
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>
