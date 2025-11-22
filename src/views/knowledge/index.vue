<template>
  <div class="knowledge-offline">
    <el-empty description="知识中心功能已下线" />
  </div>
</template>

<script setup>
// 原页面逻辑按需求整体下线，保留占位
/*
import { computed, ref } from 'vue'
import { useUserStore } from '@/store'
import { ElMessage } from 'element-plus'
*/
</script>

<style scoped>
.knowledge-offline {
  height: calc(100vh - 64px - 113px);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>