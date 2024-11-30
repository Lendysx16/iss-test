<script setup lang="ts">
import { ThemeToggle } from '@/modules/common/components';
</script>
<template>
  <nav
    class="xs:p-0 fixed left-0 top-0 z-20 flex h-10 w-full bg-background-accent p-4 xl:h-16"
  >
    <div
      class="container mx-auto flex h-full items-center justify-between"
    >
      <h1 class="font-bold md:text-xl">Я это обязательно сделаю</h1>
      <theme-toggle />
    </div>
  </nav>
</template>
