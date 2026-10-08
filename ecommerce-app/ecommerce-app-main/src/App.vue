<template>
  <div id="app">
    <Header />

    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
</script>
