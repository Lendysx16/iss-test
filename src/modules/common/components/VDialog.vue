<script setup lang="ts">
import { useMergeClasses } from '@/modules/common/composables/useMergeClasses';

type Emits = {
  (event: 'update:open', value: boolean): void;
};

type Props = {
  open: boolean;
};

defineProps<Props>();
defineEmits<Emits>();

const mergeClasses = useMergeClasses();
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      v-bind="$attrs"
      :class="
        mergeClasses.merger(
          'absolute-center relative z-10 h-screen w-full text-clip px-2 backdrop-blur-md',
        )
      "
      @dblclick.stop="$emit('update:open', false)"
    >
      <div
        class="absolute-center z-20 max-h-[90svh] w-full max-w-[340px] rounded-lg bg-background-accent p-8 sm:max-w-[430px] md:max-h-[70svh] md:max-w-[580px] lg:max-w-[700px]"
        @dblclick.stop
      >
        <slot />
      </div>
    </div>
  </Teleport>
</template>
