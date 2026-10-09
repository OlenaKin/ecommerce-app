<template>
  <div class="categories-dropdown" ref="rootEl">
    <button
      class="categories-dropdown__trigger nav-link"
      @click="toggle"
      :aria-expanded="isOpen"
      aria-haspopup="true"
    >
      Categories <span class="chevron" :class="{ 'is-open': isOpen }">▾</span>
    </button>

    <div v-if="isOpen" class="categories-dropdown__panel" role="menu">
      <button
        v-for="cat in categories"
        :key="cat.slug"
        class="categories-dropdown__item"
        role="menuitem"
        @click="select(cat.slug)"
      >
        {{ cat.name }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { getCategories } from '@/services/categories'
import type { Category } from '@/types/interfaces'

const router = useRouter()
const categories = ref<Category[]>([])
const isOpen = ref(false)
const rootEl = ref<HTMLElement | null>(null)

async function loadCategories() {
  try {
    categories.value = await getCategories()
  } catch (err) {
    // e.g. offline / network changed — retried next time the dropdown opens
    console.error('Could not load categories:', err)
  }
}

function toggle() {
  isOpen.value = !isOpen.value
  if (isOpen.value && categories.value.length === 0) loadCategories()
}

function close() {
  isOpen.value = false
}

function select(slug: string) {
  router.push({ path: '/', query: { category: slug } })
  close()
}

function handleClickOutside(event: MouseEvent) {
  if (!rootEl.value) return
  if (!rootEl.value.contains(event.target as Node)) {
    close()
  }
}

function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape') close()
}

onMounted(() => {
  loadCategories()
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped lang="scss">
@use '@/styles/variables.scss' as *;

.categories-dropdown {
  position: relative;
  display: inline-block;
}

/* Trigger look comes from the global .nav-link class (shared with Cart/Wishlist) */

.chevron {
  display: inline-block;
  transition: transform 0.2s;
  font-size: 0.8rem;

  &.is-open {
    transform: rotate(180deg);
  }
}

.categories-dropdown__panel {
  position: absolute;
  top: calc(100% + 8px);
  right: 0; /* trigger now sits on the right side of the header */
  z-index: 3000;

  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);

  padding: $spacing-base;
  min-width: 480px;

  // Auto-columns for 24 categories
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.25rem;

  max-height: 60vh;
  overflow-y: auto;
}

.categories-dropdown__item {
  background: transparent;
  border: none;
  color: $color-text;
  text-align: left;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;

  &:hover {
    background: $color-primary;
  }
}

// Mobile: full-width panel
@media (max-width: 768px) {
  .categories-dropdown__panel {
    position: fixed;
    top: $header-height;
    left: 0;
    right: 0;
    min-width: 100%;
    border-radius: 0;
    grid-template-columns: 1fr;
    max-height: calc(100dvh - #{$header-height});
  }
}
</style>
