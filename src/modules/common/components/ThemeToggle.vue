<script setup lang="ts">
import { VSlider, VTooltip } from '@/modules/common/components';
import { useCommonStore } from '@/modules/common/stores/commonStore';
import { computed } from 'vue';

const commonStore = useCommonStore();

const isDarkTheme = computed({
  get() {
    return commonStore.theme === 'dark';
  },

  set() {
    commonStore.toggleTheme();
  },
});
</script>

<template>
  <v-tooltip text="сменить тему" placement="bottom">
    <template #default="{ listener, attrs }">
      <v-slider v-model="isDarkTheme" v-on="listener" v-bind="attrs">
        <template #icon>
          <v-icon
            v-if="isDarkTheme"
            name="co-moon"
            class="size-[14px] text-background md:size-[19px]"
          />
          <v-icon
            v-else
            name="co-sun"
            class="size-[14px] text-background md:size-[19px]"
          />
        </template>
      </v-slider>
    </template>
  </v-tooltip>
</template>
