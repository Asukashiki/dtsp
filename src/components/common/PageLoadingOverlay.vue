<template>
  <transition name="skeleton-fade">
    <div v-if="loadingStore.isRouteLoading" class="skeleton-wrapper">
      <el-skeleton :rows="12" animated />
    </div>
  </transition>
</template>

<script setup>
import { useLoadingStore } from '@/store/loading'

const loadingStore = useLoadingStore()
</script>

<style scoped>
.skeleton-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f5f7fa;
  padding: 20px;
  z-index: 999;
  overflow-y: auto;
}

.skeleton-fade-enter-active,
.skeleton-fade-leave-active {
  transition: opacity 0.2s ease;
}

.skeleton-fade-enter-from,
.skeleton-fade-leave-to {
  opacity: 0;
}
</style>
