<template>
  <div class="workflow-action-buttons">
    <el-button
      v-for="button in visibleButtons"
      :key="button.action"
      :type="button.type"
      :loading="loading && currentAction === button.action"
      :disabled="disabled || (loading && currentAction !== button.action)"
      @click="handleAction(button)">
      <i :class="button.icon"></i>
      {{ $t(`common.${button.label}`) }}
    </el-button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/store'

const props = defineProps({
  /**
   * Current workflow status (S0, S1, S2, S3, S9, S10)
   */
  workflowStatus: {
    type: String,
    required: true
  },

  /**
   * Current page mode: 'add', 'edit', 'audit', 'view'
   */
  mode: {
    type: String,
    default: 'view'
  },

  /**
   * Whether in approval page (voided tab)
   */
  isVoidedTab: {
    type: Boolean,
    default: false
  },

  /**
   * Disable all buttons
   */
  disabled: {
    type: Boolean,
    default: false
  },

  /**
   * Loading state
   */
  loading: {
    type: Boolean,
    default: false
  },

  /**
   * Custom button configuration to override defaults
   * Useful for specific workflows
   */
  customButtons: {
    type: Array,
    default: null
  }
})

const emit = defineEmits(['action'])

const userStore = useUserStore()
const currentAction = ref('')

/**
 * Default button configurations based on workflow state
 */
const getDefaultButtons = () => {
  const { workflowStatus, mode, isVoidedTab } = props

  // If on voided tab, only show view button
  if (isVoidedTab) {
    return [
      { type: 'primary', action: 'view', label: 'view', icon: 'ri-eye-line' }
    ]
  }

  // Add/Edit mode
  if (mode === 'add' || mode === 'edit') {
    return [
      { type: '', action: 'cancel', label: 'cancel', icon: 'ri-close-line' },
      { type: 'primary', action: 'save', label: 'save', icon: 'ri-save-line' }
    ]
  }

  // Audit mode
  if (mode === 'audit') {
    return [
      { type: '', action: 'cancel', label: 'cancel', icon: 'ri-close-line' },
      { type: 'success', action: 'approve', label: 'approve', icon: 'ri-check-line' },
      { type: 'danger', action: 'reject', label: 'reject', icon: 'ri-close-circle-line' }
    ]
  }

  // View mode with specific actions based on workflow status
  if (mode === 'view') {
    const buttons = []

    // Common buttons for certain states
    if (['S2', 'S9'].includes(workflowStatus)) {
      buttons.push({ type: '', action: 'cancel', label: 'cancel', icon: 'ri-close-line' })
      buttons.push({ type: 'primary', action: 'archive', label: 'archive', icon: 'ri-archive-line' })
      buttons.push({ type: 'danger', action: 'cancelBatch', label: 'void', icon: 'ri-delete-bin-line' })
    }

    return buttons
  }

  // Workflow status-based buttons (for list/table view)
  const buttons = []

  switch (workflowStatus) {
    case 'S0': // Draft
      if (userStore.hasWorkflowStatusPermission('edit')) {
        buttons.push({ type: 'primary', action: 'edit', label: 'edit', icon: 'ri-edit-line' })
      }
      if (userStore.hasWorkflowStatusPermission('submit')) {
        buttons.push({ type: 'success', action: 'submit', label: 'submit', icon: 'ri-send-plane-line' })
      }
      if (userStore.hasWorkflowStatusPermission('cancel')) {
        buttons.push({ type: 'danger', action: 'cancelBatch', label: 'void', icon: 'ri-delete-bin-line' })
      }
      break

    case 'S1': // Pending Approval
      if (userStore.hasWorkflowStatusPermission('approve')) {
        buttons.push({ type: 'primary', action: 'audit', label: 'audit', icon: 'ri-check-line' })
      }
      if (userStore.hasWorkflowStatusPermission('cancel')) {
        buttons.push({ type: 'danger', action: 'cancelBatch', label: 'void', icon: 'ri-delete-bin-line' })
      }
      break

    case 'S2': // Approved
      buttons.push({ type: 'primary', action: 'view', label: 'view', icon: 'ri-eye-line' })
      break

    case 'S3': // Rejected
      if (userStore.hasWorkflowStatusPermission('edit')) {
        buttons.push({ type: 'primary', action: 'edit', label: 'edit', icon: 'ri-edit-line' })
      }
      if (userStore.hasWorkflowStatusPermission('submit')) {
        buttons.push({ type: 'success', action: 'submit', label: 'submit', icon: 'ri-send-plane-line' })
      }
      if (userStore.hasWorkflowStatusPermission('cancel')) {
        buttons.push({ type: 'danger', action: 'cancelBatch', label: 'void', icon: 'ri-delete-bin-line' })
      }
      break

    case 'S9': // Archived
    case 'S10': // Voided
      buttons.push({ type: 'primary', action: 'view', label: 'view', icon: 'ri-eye-line' })
      break
  }

  return buttons
}

// Compute visible buttons
const visibleButtons = computed(() => {
  return props.customButtons || getDefaultButtons()
})

const handleAction = (button) => {
  currentAction.value = button.action
  emit('action', button.action)

  // Reset current action after a delay (for loading state)
  setTimeout(() => {
    currentAction.value = ''
  }, 3000)
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/workflow-common.scss';
</style>
