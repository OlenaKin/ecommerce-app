<!-- src/components/CategoryFilter.vue -->
<template>
  <div class="filter">
    <!-- <button v-for="cat in categories" :key="cat" @click="$emit('select', cat)">
      {{ cat }}
    </button> -->
    <button v-for="cat in categories" :key="cat" @click="selectCategory(cat)">
      {{ cat }}
    </button>
  </div>
</template>

<!-- <script setup lang="ts">
defineProps<{
  categories: string[]
}>()
</script> -->

<script setup lang="ts">
const categoryMap: Record<string, string> = {
  electronics: 'electronics',
  jewelery: 'jewelery',
  'men’s clothing': "men's clothing",
  'women’s clothing': "women's clothing",
}

const props = defineProps<{ categories: string[] }>()
const emit = defineEmits(['select'])

function selectCategory(cat: string) {
  emit('select', categoryMap[cat] || cat)
}
</script>

<style scoped lang="scss">
.filter {
  display: flex;
  gap: 1rem;
}
</style>
