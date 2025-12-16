<template>
  <div class="dept-tree-node" :class="{ 'is-expanded': isExpanded, [`level-${level}`]: true }">
    <!-- Node Content -->
    <div class="node-content" @click="toggleExpand">
      <!-- Expand Arrow -->
      <span class="expand-arrow" :class="{ 'has-children': hasChildren }">
        <i v-if="hasChildren" class="ri-arrow-right-s-line" :class="{ 'rotated': isExpanded }"></i>
        <i v-else class="ri-subtract-line" style="opacity: 0.3;"></i>
      </span>

      <!-- Icon -->
      <span class="node-icon" :class="iconClass">
        <i :class="nodeIcon"></i>
      </span>

      <!-- Label -->
      <span class="node-label">{{ displayName }}</span>

      <!-- Info -->
      <div class="node-info">
        <span v-if="item.leader" class="info-item">
          <i class="ri-user-line"></i>
          {{ item.leader }}
        </span>
        <span v-if="item.phone" class="info-item">
          <i class="ri-phone-line"></i>
          {{ item.phone }}
        </span>
      </div>

      <!-- Status Tag -->
      <el-tag :type="item.status === '0' ? 'success' : 'danger'" size="small" effect="light">
        {{ item.status === '0' ? $t('system.user.normal') : $t('system.user.disable') }}
      </el-tag>

      <!-- Actions -->
      <div class="node-actions" @click.stop>
        <el-button 
          type="success" 
          size="small" 
          circle
          @click="$emit('add', item)"
        >
          <i class="ri-add-line"></i>
        </el-button>
        <el-button 
          type="primary" 
          size="small" 
          circle
          @click="$emit('edit', item)"
        >
          <i class="ri-edit-line"></i>
        </el-button>
        <el-button 
          type="danger" 
          size="small" 
          circle
          @click="$emit('delete', item)"
        >
          <i class="ri-delete-bin-line"></i>
        </el-button>
      </div>
    </div>

    <!-- Children with Animation -->
    <transition name="slide-down">
      <div v-show="isExpanded && hasChildren" class="node-children">
        <DeptTreeNode
          v-for="child in item.children"
          :key="child.deptId"
          :item="child"
          :level="level + 1"
          @add="$emit('add', $event)"
          @edit="$emit('edit', $event)"
          @delete="$emit('delete', $event)"
        />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { getI18nText } from '@/utils/i18n'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  level: {
    type: Number,
    default: 0
  }
})

defineEmits(['add', 'edit', 'delete'])

const { t } = useI18n()

// Default collapsed state (false = collapsed)
const isExpanded = ref(false)

const hasChildren = computed(() => {
  return props.item.children && props.item.children.length > 0
})

const displayName = computed(() => {
  return getI18nText(props.item.deptName)
})

const nodeIcon = computed(() => {
  return props.item.deptType === 'A' ? 'ri-map-pin-line' : 'ri-building-2-line'
})

const iconClass = computed(() => {
  if (props.item.deptType === 'A') return 'icon-area'
  if (props.level === 0) return 'icon-root'
  if (props.level === 1) return 'icon-branch'
  return 'icon-leaf'
})

const toggleExpand = () => {
  if (hasChildren.value) {
    isExpanded.value = !isExpanded.value
  }
}

// Expose for parent control
const setExpanded = (value) => {
  isExpanded.value = value
}

defineExpose({
  setExpanded,
  isExpanded
})
</script>

<style scoped>
.dept-tree-node {
  margin: 2px 0;
}

.node-content {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: white;
  border: 1px solid transparent;
  gap: 10px;
  margin: 10px 0;
}

.node-content:hover {
  background: rgba(0, 154, 68, 0.04);
  border-color: rgba(0, 154, 68, 0.1);
}

/* Level 0 - Root nodes */
.level-0 > .node-content {
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.08) 0%, rgba(254, 221, 0, 0.04) 100%);
  border: 1px solid rgba(0, 154, 68, 0.15);
  box-shadow: 0 2px 8px rgba(0, 154, 68, 0.06);
  padding: 14px 20px;
}

.level-0 > .node-content:hover {
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.12) 0%, rgba(254, 221, 0, 0.06) 100%);
  box-shadow: 0 4px 12px rgba(0, 154, 68, 0.1);
}

.level-0 .node-label {
  font-weight: 600;
  font-size: 16px;
  color: #009A44;
}

/* Level 1 */
.level-1 > .node-content {
  background: rgba(0, 154, 68, 0.03);
  border-left: 3px solid rgba(0, 154, 68, 0.4);
  margin-left: 20px;
}

.level-1 > .node-content:hover {
  background: rgba(0, 154, 68, 0.06);
}

/* Level 2+ */
.level-2 > .node-content,
.level-3 > .node-content,
.level-4 > .node-content {
  background: transparent;
  border-left: 3px solid rgba(0, 154, 68, 0.2);
  margin-left: 20px;
}

/* Expand arrow */
.expand-arrow {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.expand-arrow i {
  font-size: 18px;
  color: #009A44;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.expand-arrow i.rotated {
  transform: rotate(90deg);
}

/* Node icon */
.node-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-size: 18px;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.icon-root {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  color: white;
  box-shadow: 0 3px 8px rgba(0, 154, 68, 0.3);
}

.icon-branch {
  background: linear-gradient(135deg, #17a2b8 0%, #20c997 100%);
  color: white;
  box-shadow: 0 3px 8px rgba(23, 162, 184, 0.3);
  width: 32px;
  height: 32px;
  font-size: 16px;
}

.icon-leaf {
  background: linear-gradient(135deg, #6c757d 0%, #adb5bd 100%);
  color: white;
  box-shadow: 0 2px 6px rgba(108, 117, 125, 0.3);
  width: 28px;
  height: 28px;
  font-size: 14px;
}

.icon-area {
  background: linear-gradient(135deg, #e76f51 0%, #f4a261 100%);
  color: white;
  box-shadow: 0 3px 8px rgba(231, 111, 81, 0.3);
}

/* Node label */
.node-label {
  flex: 1;
  font-weight: 500;
  color: #1f2937;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Info items */
.node-info {
  display: flex;
  gap: 16px;
  color: #6b7280;
  font-size: 13px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.info-item i {
  color: #009A44;
}

/* Actions */
.node-actions {
  display: flex;
  gap: 4px;
  margin-left: 8px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.node-content:hover .node-actions {
  opacity: 1;
}

.node-actions .el-button {
  width: 28px !important;
  height: 28px !important;
}

/* Children container */
.node-children {
  margin-left: 12px;
  padding-left: 12px;
  border-left: 2px dashed rgba(0, 154, 68, 0.15);
}

/* Slide down animation */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-8px);
}

.slide-down-enter-to,
.slide-down-leave-from {
  opacity: 1;
  max-height: 2000px;
  transform: translateY(0);
}
</style>
