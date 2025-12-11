<template>
  <div class="tree-node" :class="{ 'tree-node--expanded': isExpanded, [`tree-node--level-${level}`]: true }">
    <!-- Node Content -->
    <div 
      class="tree-node__content"
      :style="{ paddingLeft: `${level * 24}px` }"
      @click="toggleExpand"
    >
      <!-- Expand Arrow -->
      <span class="tree-node__arrow" :class="{ 'tree-node__arrow--hidden': !hasChildren }">
        <i class="ri-arrow-right-s-line" :class="{ 'rotated': isExpanded }"></i>
      </span>
      
      <!-- Icon -->
      <span class="tree-node__icon">
        <slot name="icon">
          <i :class="icon || 'ri-folder-line'"></i>
        </slot>
      </span>
      
      <!-- Label -->
      <span class="tree-node__label">
        <slot name="label">{{ label }}</slot>
      </span>
      
      <!-- Badge/Tag -->
      <span v-if="$slots.tag" class="tree-node__tag">
        <slot name="tag"></slot>
      </span>
      
      <!-- Actions -->
      <span class="tree-node__actions" @click.stop>
        <slot name="actions"></slot>
      </span>
    </div>
    
    <!-- Children Container with Animation -->
    <transition name="tree-expand">
      <div v-show="isExpanded && hasChildren" class="tree-node__children">
        <slot name="children"></slot>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  level: {
    type: Number,
    default: 0
  },
  defaultExpanded: {
    type: Boolean,
    default: false
  },
  hasChildren: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle'])

const isExpanded = ref(props.defaultExpanded)

const toggleExpand = () => {
  if (props.hasChildren) {
    isExpanded.value = !isExpanded.value
    emit('toggle', isExpanded.value)
  }
}

// Expose for parent control
defineExpose({
  expand: () => { isExpanded.value = true },
  collapse: () => { isExpanded.value = false },
  toggle: toggleExpand,
  isExpanded
})
</script>

<style scoped>
.tree-node {
  user-select: none;
}

.tree-node__content {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  border-radius: 10px;
  margin: 4px 0;
  transition: all 0.2s ease;
  background: white;
  border: 1px solid transparent;
}

.tree-node__content:hover {
  background: rgba(0, 154, 68, 0.06);
  border-color: rgba(0, 154, 68, 0.1);
}

/* Level-based styling */
.tree-node--level-0 > .tree-node__content {
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.08) 0%, rgba(254, 221, 0, 0.04) 100%);
  border: 1px solid rgba(0, 154, 68, 0.15);
  box-shadow: 0 2px 8px rgba(0, 154, 68, 0.08);
}

.tree-node--level-0 > .tree-node__content:hover {
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.12) 0%, rgba(254, 221, 0, 0.06) 100%);
  border-color: rgba(0, 154, 68, 0.25);
  box-shadow: 0 4px 12px rgba(0, 154, 68, 0.12);
}

.tree-node--level-1 > .tree-node__content {
  background: rgba(0, 154, 68, 0.03);
  border-left: 3px solid rgba(0, 154, 68, 0.3);
}

.tree-node--level-2 > .tree-node__content {
  background: transparent;
  border-left: 3px solid rgba(0, 154, 68, 0.15);
}

/* Arrow */
.tree-node__arrow {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #009A44;
  transition: transform 0.25s ease;
  flex-shrink: 0;
}

.tree-node__arrow--hidden {
  visibility: hidden;
}

.tree-node__arrow i {
  font-size: 20px;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.tree-node__arrow i.rotated {
  transform: rotate(90deg);
}

/* Icon */
.tree-node__icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  color: white;
  border-radius: 8px;
  margin-right: 12px;
  font-size: 16px;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(0, 154, 68, 0.25);
}

.tree-node--level-1 .tree-node__icon {
  background: linear-gradient(135deg, #17a2b8 0%, #20c997 100%);
  box-shadow: 0 2px 6px rgba(23, 162, 184, 0.25);
}

.tree-node--level-2 .tree-node__icon {
  background: linear-gradient(135deg, #6c757d 0%, #adb5bd 100%);
  box-shadow: 0 2px 6px rgba(108, 117, 125, 0.25);
  width: 28px;
  height: 28px;
  font-size: 14px;
}

/* Label */
.tree-node__label {
  flex: 1;
  font-weight: 500;
  color: #1f2937;
  font-size: 14px;
}

.tree-node--level-0 .tree-node__label {
  font-weight: 600;
  font-size: 15px;
  color: #009A44;
}

/* Tag slot */
.tree-node__tag {
  margin-left: 12px;
  display: flex;
  gap: 6px;
}

/* Actions */
.tree-node__actions {
  margin-left: 12px;
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.tree-node__content:hover .tree-node__actions {
  opacity: 1;
}

/* Children container */
.tree-node__children {
  margin-left: 12px;
  border-left: 2px dashed rgba(0, 154, 68, 0.2);
  padding-left: 8px;
}

/* Expand animation */
.tree-expand-enter-active,
.tree-expand-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  max-height: 1000px;
}

.tree-expand-enter-from,
.tree-expand-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}
</style>
