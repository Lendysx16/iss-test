<script setup lang="ts">
import NavBar from './NavBar.vue';
import VToast from './VToast.vue';
</script>

<template>
  <nav-bar />
  <div class="mx-auto overflow-y-auto">
    <main class="container mx-auto h-svh px-2 pt-10 md:px-0 xl:pt-16">
      <router-view />
    </main>
  </div>

  <v-Toast />
</template>
