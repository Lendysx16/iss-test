<script setup lang="ts">
import clsx from 'clsx';
import { nextTick, ref } from 'vue';

type Props = {
  bgColor?: string;
  color?: string;
  placement?: 'bottom' | 'left' | 'right' | 'top';
  show?: boolean;
  text: string;
  textSize?: string;
};

const props = withDefaults(defineProps<Props>(), {
  bgColor: 'var(--color-background-accent)',
  color: 'var(--color-text)',
  placement: 'bottom',
  show: true,
});

const isVisible = ref<boolean>(false);

const tooltip = ref<HTMLElement | null>(null);

const listeners = {
  mouseenter: (e: MouseEvent) => {
    isVisible.value = true;

    nextTick(() => {
      const tooltipEl = tooltip.value;
      const childRect = (
        e.target as HTMLElement
      ).getBoundingClientRect();

      if (!tooltipEl) return;

      let top = 0;
      let left = 0;

      switch (props.placement) {
        case 'bottom':
          top = childRect.bottom + window.scrollY + 5;
          left = Math.floor(
            childRect.left +
              window.scrollX +
              (childRect.width - tooltipEl.offsetWidth) / 2,
          );
          break;

        case 'left':
          top = Math.floor(
            childRect.top +
              window.scrollY +
              (childRect.height - tooltipEl.offsetHeight) / 2,
          );
          left =
            childRect.left + window.scrollX - tooltipEl.offsetWidth;

          if (left < 0) {
            left = childRect.right + window.scrollX + 5;
          }
          break;

        case 'right':
          top = Math.floor(
            childRect.top +
              window.scrollY +
              (childRect.height - tooltipEl.offsetHeight) / 2,
          );

          left = childRect.right + window.scrollX;

          if (left > window.innerWidth - tooltipEl.offsetWidth) {
            left =
              childRect.left + window.scrollX - tooltipEl.offsetWidth;
          }
          break;

        case 'top':
          top =
            childRect.top +
            window.scrollY -
            tooltipEl.offsetHeight -
            10;

          if (top < 0) {
            top = childRect.bottom + window.scrollY + 10;
          }
          left = Math.floor(
            childRect.left +
              window.scrollX +
              (childRect.width - tooltipEl.offsetWidth) / 2,
          );
          break;

        default:
          console.warn(`Unknown placement: ${props.placement}`);
          break;
      }

      tooltipEl.style.top = `${top}px`;
      tooltipEl.style.left = `${left}px`;
    });
  },
  mouseleave: () => {
    isVisible.value = false;
  },
  touchstart: () => {
    isVisible.value = false;
  },
};
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        ref="tooltip"
        :class="
          clsx(
            'absolute left-0 top-0 z-50 flex justify-center rounded-md border border-border bg-black p-2 text-white opacity-90',
            textSize,
          )
        "
        v-if="isVisible && show"
        :style="{
          'background-color': props.bgColor,
          color: props.color,
        }"
      >
        {{ text }}
      </div>
    </Transition>
  </Teleport>
  <slot :listener="listeners" :attrs="{ class: 'cursor-pointer' }" />
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
  opacity: 0.9;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
