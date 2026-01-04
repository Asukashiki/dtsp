<template>
  <div class="status-tabs">
    <el-tabs v-model="activeTabModel" @tab-change="handleTabChange">
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.name"
        :name="tab.name"
        :disabled="tab.disabled">
        <template #label>
          <span>
            <i :class="tab.icon"></i>
            {{ $t(tab.label) }}
            <el-badge
              v-if="tab.count !== undefined && tab.count > 0"
              :value="tab.count"
              :max="99"
              class="tab-badge" />
          </span>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /**
   * Current active tab name
   */
  modelValue: {
    type: String,
    required: true
  },

  /**
   * Tab configuration array
   * @example
   * [
   *   {
   *     name: 'pendingApproval',
   *     label: 'research.breedingData.batch.tabs.pendingApproval',
   *     icon: 'ri-time-line',
   *     count: 5
   *   }
   * ]
   */
  tabs: {
    type: Array,
    required: true,
    validator: (tabs) => {
      return tabs.every(tab =>
        tab.name && tab.label && tab.icon
      )
    }
  }
})

const emit = defineEmits(['update:modelValue', 'tab-change'])

const activeTabModel = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const handleTabChange = (tabName) => {
  emit('tab-change', tabName)
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/workflow-common.scss';

.tab-badge {
  margin-left: 6px;
  vertical-align: middle;

  :deep(.el-badge__content) {
    background-color: #f56c6c;
    border: none;
    font-size: 11px;
    height: 16px;
    line-height: 16px;
    padding: 0 5px;
  }
}
</style>
