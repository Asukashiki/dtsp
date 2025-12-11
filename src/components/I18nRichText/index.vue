<template>
  <div class="i18n-richtext">
    <el-tabs v-model="activeTab" type="card" class="i18n-tabs">
      <el-tab-pane
        v-for="lang in languages"
        :key="lang.code"
        :label="lang.label"
        :name="lang.code"
      >
        <div class="editor-container">
          <QuillEditor
            v-model:content="localValue[lang.code]"
            contentType="html"
            :options="editorOptions"
            :style="{ height: height }"
            @update:content="handleChange"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { SUPPORTED_LOCALES } from '@/utils/i18nHelper'

const props = defineProps({
  modelValue: {
    type: [Object, String],
    default: () => ({})
  },
  height: {
    type: String,
    default: '200px'
  },
  placeholder: {
    type: String,
    default: 'Please enter content...'
  }
})

const emit = defineEmits(['update:modelValue'])

// 使用统一的语言配置
const languages = computed(() => 
  SUPPORTED_LOCALES.map(l => ({ code: l.jsonKey, label: l.label }))
)

const activeTab = ref(SUPPORTED_LOCALES[0]?.jsonKey || 'en_US')

// 简洁的工具栏配置
const editorOptions = computed(() => ({
  placeholder: props.placeholder,
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      [{ 'color': [] }],
      ['link'],
      ['clean']
    ]
  }
}))

// Parse modelValue
const parseValue = (val) => {
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
      defaultValue[SUPPORTED_LOCALES[0]?.jsonKey || 'en_US'] = val
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
const handleChange = () => {
  emit('update:modelValue', { ...localValue.value })
}
</script>

<style scoped>
.i18n-richtext {
  width: 100%;
}

.i18n-tabs :deep(.el-tabs__header) {
  margin-bottom: 0;
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

.editor-container {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
}

:deep(.ql-container) {
  font-size: 14px;
}

:deep(.ql-toolbar) {
  border: none;
  border-bottom: 1px solid #dcdfe6;
  background: #f5f7fa;
}

:deep(.ql-container.ql-snow) {
  border: none;
}

:deep(.ql-editor) {
  min-height: 150px;
}
</style>
