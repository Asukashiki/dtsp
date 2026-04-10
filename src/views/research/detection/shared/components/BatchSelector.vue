<template>
  <el-select
    v-model="internalValue"
    filterable
    :placeholder="placeholder"
    clearable
    class="batch-selector"
    @change="handleChange"
  >
    <el-option-group v-if="breederBatches.length > 0" :label="$t('research.detection.batchSelector.breederBatches')">
      <el-option
        v-for="batch in breederBatches"
        :key="batch.id"
        :label="`${batch.name} - ${batch.varietyName || ''}`"
        :value="batch.id"
      >
        <span class="batch-option">
          <span class="batch-name">{{ batch.name }}</span>
          <span class="batch-variety">{{ batch.varietyName }}</span>
          <el-tag size="small" type="success">Breeder</el-tag>
        </span>
      </el-option>
    </el-option-group>

    <el-option-group v-if="preBasicBatches.length > 0" :label="$t('research.detection.batchSelector.preBasicBatches')">
      <el-option
        v-for="batch in preBasicBatches"
        :key="batch.id"
        :label="`${batch.name} - ${batch.varietyName || ''}`"
        :value="batch.id"
      >
        <span class="batch-option">
          <span class="batch-name">{{ batch.name }}</span>
          <span class="batch-variety">{{ batch.varietyName }}</span>
          <el-tag size="small" type="warning">Pre-Basic</el-tag>
        </span>
      </el-option>
    </el-option-group>

    <el-option-group v-if="basicBatches.length > 0" :label="$t('research.detection.batchSelector.basicBatches')">
      <el-option
        v-for="batch in basicBatches"
        :key="batch.id"
        :label="`${batch.name} - ${batch.varietyName || ''}`"
        :value="batch.id"
      >
        <span class="batch-option">
          <span class="batch-name">{{ batch.name }}</span>
          <span class="batch-variety">{{ batch.varietyName }}</span>
          <el-tag size="small" type="primary">Basic</el-tag>
        </span>
      </el-option>
    </el-option-group>

    <el-option-group v-if="c1Batches.length > 0" :label="$t('research.detection.batchSelector.c1Batches')">
      <el-option
        v-for="batch in c1Batches"
        :key="batch.id"
        :label="`${batch.name} - ${batch.varietyName || ''}`"
        :value="batch.id"
      >
        <span class="batch-option">
          <span class="batch-name">{{ batch.name }}</span>
          <span class="batch-variety">{{ batch.varietyName }}</span>
          <el-tag size="small" type="warning">C1</el-tag>
        </span>
      </el-option>
    </el-option-group>

    <template v-if="breederBatches.length === 0 && preBasicBatches.length === 0 && basicBatches.length === 0 && c1Batches.length === 0 && !loading">
      <el-option disabled :value="null">{{ $t('research.detection.batchSelector.noBatches') }}</el-option>
    </template>
  </el-select>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { getBatchesForDetection } from '@/api/detection'

const props = defineProps({
  modelValue: {
    type: Object,
    default: null
  },
  seedClasses: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'change'])
const { t } = useI18n()

const internalValue = ref(null)
const allBatches = ref([])
const loading = ref(false)

const filteredBatches = computed(() => {
  if (!props.seedClasses.length) {
    return allBatches.value
  }
  return allBatches.value.filter(batch => props.seedClasses.includes(batch.seedClass))
})

// 按种子级别分组展示批次
const breederBatches = computed(() =>
  filteredBatches.value.filter(b => b.seedClass === 'Breeder')
)

const preBasicBatches = computed(() =>
  filteredBatches.value.filter(b => b.seedClass === 'Pre-Basic')
)

const basicBatches = computed(() =>
  filteredBatches.value.filter(b => b.seedClass === 'Basic')
)

const c1Batches = computed(() =>
  filteredBatches.value.filter(b => b.seedClass === 'C1')
)

// 标准化批次数据结构
const normalizeBatch = (rawBatch) => {
  return {
    id: rawBatch.batchId,
    name: rawBatch.batchName || rawBatch.batchId || '',
    varietyName: rawBatch.varietyName || '',
    cropType: rawBatch.cropType || '',
    seedClass: rawBatch.seedClass,
    startDate: rawBatch.startDate || rawBatch.time || '',
    endDate: rawBatch.endDate || '',
    _rawData: rawBatch
  }
}

// 加载批次列表
const loadBatches = async () => {
  loading.value = true
  try {
    // 调用统一的批次列表API（包含检测批次和生产结果批次）
    const res = await getBatchesForDetection()

    if (res.code === 200 && res.data) {
      allBatches.value = res.data.map(b => normalizeBatch(b))
    } else {
      allBatches.value = []
    }
  } catch (error) {
    console.error('Load batches error:', error)
    allBatches.value = []
  } finally {
    loading.value = false
  }
}

// 处理选择变化
const handleChange = (value) => {
  const selectedBatch = filteredBatches.value.find(b => b.id === value)
  emit('update:modelValue', selectedBatch)
  emit('change', selectedBatch)
}

// 监听外部值变化
watch(() => props.modelValue, (newVal) => {
  internalValue.value = newVal?.id || null
}, { immediate: true })

// 初始化
onMounted(() => {
  loadBatches()
})
</script>

<style scoped lang="scss">
.batch-selector {
  width: 100%;
}

.batch-option {
  display: flex;
  align-items: center;
  gap: 8px;

  .batch-name {
    font-weight: 600;
    color: #303133;
  }

  .batch-variety {
    color: #606266;
    font-size: 13px;
  }

  .el-tag {
    margin-left: auto;
  }
}

@media (max-width: 768px) {
  .batch-option {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;

    .el-tag {
      margin-left: 0;
    }
  }
}
</style>
