<template>
  <div class="basic-seed-selector">
    <el-select
      v-model="selectedSeed"
      :placeholder="placeholder"
      style="width: 100%"
      filterable
      :loading="loading"
      clearable
      @change="handleSelectionChange"
    >
      <el-option
        v-for="seed in seedList"
        :key="`${seed.batchId}-${seed.sourceType}`"
        :label="seed.batchId"
        :value="`${seed.batchId}|${seed.sourceType}`"
      >
        <div class="seed-option">
          <div class="seed-option-main">
            <span class="batch-id">{{ seed.batchId }}</span>
            <el-tag
              :type="seed.sourceType === 'OSE_RECEIVE' ? 'success' : 'primary'"
              size="small"
              style="margin-left: 8px"
            >
              {{ seed.sourceType === 'OSE_RECEIVE' ? t('research.c1Propagation.sourceOseReceive') : t('research.c1Propagation.sourceOseBatch') }}
            </el-tag>
          </div>
          <div class="seed-option-info">
            <span class="variety-name">
              {{ seed.varietyName }}
              <span v-if="seed.cropType" style="margin-left: 4px; color: #909399;">
                ({{ getLabelByValue('crop_type', seed.cropType) || seed.cropType }})
              </span>
            </span>
            <span class="available-quantity">
              {{ t('research.c1Propagation.availableQuantity') }}:
              <span :class="getQuantityClass(seed.availableQuantity)">
                {{ seed.availableQuantity }} kg
              </span>
            </span>
          </div>
        </div>
      </el-option>
    </el-select>

    <!-- 选中种子的详细信息 -->
    <div v-if="selectedSeedInfo" class="selected-seed-info">
      <el-descriptions :column="2" border size="small">
        <el-descriptions-item :label="t('research.c1Propagation.batchId')">
          {{ selectedSeedInfo.batchId }}
        </el-descriptions-item>
        <el-descriptions-item :label="t('research.c1Propagation.sourceType')">
          <el-tag
            :type="selectedSeedInfo.sourceType === 'OSE_RECEIVE' ? 'success' : 'primary'"
            size="small"
          >
            {{ selectedSeedInfo.sourceType === 'OSE_RECEIVE' ? t('research.c1Propagation.sourceOseReceive') : t('research.c1Propagation.sourceOseBatch') }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item :label="t('research.c1Propagation.varietyName')">
          {{ selectedSeedInfo.varietyName }}
        </el-descriptions-item>
        <el-descriptions-item :label="t('research.c1Propagation.cropType')">
          {{ getLabelByValue('crop_type', selectedSeedInfo.cropType) || selectedSeedInfo.cropType }}
        </el-descriptions-item>
        <el-descriptions-item :label="t('research.c1Propagation.totalQuantity')">
          {{ selectedSeedInfo.totalQuantity }} kg
        </el-descriptions-item>
        <el-descriptions-item :label="t('research.c1Propagation.appliedQuantity')">
          {{ selectedSeedInfo.appliedQuantity || 0 }} kg
        </el-descriptions-item>
        <el-descriptions-item :label="t('research.c1Propagation.availableQuantity')">
          <span :class="getQuantityClass(selectedSeedInfo.availableQuantity)">
            {{ selectedSeedInfo.availableQuantity }} kg
          </span>
        </el-descriptions-item>
        <el-descriptions-item :label="t('research.c1Propagation.parentalSeedSource')">
          {{ selectedSeedInfo.parentalSeedSource }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getAvailableBasicSeeds } from '@/api/c1Propagation'
import { useDict } from '@/hooks/useDict'

const { t } = useI18n()

// 使用字典
const { getLabelByValue } = useDict(['crop_type'])

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  varietyName: {
    type: String,
    default: ''
  },
  cropType: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'seedSelected'])

const loading = ref(false)
const seedList = ref([])
const selectedSeed = ref('')
const selectedSeedInfo = ref(null)

// 加载可用种子列表
const loadSeedList = async () => {
  loading.value = true
  try {
    const params = {
      onlyAvailable: true
    }

    // 如果有品种名称或作物类型，添加到查询参数
    if (props.varietyName) {
      params.varietyName = props.varietyName
    }
    if (props.cropType) {
      params.cropType = props.cropType
    }

    const res = await getAvailableBasicSeeds(params)
    if (res.code === 200) {
      seedList.value = res.data || []
      console.log('Loaded seed list:', seedList.value)
    } else {
      ElMessage.error(res.msg || t('common.loadFailed'))
    }
  } catch (error) {
    console.error('Failed to load seed list:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 处理选择变化
const handleSelectionChange = (value) => {
  if (!value) {
    selectedSeedInfo.value = null
    emit('update:modelValue', '')
    emit('change', null)
    emit('seedSelected', null)
    return
  }

  const [batchId, sourceType] = value.split('|')
  const seed = seedList.value.find(s => s.batchId === batchId && s.sourceType === sourceType)

  if (seed) {
    selectedSeedInfo.value = seed
    emit('update:modelValue', value)
    emit('change', seed)
    emit('seedSelected', seed)
  }
}

// 获取数量的CSS类
const getQuantityClass = (quantity) => {
  if (!quantity || quantity <= 0) {
    return 'quantity-zero'
  } else if (quantity < 100) {
    return 'quantity-low'
  } else {
    return 'quantity-normal'
  }
}

// 监听 modelValue 变化
watch(() => props.modelValue, (newVal) => {
  if (newVal !== selectedSeed.value) {
    selectedSeed.value = newVal

    // 如果有值，尝试设置选中的种子信息
    if (newVal) {
      const [batchId, sourceType] = newVal.split('|')
      const seed = seedList.value.find(s => s.batchId === batchId && s.sourceType === sourceType)
      if (seed) {
        selectedSeedInfo.value = seed
      }
    } else {
      selectedSeedInfo.value = null
    }
  }
})

// 监听品种名称和作物类型变化，重新加载数据
watch(() => [props.varietyName, props.cropType], () => {
  loadSeedList()
}, { deep: true })

// 组件挂载时加载数据
onMounted(() => {
  loadSeedList()
})

// 暴露方法给父组件
defineExpose({
  loadSeedList,
  getSelectedSeedInfo: () => selectedSeedInfo.value
})
</script>

<style scoped lang="scss">
.basic-seed-selector {
  .seed-option {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .seed-option-main {
      display: flex;
      align-items: center;

      .batch-id {
        font-weight: 500;
        color: #303133;
      }
    }

    .seed-option-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      color: #606266;

      .variety-name {
        color: #8492a6;
      }

      .available-quantity {
        color: #909399;
      }
    }
  }

  .selected-seed-info {
    margin-top: 16px;
    padding: 16px;
    background-color: #f5f7fa;
    border-radius: 8px;
  }

  .quantity-zero {
    color: #f56c6c;
    font-weight: 500;
  }

  .quantity-low {
    color: #e6a23c;
    font-weight: 500;
  }

  .quantity-normal {
    color: #67c23a;
    font-weight: 500;
  }
}

:deep(.el-select-dropdown__item) {
  height: auto;
  padding: 12px 20px;
  line-height: 1.5;
}
</style>
