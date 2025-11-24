<template>
  <div class="placeholder-container">
    <div class="placeholder-content">
      <i class="ri-tools-line placeholder-icon"></i>
      <h2 class="placeholder-title">功能开发中</h2>
      <p class="placeholder-desc">此功能正在开发中，敬请期待...</p>
      <p class="placeholder-info">Module: {{ moduleName }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const moduleName = computed(() => route.meta?.title || '未知模块')
</script>

<style scoped>
.placeholder-container {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.placeholder-content {
  text-align: center;
  padding: 60px 40px;
}

.placeholder-icon {
  font-size: 80px;
  color: #d1d5db;
  margin-bottom: 24px;
}

.placeholder-title {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 12px 0;
}

.placeholder-desc {
  font-size: 16px;
  color: #6b7280;
  margin: 0 0 8px 0;
}

.placeholder-info {
  font-size: 14px;
  color: #9ca3af;
  margin: 0;
}
</style>
