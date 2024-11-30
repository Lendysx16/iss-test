<script setup lang="ts">
import { useMergeClasses } from '../composables/useMergeClasses';

const modelValue = defineModel<number | string>();

const mergeClasses = useMergeClasses();
</script>

<template>
  <input
    v-model="modelValue"
    v-bind="$attrs"
    :class="
      mergeClasses.merger(
        'rounded-md border border-border bg-background-accent px-4 py-2 placeholder:text-sm focus-visible:outline-none md:placeholder:text-base disabled:text-accent disabled:cursor-not-allowed',
      )
    "
  />
</template>
