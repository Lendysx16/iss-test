<script setup lang="ts">
import { VButton } from '@/modules/common/components';
</script>

<template>
  <section
    class="absolute-center flex flex-col justify-center gap-y-8 md:items-center"
  >
    <h1 class="text-6xl font-bold">404. Страница не найдена</h1>

    <v-button
      class="mt-5 w-full flex-1 font-bold md:w-2/3"
      @click="$router.replace({ name: $routes.HOME.name })"
    >
      На главную
    </v-button>
  </section>
</template>
