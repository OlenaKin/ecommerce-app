<!-- src/components/Loader.vue -->
<template>
  <div class="loader">
    <div class="spinner"></div>
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #ddd;
  border-top-color: #333;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

p {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #555;
}
</style>
