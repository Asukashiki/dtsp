<template>
  <div class="i18n-input">
    <el-tabs v-model="activeTab" type="card" class="i18n-tabs">
      <el-tab-pane
        v-for="lang in languages"
        :key="lang.code"
        :label="lang.label"
        :name="lang.code"
      >
        <el-input
          v-if="type === 'input'"
          v-model="localValue[lang.code]"
          :placeholder="placeholder || $t('common.pleaseInput') + ' ' + lang.label"
          :disabled="disabled"
          :maxlength="maxlength"
          show-word-limit
          @input="handleInput"
        />
        <el-input
          v-else-if="type === 'textarea'"
          v-model="localValue[lang.code]"
          type="textarea"
          :placeholder="placeholder || $t('common.pleaseInput') + ' ' + lang.label"
          :disabled="disabled"
          :maxlength="maxlength"
          :rows="rows"
          show-word-limit
          @input="handleInput"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { SUPPORTED_LOCALES } from '@/utils/i18nHelper'

const props = defineProps({
  modelValue: {
    type: [Object, String],
    default: () => ({})
  },
  type: {
    type: String,
    default: 'input', // 'input' or 'textarea'
    validator: (val) => ['input', 'textarea'].includes(val)
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  maxlength: {
    type: Number,
    default: 200
  },
  rows: {
    type: Number,
    default: 3
  }
})

const emit = defineEmits(['update:modelValue'])

// 使用统一的语言配置，转换为组件需要的格式
const languages = computed(() => 
  SUPPORTED_LOCALES.map(l => ({ code: l.jsonKey, label: l.label }))
)

const activeTab = ref(SUPPORTED_LOCALES[0]?.jsonKey || 'zh_CN')

// Parse modelValue - can be JSON string or object
const parseValue = (val) => {
  // 初始化所有语言的空值
  const defaultValue = {}
  SUPPORTED_LOCALES.forEach(l => {
    defaultValue[l.jsonKey] = ''
  })
  
  if (!val) {
    return defaultValue
  }
  if (typeof val === 'string') {
    try {
      return { ...defaultValue, ...JSON.parse(val) }
    } catch (e) {
      // If not valid JSON, use as first language value
      defaultValue[SUPPORTED_LOCALES[0]?.jsonKey || 'zh_CN'] = val
      return defaultValue
    }
  }
  return { ...defaultValue, ...val }
}

const localValue = ref(parseValue(props.modelValue))

// Watch for external changes
watch(
  () => props.modelValue,
  (newVal) => {
    localValue.value = parseValue(newVal)
  },
  { deep: true }
)

// Emit changes
const handleInput = () => {
  emit('update:modelValue', { ...localValue.value })
}
</script>

<style scoped>
.i18n-input {
  width: 100%;
}

.i18n-tabs :deep(.el-tabs__header) {
  margin-bottom: 8px;
}

.i18n-tabs :deep(.el-tabs__item) {
  padding: 0 12px;
  height: 28px;
  line-height: 28px;
  font-size: 12px;
}

.i18n-tabs :deep(.el-tabs__nav) {
  border: none;
}
</style>
