<script setup lang="ts" generic="T extends unknown">
import { useMergeClasses } from '../composables/useMergeClasses';

type Emits = {
  (event: 'change', value: T | undefined): void;
};

type Props = {
  items: T[];
  keyProp?: keyof T;
  placeholder?: string;
  valueProp?: keyof T;
};

const props = defineProps<Props>();
defineEmits<Emits>();

const modelValue = defineModel<T>();
const mergeClasses = useMergeClasses();

const getKey = (item: T, index: number) => {
  if (item && typeof item === 'object' && props.keyProp) {
    return String(item[props.keyProp]);
  } else {
    return `item-${index}`;
  }
};

const getValue = (item: T) => {
  if (item && typeof item === 'object' && props.valueProp) {
    return String(item[props.valueProp]);
  } else {
    return String(item);
  }
};
</script>

<template>
  <select
    v-model="modelValue"
    v-bind="$attrs"
    :class="
      mergeClasses.merger(
        'rounded-md border border-border bg-background-accent px-3 py-2 placeholder:text-sm focus-visible:outline-none md:placeholder:text-base disabled:text-accent disabled:cursor-not-allowed',
      )
    "
    @change="$emit('change', modelValue)"
  >
    <option v-if="placeholder" disabled class="bg-background-accent">
      {{ placeholder }}
    </option>

    <option
      class="bg-background-accent"
      v-for="(item, index) in items"
      :key="getKey(item, index)"
      :value="item"
    >
      {{ getValue(item) }}
    </option>
  </select>
</template>
