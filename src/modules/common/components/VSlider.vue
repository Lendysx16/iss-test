<script setup lang="ts">
type Emits = {
  (event: 'change'): void;
};

type Props = {
  id?: string;
};

defineProps<Props>();

const modelValue = defineModel<boolean>();
const emits = defineEmits<Emits>();

function handleClick() {
  modelValue.value = !modelValue.value;

  emits('change');
}
</script>

<template>
  <input
    type="checkbox"
    class="hidden"
    :id="id"
    v-model="modelValue"
  />

  <div
    v-bind="$attrs"
    @click="handleClick"
    class="relative m-1 inline-block h-[15px] w-[30px] cursor-pointer rounded-xl bg-slider-background md:h-[20px] md:w-[40px]"
  >
    <button
      type="button"
      :class="{
        'absolute top-1/2 flex size-[16px] -translate-y-1/2 items-center justify-center rounded-xl bg-slider shadow shadow-slate-400 transition-[left] dark:shadow-none md:size-[21px]': true,
        'left-0': !modelValue,
        'left-1/2': modelValue,
      }"
    >
      <slot
        name="icon"
        :class="'md:size-[21px] size-[16px] text-border text-xs'"
      >
      </slot>
    </button>
  </div>
</template>
